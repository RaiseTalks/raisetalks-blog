"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Desktop nav links. Hover = RaiseTalks TV: text darkens and a 1px line draws in from the left,
 * then exits to the right (transform-origin flips on hover). Current page = SemiBold (Figma About navbar).
 */
export function NavLinks({ links }: { links: NavLink[] }) {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-9 laptop:flex">
      {links.map((l) => {
        const active = !l.external && (path === l.href || path.startsWith(`${l.href}/`));
        const cls = cn(
          "relative text-body transition-colors duration-[350ms] ease-[var(--ease-soft)] hover:text-headline",
          "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-brand-light-blue",
          "after:transition-transform after:duration-[350ms] after:ease-[var(--ease-soft)] hover:after:origin-left hover:after:scale-x-100 motion-reduce:after:transition-none",
          active ? "font-semibold text-headline" : "text-subheadline",
        );
        return l.external ? (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>{l.label}</a>
        ) : (
          <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={cls}>{l.label}</Link>
        );
      })}
    </nav>
  );
}
