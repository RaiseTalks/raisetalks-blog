import React, {useMemo, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';

// The blog's article navigation, shared by the desktop sidebar and the mobile menu
// (src/theme/BlogSidebar/*): a filter and the article list grouped by topic.
//
// One entry per post is a wall of 31 lines that grows with every publishing day, so the list is
// grouped under its topics (largest group first) and the filter narrows it as you type. Both read
// the index built at build time by src/plugins/blog-search-index.js: each post's topic (its first
// tag) and a haystack of title, description, keywords and tags.

type IndexEntry = {permalink: string; topic: string; text: string};
type SearchIndex = {posts: IndexEntry[]};
type SidebarItem = {title: string; permalink: string};

const normalise = (permalink: string) => permalink.replace(/\/$/, '');

function useIndex(): Map<string, IndexEntry> {
  const index = usePluginData('blog-search-index') as SearchIndex | undefined;
  return useMemo(
    () => new Map((index?.posts ?? []).map((post) => [normalise(post.permalink), post])),
    [index],
  );
}

export function useArticleFilter<T extends SidebarItem>(items: T[]) {
  const [query, setQuery] = useState('');
  const index = useIndex();

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items;

    return items.filter((item) => {
      const entry = index.get(normalise(item.permalink));
      const text = entry?.text ?? item.title.toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [items, index, query]);

  return {query, setQuery, filtered};
}

function SearchIcon(): ReactNode {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

export function ArticleFilter({
  query,
  setQuery,
  shown,
  total,
}: {
  query: string;
  setQuery: (value: string) => void;
  shown: number;
  total: number;
}): ReactNode {
  return (
    <>
      <div className="rt-blog-search">
        <span className="rt-blog-search__icon">
          <SearchIcon />
        </span>
        <input
          type="search"
          className="rt-blog-search__input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles"
          aria-label="Search articles"
        />
      </div>
      {query.trim() !== '' && (
        <p className="rt-blog-search__count" role="status" aria-live="polite">
          {shown === 0 ? 'No articles match that search.' : `${shown} of ${total} articles`}
        </p>
      )}
    </>
  );
}

// Groups in order of size, so the pillar topics lead and one-off topics settle at the bottom;
// ties fall back to the label so the order is stable between builds.
function groupByTopic<T extends SidebarItem>(items: T[], index: Map<string, IndexEntry>) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const topic = index.get(normalise(item.permalink))?.topic ?? 'More';
    const group = groups.get(topic);
    if (group) group.push(item);
    else groups.set(topic, [item]);
  }
  return [...groups.entries()].sort(
    ([topicA, a], [topicB, b]) => b.length - a.length || topicA.localeCompare(topicB),
  );
}

export function BlogArticleList<T extends SidebarItem>({
  items,
  className,
}: {
  items: T[];
  className?: string;
}): ReactNode {
  const index = useIndex();
  const {pathname} = useLocation();
  const groups = useMemo(() => groupByTopic(items, index), [items, index]);

  return (
    <div className={clsx('rt-article-list', className)}>
      {groups.map(([topic, groupItems]) => (
        <section className="rt-article-list__group" key={topic}>
          <h3 className="rt-article-list__topic">
            {topic}
            <span className="rt-article-list__count">{groupItems.length}</span>
          </h3>
          <ul className="rt-article-list__items">
            {groupItems.map((item) => {
              const current = normalise(pathname) === normalise(item.permalink);
              return (
                <li key={item.permalink}>
                  <Link
                    to={item.permalink}
                    className={clsx(
                      'rt-article-list__link',
                      current && 'rt-article-list__link--active',
                    )}
                    aria-current={current ? 'page' : undefined}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
