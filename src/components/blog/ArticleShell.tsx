"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/blog/markdown";
import type { ArticleIndexEntry } from "./articleIndex";
import { ArticleList } from "./ArticleList";

/**
 * Article page frame (pre-redesign blog look, kept on request). Laptop and up:
 * - closed (default): a 1/12 gutter, the article (8/12) and a right column (3/12) behind a thin line, holding the
 *   "All articles" button and "In this article"
 * - open: the article list (topic groups + search) on the left, article in the middle, the same right column.
 *   The choice is remembered per browser, as before.
 * Below laptop: the article only.
 */
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
