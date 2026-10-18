"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky "On this page" list (laptop+). The section being read is marked in brand blue. */
export function ArticleToc({ items, label }: { items: { id: string; text: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.flatMap((i) => document.getElementById(i.id) ?? []);
    const onScroll = () => {
      // last heading that has passed the top third of the viewport
      const line = window.innerHeight / 3;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28 flex flex-col gap-4">
      <p className="text-footnote font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
      <ul className="flex flex-col border-l border-border-1">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-footnote leading-[1.45] transition-colors duration-[var(--duration-hover)]",
                active === i.id ? "border-brand-light-blue text-brand-light-blue" : "border-transparent text-copy hover:text-headline",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
