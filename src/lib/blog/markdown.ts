import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import { toString } from "mdast-util-to-string";
import type { Root as MdRoot, RootContent, ListItem, Link } from "mdast";
import type { Root as HastRoot, Element } from "hast";

/**
 * House format → article. Authors keep writing plain Markdown; everything stays where the author put it
 * (the article page follows the pre-redesign blog). Custom elements (`blog-*`) mark the parts the renderer
 * styles: the deck (opening paragraphs), the key-takeaways card under its heading, scrollable tables, the FAQ
 * accordion (bold question line + answer), the "Read next" cards and `<BlogCTA>` panels.
 * Also returned: `toc` (H2s and their H3s, for "In this article") and `faq` (for FAQPage structured data).
 * Links to posts that are not live yet lose their link (list items that are only such a link are dropped).
 */
export type TocItem = { id: string; text: string; depth: 2 | 3 };
export type Parsed = { body: HastRoot; toc: TocItem[]; faq: { question: string; text: string }[] };

const BLOG_LINK = /^\/blog\/([a-z0-9-]+)\/?(?:#.*)?$/;
const FAQ_HEADING = /frequently asked questions/i;
const FAQ_TITLE = "Frequently Asked Questions";
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

/** "Read next" list of `[title](/blog/slug)` links → cards (the renderer looks up each post's title and image). */
function readNext(kids: RootContent[]) {
  const start = kids.findIndex((n) => isH2(n, READ_NEXT_HEADING));
  const list = kids[start + 1];
  if (start === -1 || list?.type !== "list") return;
  const items = list.children.flatMap((item) => {
    const p = item.children[0];
    const link = p?.type === "paragraph" ? p.children.find((c) => c.type === "link") : undefined;
    if (link?.type !== "link") return [];
    return [block("blog-read-next-item", [], { href: link.url, title: toString(link).trim(), slug: (link.url.match(BLOG_LINK) ?? [])[1] ?? "" })];
  });
  if (items.length) kids[start + 1] = block("blog-read-next", items);
}

/** FAQ section → accordion items in place; returns the questions and plain answers for structured data. */
function faq(kids: RootContent[]): { question: string; text: string }[] {
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
  if (!items.length) return [];
  const heading = kids[start];
  if (heading.type === "heading") heading.children = [{ type: "text", value: FAQ_TITLE }];
  kids.splice(start + 1, end - start - 1, block("blog-faq", items.map((it) => block("blog-faq-item", it.body, { question: it.question }))));
  return items.map((it) => ({ question: it.question, text: it.body.map((n) => toString(n)).join(" ").replace(/\s+/g, " ").trim() }));
}

function shape(tree: MdRoot): { question: string; text: string }[] {
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

  // Section breaks: spacing above each H2 does the job
  tree.children = tree.children.filter((n) => n.type !== "thematicBreak");

  // Deck: the opening run of paragraphs (only when sections follow)
  let end = 0;
  while (tree.children[end]?.type === "paragraph") end++;
  if (end > 0 && end < tree.children.length) tree.children.splice(0, end, block("blog-deck", tree.children.slice(0, end)));

  // Key takeaways: the heading stays (it is in "In this article"); the list under it becomes the card
  const t = tree.children.findIndex((n) => isH2(n, TAKEAWAYS_HEADING));
  if (t !== -1 && tree.children[t + 1]?.type === "list") tree.children[t + 1] = block("blog-takeaways", [tree.children[t + 1]]);

  readNext(tree.children);
  const questions = faq(tree.children);

  // Tables scroll sideways in a frame instead of being clipped on a phone
  tree.children = tree.children.map((n) => {
    if (n.type !== "table") return n;
    return block("blog-table", [n], { columns: String(n.children[0]?.children.length ?? 0) });
  });
  return questions;
}

const toHast = unified().use(remarkRehype).use(rehypeSlug);
const toMdast = unified().use(remarkParse).use(remarkGfm);

const text = (n: Element | HastRoot): string =>
  n.children.map((c) => (c.type === "text" ? c.value : c.type === "element" ? text(c) : "")).join("");

export async function parsePost(markdown: string, unpublished: Set<string>): Promise<Parsed> {
  const tree = toMdast.parse(markdown) as MdRoot;
  await toMdast.run(tree);
  hideUnpublishedLinks(tree, unpublished);
  const faqItems = shape(tree);
  const body = (await toHast.run(tree)) as HastRoot;
  // H2s and H3s at the top level only (FAQ questions are buttons, not headings)
  const toc = body.children.flatMap((n): TocItem[] =>
    n.type === "element" && (n.tagName === "h2" || n.tagName === "h3")
      ? [{ id: String(n.properties.id), text: text(n), depth: n.tagName === "h2" ? 2 : 3 }]
      : [],
  );
  return { body, toc, faq: faqItems };
}
