import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import { toString } from "mdast-util-to-string";
import type { Root as MdRoot, RootContent, ListItem, Link } from "mdast";
import type { Root as HastRoot, Element } from "hast";

/**
 * House format → page parts. Authors keep writing plain Markdown; this splits a post into:
 * - body: the article, with its deck (opening paragraphs), key-takeaways card, scrollable tables and
 *   closing product note marked as custom elements (`blog-*`) for the renderer
 * - faq: the "Frequently Asked Questions" section (bold question line + answer), shown in its own band
 * - readNext: slugs from the "Read next" list, shown as post cards
 * - toc: the body's H2s
 * Links to posts that are not live yet lose their link (list items that are only such a link are dropped).
 */
export type FaqItem = { question: string; answer: HastRoot; text: string };
export type Parsed = { body: HastRoot; toc: { id: string; text: string }[]; faq: FaqItem[]; readNext: string[] };

const BLOG_LINK = /^\/blog\/([a-z0-9-]+)\/?(?:#.*)?$/;
const FAQ_HEADING = /frequently asked questions/i;
const READ_NEXT_HEADING = /^read next$/i;
const TAKEAWAYS_HEADING = /^key takeaways$/i;

/** A wrapper the renderer maps to a component (mdast-util-to-hast turns `data.hName` into the element name). */
function block(name: string, children: RootContent[], props: Record<string, string> = {}): RootContent {
  return { type: "blockquote", data: { hName: name, hProperties: props }, children } as unknown as RootContent;
}

const isH2 = (n: RootContent | undefined, re: RegExp) => n?.type === "heading" && n.depth === 2 && re.test(toString(n).trim());

function hideUnpublishedLinks(tree: MdRoot, unpublished: Set<string>) {
  if (!unpublished.size) return;
  const hidden = (n: RootContent) => n.type === "link" && unpublished.has((n.url.match(BLOG_LINK) ?? [])[1] ?? "");
  const onlyHidden = (item: ListItem) => {
    const [p] = item.children;
    return item.children.length === 1 && p.type === "paragraph" &&
      p.children.filter((c) => !(c.type === "text" && !c.value.trim())).every(hidden);
  };
  const kids = tree.children;
  for (let i = kids.length - 1; i >= 0; i--) {
    const n = kids[i];
    if (n.type !== "list") continue;
    n.children = n.children.filter((item) => !onlyHidden(item));
    if (!n.children.length) {
      const headingBefore = kids[i - 1]?.type === "heading";
      kids.splice(headingBefore ? i - 1 : i, headingBefore ? 2 : 1);
    }
  }
  const unwrap = (n: { children?: RootContent[] }) => {
    if (!n.children) return;
    n.children = n.children.flatMap((c) => (hidden(c) ? (c as Link).children : [c]));
    n.children.forEach((c) => unwrap(c as { children?: RootContent[] }));
  };
  unwrap(tree);
}

function extractReadNext(kids: RootContent[]): string[] {
  const start = kids.findIndex((n) => isH2(n, READ_NEXT_HEADING));
  const list = kids[start + 1];
  if (start === -1 || list?.type !== "list") return [];
  const slugs = list.children.flatMap((item) => {
    const p = item.children[0];
    const link = p?.type === "paragraph" ? p.children.find((c) => c.type === "link") : undefined;
    const slug = link?.type === "link" ? (link.url.match(BLOG_LINK) ?? [])[1] : undefined;
    return slug ? [slug] : [];
  });
  kids.splice(start, 2);
  return slugs;
}

function extractFaq(kids: RootContent[]): { question: string; body: RootContent[] }[] {
  const start = kids.findIndex((n) => isH2(n, FAQ_HEADING));
  if (start === -1) return [];
  let end = start + 1;
  while (end < kids.length && kids[end].type !== "heading" && kids[end].type !== "thematicBreak") end++;
  const items: { question: string; body: RootContent[] }[] = [];
  for (const n of kids.slice(start + 1, end)) {
    if (n.type === "paragraph" && n.children[0]?.type === "strong") {
      const [strong, ...rest] = n.children;
      while (rest[0]?.type === "break") rest.shift();
      if (rest[0]?.type === "text") {
        rest[0] = { ...rest[0], value: rest[0].value.replace(/^\s+/, "") };
        if (!rest[0].value) rest.shift();
      }
      items.push({ question: toString(strong).trim(), body: rest.length ? [{ type: "paragraph", children: rest }] : [] });
    } else if (items.length) items[items.length - 1].body.push(n);
    else return []; // not in the FAQ format: leave the post untouched
  }
  kids.splice(start, end - start);
  return items;
}

function shape(tree: MdRoot) {
  // `<BlogCTA … />` (the only component posts use): its string attributes become a CTA panel.
  // Every other raw HTML node, `<!-- truncate -->` included, is dropped.
  // A tag split over several lines is not an HTML block in CommonMark: it arrives as a paragraph of inline HTML.
  const rawHtml = (n: RootContent): string | null => {
    if (n.type === "html") return n.value;
    if (n.type !== "paragraph" || !n.children.some((c) => c.type === "html")) return null;
    if (!n.children.every((c) => c.type === "html" || (c.type === "text" && !c.value.trim()))) return null;
    return n.children.map((c) => ("value" in c ? c.value : "")).join("");
  };
  tree.children = tree.children.flatMap((n) => {
    const html = rawHtml(n);
    if (html === null) return [n];
    if (!/^<BlogCTA\b/.test(html.trim())) return [];
    const attrs = Object.fromEntries([...html.matchAll(/(\w+)="([^"]*)"/g)].map(([, k, v]) => [k.toLowerCase(), v]));
    return [block("blog-cta", [], attrs)];
  });

  // Closing product note: the paragraphs after the last `---`, when nothing else follows.
  const lastBreak = tree.children.findLastIndex((n) => n.type === "thematicBreak");
  const tail = tree.children.slice(lastBreak + 1);
  if (lastBreak !== -1 && tail.length && tail.every((n) => n.type === "paragraph")) {
    tree.children.splice(lastBreak + 1, tail.length, block("blog-note", tail));
  }
  tree.children = tree.children.filter((n) => n.type !== "thematicBreak");

  // Deck: the opening run of paragraphs (only when sections follow)
  let end = 0;
  while (tree.children[end]?.type === "paragraph") end++;
  if (end > 0 && end < tree.children.length) tree.children.splice(0, end, block("blog-deck", tree.children.slice(0, end)));

  // Key takeaways: H2 + list → one card (the card carries its own label, so it stays out of the TOC)
  const t = tree.children.findIndex((n) => isH2(n, TAKEAWAYS_HEADING));
  if (t !== -1 && tree.children[t + 1]?.type === "list") {
    tree.children.splice(t, 2, block("blog-takeaways", [tree.children[t + 1]], { title: toString(tree.children[t]).trim() }));
  }

  // Tables scroll sideways in a frame instead of being clipped on a phone
  tree.children = tree.children.map((n) => {
    if (n.type !== "table") return n;
    return block("blog-table", [n], { columns: String(n.children[0]?.children.length ?? 0) });
  });
}

const toHast = unified().use(remarkRehype).use(rehypeSlug);
const toMdast = unified().use(remarkParse).use(remarkGfm);

async function hastOf(children: RootContent[]): Promise<HastRoot> {
  return (await toHast.run({ type: "root", children } as MdRoot)) as HastRoot;
}

const text = (n: Element | HastRoot): string =>
  n.children.map((c) => (c.type === "text" ? c.value : c.type === "element" ? text(c) : "")).join("");

export async function parsePost(markdown: string, unpublished: Set<string>): Promise<Parsed> {
  const tree = toMdast.parse(markdown) as MdRoot;
  await toMdast.run(tree);
  hideUnpublishedLinks(tree, unpublished);
  const readNext = extractReadNext(tree.children);
  const faqRaw = extractFaq(tree.children);
  shape(tree);

  const body = await hastOf(tree.children);
  const toc = body.children.flatMap((n) =>
    n.type === "element" && n.tagName === "h2" ? [{ id: String(n.properties.id), text: text(n) }] : [],
  );
  const faq = await Promise.all(
    faqRaw.map(async (f) => ({
      question: f.question,
      answer: await hastOf(f.body),
      text: f.body.map((n) => toString(n)).join(" ").replace(/\s+/g, " ").trim(),
    })),
  );
  return { body, toc, faq, readNext };
}
