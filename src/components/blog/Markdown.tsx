import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime, type Components } from "hast-util-to-jsx-runtime";
import type { Root } from "hast";
import { ArtFill } from "@/components/ui/ArtImage";
import { Button } from "@/components/ui/Button";
import { art } from "@/content/marketing/shared";
import { cn } from "@/lib/utils";
import { ArticleFaq, ArticleFaqItem } from "./ArticleFaq";
import { LeadMagnetForm } from "./LeadMagnetForm";

/**
 * Article typography: the pre-redesign blog look (kept on request). Body 18px / 1.65 in #333 on a 768px column
 * (16px on phones), deck 20px, H2 32px, H3 24px medium, blue bold links without underline, blue bullets.
 * `blog-*` elements come from src/lib/blog/markdown.ts; `blog-read-next-item` is supplied by the page (it needs
 * the post index).
 */
export type MarkdownProps = { children?: ReactNode; className?: string; href?: string; title?: string; columns?: string; [k: string]: unknown };
type P = MarkdownProps;

const body = "text-[16px] leading-[1.65] text-copy tablet:text-[18px]";
const link = "font-semibold text-brand-light-blue no-underline transition-colors duration-[var(--duration-hover)] hover:text-accent-hover";

function A({ href = "", children }: P) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} className={link}>{children}</Link>;
  if (href.startsWith("mailto:")) return <a href={href} className={link}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{children}</a>;
}

function BlogCta({ title, description, buttontext, buttonlink, magnet, disclaimer }: P) {
  const s = (v: unknown) => (typeof v === "string" && v ? v : undefined);
  return (
    <aside className="relative isolate mb-10 mt-8 overflow-hidden rounded-[14px] border border-brand-light-blue bg-brand-light-blue px-5 py-8 text-center tablet:p-10">
      <ArtFill art={art.band} sizes="(min-width: 768px) 768px, 100vw" className="-z-10 object-cover" />
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-2">
          {s(title) && <p className="text-h3 text-on-brand">{s(title)}</p>}
          {s(description) && <p className="text-body text-on-brand-muted">{s(description)}</p>}
        </div>
        {s(magnet) ? (
          <LeadMagnetForm magnet={s(magnet)!} button={s(buttontext) ?? "Send me the list"} success="You are on the list. Download your files:" />
        ) : (
          s(buttonlink) && <Button variant="alternative" size="lg" href={s(buttonlink)!}>{s(buttontext) ?? "Learn more"}</Button>
        )}
        {s(disclaimer) && <p className="max-w-[520px] text-footnote text-on-brand-muted">{s(disclaimer)}</p>}
      </div>
    </aside>
  );
}

function Table({ children, columns }: P) {
  const count = Number(columns) || 3;
  return (
    <>
      {/* Wide tables scroll sideways instead of squeezing; the floor keeps columns legible */}
      <div className={cn("mb-2 overflow-x-auto tablet:mb-8", count >= 5 ? "[&_table]:min-w-[760px]" : count >= 3 ? "[&_table]:min-w-[600px]" : "")} tabIndex={0} role="group">
        {children}
      </div>
      {count >= 4 && <p className="mb-8 text-footnote text-article-faint tablet:hidden">Scroll the table for more columns</p>}
    </>
  );
}

const base: Record<string, ComponentType<P>> = {
  h2: ({ children, ...p }) => <h2 id={p.id as string} className="mb-4 mt-8 scroll-mt-28 text-[24px] leading-[1.25] text-headline tablet:mb-3.5 tablet:mt-11 tablet:text-[32px]">{children}</h2>,
  h3: ({ children, ...p }) => <h3 id={p.id as string} className="mb-3 mt-6 scroll-mt-28 text-[20px] font-medium leading-[1.3] text-headline tablet:mb-2.5 tablet:mt-8 tablet:text-[24px]">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 mt-6 text-[17px] font-semibold text-headline tablet:text-[19px]">{children}</h4>,
  p: ({ children }) => <p className={cn(body, "mb-5")}>{children}</p>,
  a: A,
  strong: ({ children }) => <strong className="font-semibold text-headline">{children}</strong>,
  ul: ({ children }) => <ul className={cn(body, "mb-6 mt-4 list-disc pl-6 marker:text-brand-light-blue [&_ul]:mb-2 [&_ul]:mt-2")}>{children}</ul>,
  ol: ({ children }) => <ol className={cn(body, "mb-6 mt-4 list-decimal pl-6 marker:text-brand-light-blue [&_ol]:mb-2 [&_ol]:mt-2")}>{children}</ol>,
  li: ({ children }) => <li className="mb-2.5 [&>p]:mb-0">{children}</li>,
  blockquote: ({ children }) => <blockquote className="mb-6 border-l-2 border-brand-light-blue pl-5 italic">{children}</blockquote>,
  code: ({ children }) => (
    <code className="rounded-[6px] border border-article-code-border bg-article-code-bg px-1.5 py-0.5 font-mono text-[15px] text-article-code">{children}</code>
  ),
  table: ({ children }) => <table className="w-full border-collapse text-left">{children}</table>,
  th: ({ children }) => <th scope="col" className="border-b border-article-border bg-article-table-head px-4 py-3 align-middle text-[16px] font-semibold leading-[1.65] text-headline">{children}</th>,
  tr: ({ children }) => <tr className="[tbody_&:nth-child(even)]:bg-[rgb(0_0_0/0.03)]">{children}</tr>,
  td: ({ children }) => <td className="border-b border-article-cell px-4 py-3 align-middle text-[16px] leading-[1.55] text-copy">{children}</td>,

  /** Opening paragraphs: a step above the body, in black. */
  "blog-deck": ({ children }) => (
    <div className="[&>p]:mb-4 [&>p]:text-[18px] [&>p]:leading-[1.55] [&>p]:text-headline tablet:[&>p]:text-[20px]">{children}</div>
  ),
  /** List under "Key takeaways": soft blue card. */
  "blog-takeaways": ({ children }) => (
    <div className="mb-10 mt-5 rounded-[14px] border border-article-takeaways-border bg-article-takeaways p-5 tablet:px-7 tablet:py-6 [&>ul]:my-0">{children}</div>
  ),
  "blog-table": Table,
  "blog-cta": BlogCta,
  "blog-faq": ({ children }) => <ArticleFaq>{children}</ArticleFaq>,
  "blog-faq-item": ({ children, question }) => <ArticleFaqItem question={String(question ?? "")}>{children}</ArticleFaqItem>,
  "blog-read-next": ({ children }) => <div className="mb-10 mt-5 grid gap-3.5 tablet:grid-cols-2">{children}</div>,
};

export function Markdown({ tree, overrides }: { tree: Root; overrides?: Record<string, ComponentType<P>> }) {
  return toJsxRuntime(tree, { Fragment, jsx, jsxs, components: { ...base, ...overrides } as unknown as Components });
}
