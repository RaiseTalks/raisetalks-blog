import React, {memo} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogSidebar/Desktop';
import {
  ArticleFilter,
  BlogArticleList,
  useArticleFilter,
} from '@site/src/components/BlogArticleNav';

import styles from './styles.module.css';

// Swizzled (ejected) from @docusaurus/theme-classic: the default flat list of every post is
// replaced by the filter and the topic-grouped list in src/components/BlogArticleNav.

function BlogSidebarDesktop({sidebar}: Props) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const {query, setQuery, filtered} = useArticleFilter(items);

  return (
    <aside className="col col--3">
      <nav
        className={clsx(styles.sidebar, 'thin-scrollbar')}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}>
        <div className="rt-article-nav__title">{sidebar.title}</div>

        <ArticleFilter
          query={query}
          setQuery={setQuery}
          shown={filtered.length}
          total={items.length}
        />

        {filtered.length > 0 && <BlogArticleList items={filtered} />}
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
