"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { ArticleIndexEntry } from "./articleIndex";

/** "Browse by topic" (pre-redesign blog look): every article grouped by topic, with a search. Article and list pages. */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

/** Articles grouped by topic (largest group first), narrowed by every typed word. */
export function ArticleList({ articles, current }: { articles: ArticleIndexEntry[]; current?: string }) {
  const [query, setQuery] = useState("");
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = terms.length ? articles.filter((a) => terms.every((t) => a.text.includes(t))) : articles;
  const groups = useMemo(() => {
    const m = new Map<string, ArticleIndexEntry[]>();
    for (const a of shown) m.set(a.topic, [...(m.get(a.topic) ?? []), a]);
    return [...m.entries()].sort(([ta, a], [tb, b]) => b.length - a.length || ta.localeCompare(tb));
  }, [shown]);

  return (
    <nav aria-label="Browse by topic" className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col">
      <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-headline">Browse by topic</p>
      <div className="relative mb-3">
        <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-article-faint"><SearchIcon /></span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles"
          aria-label="Search articles"
          className="w-full rounded-full border border-article-search-border bg-page py-2 pl-[2.125rem] pr-3 text-body text-article-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-article-faint focus:border-brand-light-blue focus:ring-[3px] focus:ring-brand-light-blue/15"
        />
      </div>
      {terms.length > 0 && (
        <p role="status" aria-live="polite" className="mb-2 px-2 text-footnote text-article-muted">
          {shown.length === 0 ? "No articles match that search." : `${shown.length} of ${articles.length} articles`}
        </p>
      )}
      <div className="-mr-2 overflow-y-auto pb-6 pr-2">
        {groups.map(([topic, items], i) => (
          <section key={topic} className={cn(i > 0 && "mt-[1.125rem] border-t border-article-rule pt-[1.125rem]")}>
            <h3 className="mb-2 flex items-baseline justify-between gap-2 px-2 text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.09em] text-article-faint">
              {topic}
              <span className="font-normal tracking-[0.04em] text-article-chip-border">{items.length}</span>
            </h3>
            <ul className="grid gap-0.5">
              {items.map((a) => {
                const on = a.slug === current;
                return (
                  <li key={a.slug}>
                    <Link
                      href={`/blog/${a.slug}`}
                      aria-current={on ? "page" : undefined}
                      className={cn(
                        "block rounded-sm px-2 py-[0.4375rem] text-body leading-[1.45] transition-colors duration-200",
                        on ? "bg-article-takeaways font-medium text-brand-light-blue" : "text-article-list hover:bg-article-table-head hover:text-brand-light-blue",
                      )}
                    >
                      {a.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
