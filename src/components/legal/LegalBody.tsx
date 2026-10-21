import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Renders the plain-text legal format (see src/content/legal/privacy.ts):
 * h2 / h3 / p / b / li / th / tr / br / btn / box … /box. Inline: **bold**, [label](href), emails → mailto.
 * Headings (Drop 21): h2 = sections ("1. …"), h3 = sub-sections, h4 = titles inside boxes (cards).
 * Tables (Figma 2459:15): 8px radius, hairlines between cells, 16px cells, first row grey-blue (`table-head`),
 * then white / `table-stripe` rows; first column semibold; th = optional header row.
 */
function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|[\w.+-]+@[\w-]+\.[\w.]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const link = "font-semibold text-brand-light-blue underline underline-offset-2 hover:text-accent-hover";
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) parts.push(<strong key={k++} className="font-semibold text-subheadline">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("[")) {
      const [, label, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(t)!;
      parts.push(href.startsWith("/")
        ? <Link key={k++} href={href} className={link}>{label}</Link>
        : <a key={k++} href={href} target="_blank" rel="noopener noreferrer" className={link}>{label}</a>);
    } else parts.push(<a key={k++} href={`mailto:${t.replace(/\.$/, "")}`} className={link}>{t}</a>);
    last = m.index + t.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

type Line = { tag: string; text: string };
type Block =
  | { kind: "h2" | "h3" | "p" | "b"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "lines"; items: string[] }
  | { kind: "btns"; items: string[][] }
  | { kind: "table"; head: string[] | null; rows: string[][] }
  | { kind: "box"; children: Block[] };

function run(lines: Line[], i: number, tag: string) {
  const items = [lines[i].text];
  while (lines[i + 1]?.tag === tag) items.push(lines[++i].text);
  return { items, i };
}

function group(lines: Line[]): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.tag === "box") {
      const inner: Line[] = [];
      i++;
      while (i < lines.length && lines[i].tag !== "/box") inner.push(lines[i++]);
      out.push({ kind: "box", children: group(inner) });
    } else if (l.tag === "li" || l.tag === "br" || l.tag === "btn") {
      const r = run(lines, i, l.tag);
      i = r.i;
      if (l.tag === "li") out.push({ kind: "ul", items: r.items });
      else if (l.tag === "br") out.push({ kind: "lines", items: r.items });
      else out.push({ kind: "btns", items: r.items.map((t) => t.split(" ¦ ")) });
    } else if (l.tag === "th" || l.tag === "tr") {
      const head = l.tag === "th" ? l.text.split(" ¦ ") : null;
      if (head) i++;
      const rows: string[][] = [];
      while (lines[i]?.tag === "tr") rows.push(lines[i++].text.split(" ¦ "));
      i--;
      out.push({ kind: "table", head, rows });
    } else if (l.tag === "h2" || l.tag === "h3" || l.tag === "p" || l.tag === "b") out.push({ kind: l.tag, text: l.text });
  }
  return out;
}

function slug(s: string) {
  return s.toLowerCase().replace(/^\d+(\.\d+)*\.?\s*/, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const cell = "border-border-1 p-4 align-top";

/** "policy": section headlines at H3 size and sub-sections (2.1, a. …) at H4 (Privacy, Terms, Refund). The heading
 *  elements stay h2 / h3 so the document outline under the page H1 is unchanged. */
export type HeadingScale = "default" | "policy";

function render(blocks: Block[], inBox = false, scale: HeadingScale = "default"): ReactNode {
  const policy = scale === "policy";
  return blocks.map((b, i) => {
    switch (b.kind) {
      case "h2": return <h2 key={i} id={slug(b.text)} className={cn("mt-10 scroll-mt-28 text-headline first:mt-0 tablet:mt-12 laptop:mt-16", policy ? "text-h3" : "text-h2")}>{b.text}</h2>;
      case "h3": return inBox
        ? <h4 key={i} className="text-h4 text-subheadline">{b.text}</h4>
        : <h3 key={i} className={cn("mt-4 text-subheadline", policy ? "text-h4" : "text-h3")}>{b.text}</h3>;
      case "p": return <p key={i} className="text-body text-copy">{inline(b.text)}</p>;
      case "b": return <p key={i} className="text-body font-semibold text-subheadline">{inline(b.text)}</p>;
      case "lines": return (
        <p key={i} className="flex flex-col text-body text-copy">
          {b.items.map((t) => <span key={t}>{inline(t)}</span>)}
        </p>
      );
      case "btns": return (
        <div key={i} className="mt-2 flex flex-col gap-4 tablet:flex-row">
          {b.items.map(([label, href], j) => (
            <Button key={label} variant={j === 0 ? "primary" : "ghost"} size="lg" href={href} external={!href.startsWith("/")}>{label}</Button>
          ))}
        </div>
      );
      case "ul": return (
        <ul key={i} className="flex flex-col gap-2">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3 text-body text-copy">
              <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-brand-light-blue" aria-hidden />
              <span>{inline(it)}</span>
            </li>
          ))}
        </ul>
      );
      case "table": {
        const cols = (b.head ?? b.rows[0]).length;
        return (
          <div key={i} className="overflow-x-auto rounded-sm border border-border-1">
            <table className={cn("w-full border-collapse text-left text-body text-copy", cols >= 3 ? "min-w-[600px]" : "min-w-[420px]")}>
              {b.head && (
                <thead className="bg-table-head">
                  <tr>{b.head.map((h) => <th key={h} scope="col" className={cn(cell, "border-r font-semibold text-subheadline last:border-r-0")}>{h}</th>)}</tr>
                </thead>
              )}
              <tbody>
                {b.rows.map((r, ri) => (
                  <tr
                    key={ri}
                    className={cn(
                      "border-t border-border-1",
                      ri === 0 && !b.head ? "border-t-0 bg-table-head" : (ri % 2 === (b.head ? 1 : 0) ? "bg-table-stripe" : "bg-page"),
                    )}
                  >
                    {r.map((c, ci) => ci === 0
                      ? <th key={ci} scope="row" className={cn(cell, "w-1/3 border-r font-semibold text-subheadline", cols === 2 && "w-1/2")}>{inline(c)}</th>
                      : <td key={ci} className={cn(cell, "border-r last:border-r-0")}>{inline(c)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      case "box": return <aside key={i} className="flex flex-col gap-2 rounded-md border border-border-1 bg-card p-5 tablet:p-6">{render(b.children, true, scale)}</aside>;
      default: return <Fragment key={i} />;
    }
  });
}

export function LegalBody({ body, headingScale = "default" }: { body: string; headingScale?: HeadingScale }) {
  const lines: Line[] = body.trim().split("\n").filter((raw) => raw.trim()).map((raw) => {
    const at = raw.indexOf("|");
    return { tag: raw.slice(0, at).trim(), text: raw.slice(at + 1).trim() };
  });
  return <div className="flex flex-col gap-4 tablet:gap-6">{render(group(lines), false, headingScale)}</div>;
}
