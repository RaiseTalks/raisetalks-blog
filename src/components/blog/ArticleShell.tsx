"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/blog/markdown";

/**
 * Article page frame (pre-redesign blog look, kept on request). Laptop and up:
 * - closed (default): a 1/12 gutter, the article (8/12) and a right column (3/12) behind a thin line, holding the
 *   "All articles" button and "In this article"
 * - open: the article list (topic groups + search) on the left, article in the middle, the same right column.
 *   The choice is remembered per browser, as before.
 * Below laptop: the article only.
 */
export type ArticleIndexEntry = { slug: string; title: string; topic: string; text: string };

const STORAGE_KEY = "rt-blog-articles-open";

/** The open / closed choice, remembered in localStorage (in memory when storage is blocked). Closed on the server. */
let memory = false;
const listeners = new Set<() => void>();
function readOpen(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return memory;
  }
}
function writeOpen(value: boolean) {
  memory = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // not persisted; `memory` keeps it for this page view
  }
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

/** Articles grouped by topic (largest group first), narrowed by every typed word. */
function ArticleList({ articles, current }: { articles: ArticleIndexEntry[]; current: string }) {
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

/** "In this article": H2s with their H3s nested; the section being read is marked in blue. */
function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | undefined>();
  useEffect(() => {
    const els = items.flatMap((i) => document.getElementById(i.id) ?? []);
    const onScroll = () => {
      const line = window.innerHeight / 3;
      let current: string | undefined;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const tree: { item: TocItem; children: TocItem[] }[] = [];
  for (const i of items) {
    if (i.depth === 2 || !tree.length) tree.push({ item: i, children: [] });
    else tree[tree.length - 1].children.push(i);
  }
  const link = (i: TocItem) => (
    <a href={`#${i.id}`} className={cn("text-[14.4px] leading-[1.45] transition-colors duration-200 hover:text-brand-light-blue", active === i.id ? "text-brand-light-blue" : "text-article-toc")}>
      {i.text}
    </a>
  );
  return (
    <nav aria-label="In this article" className="pt-1">
      <p className="mb-3 text-[14.4px] font-semibold text-article-toc-title">In this article</p>
      <ul className="list-disc pl-[1.1rem] marker:text-article-toc">
        {tree.map(({ item, children }) => (
          <li key={item.id} className="my-1">
            {link(item)}
            {children.length > 0 && (
              <ul className="list-disc pl-4 marker:text-article-toc">
                {children.map((c) => <li key={c.id} className="my-1">{link(c)}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ArticleShell({ articles, current, toc, children }: { articles: ArticleIndexEntry[]; current: string; toc: TocItem[]; children: ReactNode }) {
  const open = useSyncExternalStore(subscribe, readOpen, () => false);
  const toggle = () => writeOpen(!open);

  return (
    <div data-articles-open={open} className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-12 laptop:px-[72px] laptop:pb-24 laptop:pt-24">
      <div className={cn("laptop:grid", open ? "laptop:grid-cols-[270px_minmax(0,1fr)_270px]" : "laptop:grid-cols-[minmax(0,1fr)_minmax(0,8fr)_minmax(0,3fr)]")}>
        <aside className={cn("hidden border-r border-article-rule pr-6", open && "laptop:block")}>
          <ArticleList articles={articles} current={current} />
        </aside>
        {!open && <div className="hidden laptop:block" aria-hidden />}
        <div className="min-w-0">{children}</div>
        <div className="hidden border-l border-article-rule laptop:block">
          <div className="sticky top-28 pl-6">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-article-border bg-page px-3.5 py-2 text-[14.4px] font-medium text-brand-light-blue transition-colors duration-200 hover:border-brand-light-blue"
            >
              <ListIcon />
              {open ? "Hide articles" : "All articles"}
            </button>
            {toc.length > 0 && <Toc items={toc} />}
          </div>
        </div>
      </div>
    </div>
  );
}
