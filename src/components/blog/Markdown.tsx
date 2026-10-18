import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime, type Components } from "hast-util-to-jsx-runtime";
import type { Root } from "hast";
import { ArtFill } from "@/components/ui/ArtImage";
import { Button } from "@/components/ui/Button";
import { art } from "@/content/marketing/shared";
import { cn } from "@/lib/utils";
import { LeadMagnetForm } from "./LeadMagnetForm";

/**
 * Article typography (blog posts). Long-form reading wants a larger size than the marketing `text-body` (14.4px):
 * 16px / 1.7 on a ~680px measure, `text-copy` colour; headings on the site scale one step down (H2 → text-h3,
 * H3 → text-h4) so sections read as an article, not a landing page. Links, bullets and table styles follow the
 * legal pages (LegalBody). `blog-*` elements come from src/lib/blog/markdown.ts.
 */
type P = { children?: ReactNode; className?: string; href?: string; title?: string; columns?: string; [k: string]: unknown };

const prose = "text-[16px] leading-[1.7] text-copy";
const link = "font-medium text-brand-light-blue underline decoration-1 underline-offset-[3px] transition-colors duration-[var(--duration-hover)] hover:text-accent-hover";

function A({ href = "", children }: P) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} className={link}>{children}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{children}</a>;
}

function BlogCta({ title, description, buttontext, buttonlink, magnet, disclaimer }: P) {
  const s = (v: unknown) => (typeof v === "string" && v ? v : undefined);
  return (
    <aside className="relative isolate mt-10 overflow-hidden rounded-lg border border-brand-light-blue bg-brand-light-blue px-5 py-8 text-center tablet:p-10">
      <ArtFill art={art.band} sizes="(min-width: 768px) 680px, 100vw" className="-z-10 object-cover" />
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

const base: Record<string, ComponentType<P>> = {
  h2: ({ children, ...p }) => <h2 id={p.id as string} className="mt-14 scroll-mt-28 text-h3 text-headline first:mt-0 tablet:mt-16">{children}</h2>,
  h3: ({ children, ...p }) => <h3 id={p.id as string} className="mt-8 scroll-mt-28 text-h4 font-medium text-subheadline">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-6 text-[16px] font-semibold text-subheadline">{children}</h4>,
  p: ({ children }) => <p className={cn(prose, "mt-5 first:mt-0")}>{children}</p>,
  a: A,
  strong: ({ children }) => <strong className="font-semibold text-subheadline">{children}</strong>,
  ul: ({ children }) => <ul className={cn(prose, "mt-5 flex list-disc flex-col gap-2 pl-5 marker:text-brand-light-blue [&_ul]:mt-2")}>{children}</ul>,
  ol: ({ children }) => <ol className={cn(prose, "mt-5 flex list-decimal flex-col gap-2 pl-5 marker:font-medium marker:text-brand-light-blue [&_ol]:mt-2")}>{children}</ol>,
  li: ({ children }) => <li className="pl-1 [&>p]:mt-0">{children}</li>,
  blockquote: ({ children }) => <blockquote className="mt-6 border-l-2 border-brand-light-blue pl-5 italic">{children}</blockquote>,
  code: ({ children }) => <code className="rounded-xs bg-card px-1.5 py-0.5 text-[0.9em]">{children}</code>,
  hr: () => null,
  table: ({ children }) => <table className="w-full border-collapse text-left text-body text-copy">{children}</table>,
  thead: ({ children }) => <thead className="bg-table-head">{children}</thead>,
  tr: ({ children }) => <tr className="border-t border-border-1 first:border-t-0 [tbody_&:nth-child(even)]:bg-table-stripe">{children}</tr>,
  th: ({ children }) => <th scope="col" className="border-r border-border-1 p-4 align-top font-semibold text-subheadline last:border-r-0">{children}</th>,
  td: ({ children }) => <td className="border-r border-border-1 p-4 align-top last:border-r-0 [&:first-child]:font-medium [&:first-child]:text-subheadline">{children}</td>,

  /** Opening paragraphs: one step above the body. */
  "blog-deck": ({ children }) => <div className="flex flex-col gap-5 [&>p]:mt-0 [&>p]:text-[17px] [&>p]:leading-[1.6] [&>p]:text-subheadline tablet:[&>p]:text-[19px]">{children}</div>,
  /** Key takeaways card (legal-page box, blue eyebrow label). */
  "blog-takeaways": ({ children, title }) => (
    <aside className="mt-12 rounded-lg border border-border-1 bg-card p-6 tablet:p-8 [&>ul]:mt-4">
      <p className="text-eyebrow text-brand-light-blue">{title}</p>
      {children}
    </aside>
  ),
  /** Wide tables scroll sideways inside a framed box; 3+ columns keep a minimum width so cells stay legible. */
  "blog-table": ({ children, columns }) => (
    <div className="mt-8 overflow-x-auto rounded-sm border border-border-1">
      <div className={cn(Number(columns) >= 5 ? "min-w-[760px]" : Number(columns) >= 3 ? "min-w-[600px]" : "min-w-[420px]")}>{children}</div>
    </div>
  ),
  /** `<BlogCTA>` from a post: blue panel (StatementBanner surface) with a lead-magnet form or a button. */
  "blog-cta": BlogCta,
  /** Closing product line: a soft blue card. */
  "blog-note": ({ children }) => (
    <aside className="mt-14 rounded-lg border border-blue-pill bg-[color-mix(in_srgb,var(--color-blue-pill)_25%,var(--color-page))] p-6 tablet:p-8 [&>p]:text-subheadline">{children}</aside>
  ),
};

export function Markdown({ tree, overrides }: { tree: Root; overrides?: Record<string, ComponentType<P>> }) {
  return toJsxRuntime(tree, { Fragment, jsx, jsxs, components: { ...base, ...overrides } as unknown as Components });
}
