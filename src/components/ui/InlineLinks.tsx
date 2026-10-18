import Link from "next/link";
import { Fragment } from "react";

const link = "font-medium text-brand-light-blue underline underline-offset-2 hover:text-accent-hover";

/** Plain text with `[label](href)` links (content files): site paths use next/link, http(s) opens a new tab. */
export function InlineLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
        if (!m) return <Fragment key={i}>{p}</Fragment>;
        const [, label, href] = m;
        if (href.startsWith("/")) return <Link key={i} href={href} className={link}>{label}</Link>;
        if (href.startsWith("mailto:")) return <a key={i} href={href} className={link}>{label}</a>;
        return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={link}>{label}</a>;
      })}
    </>
  );
}
