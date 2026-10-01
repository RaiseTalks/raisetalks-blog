import React, {memo, type ReactNode} from 'react';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';
import {NavbarSecondaryMenuFiller} from '@docusaurus/theme-common';
import type {Props} from '@theme/BlogSidebar/Mobile';
import {
  ArticleFilter,
  BlogArticleList,
  useArticleFilter,
} from '@site/src/components/BlogArticleNav';

// Swizzled (ejected) from @docusaurus/theme-classic so the mobile menu shows the same filter and
// topic-grouped list as the desktop sidebar (src/components/BlogArticleNav).

function BlogSidebarMobileSecondaryMenu({sidebar}: Props): ReactNode {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const {query, setQuery, filtered} = useArticleFilter(items);

  return (
    <div className="rt-article-nav--menu">
      <ArticleFilter
        query={query}
        setQuery={setQuery}
        shown={filtered.length}
        total={items.length}
      />
      {filtered.length > 0 && <BlogArticleList items={filtered} />}
    </div>
  );
}

function BlogSidebarMobile(props: Props): ReactNode {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default memo(BlogSidebarMobile);
