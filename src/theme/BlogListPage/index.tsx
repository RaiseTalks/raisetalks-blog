import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import Link from '@docusaurus/Link';

// Entry points into the archive, in the order a founder tends to need them. Tag permalinks come
// from blog/tags.yml; the blog is served from /blog, so tag pages live under /blog/tags/.
const TOPICS = [
  {label: 'Data Room', to: '/blog/tags/data-room'},
  {label: 'Due Diligence', to: '/blog/tags/due-diligence'},
  {label: 'Fundraising', to: '/blog/tags/fundraising'},
  {label: 'Benchmarks', to: '/blog/tags/benchmarks'},
  {label: 'Dealflow', to: '/blog/tags/dealflow'},
  {label: 'Investor Playbook', to: '/blog/tags/investor-playbook'},
];

function BlogListPageMetadata(props: Props): ReactNode {
   const { metadata } = props;
   const {
      siteConfig: { title: siteTitle },
   } = useDocusaurusContext();
   const { blogDescription, blogTitle, permalink } = metadata;
   const isBlogOnlyMode = permalink === '/';
   const title = isBlogOnlyMode ? siteTitle : blogTitle;
   return (
      <>
         <PageMetadata title={title} description={blogDescription} />
         <SearchMetadata tag="blog_posts_list" />
      </>
   );
}

function BlogListPageContent(props: Props): ReactNode {
   const { metadata, items, sidebar } = props;

   return (
      <BlogLayout sidebar={sidebar}>
         {/* Blog header: same hero construction as the homepage (sans line + Georgia italic
             gradient accent), on the site's H1 type tokens. */}
         <header className="rt-blog-hero">
            <h1 className="rt-blog-hero__title">
               <span className="rt-blog-hero__line">RaiseTalks Blog</span>
               <span className="rt-blog-hero__accent">fundraising, decoded</span>
            </h1>
            <p className="rt-blog-hero__description">
               How investors evaluate early-stage startups: data rooms, diligence, benchmarks, and
               the work that moves a round to a term sheet.
            </p>
            <nav className="rt-blog-topics" aria-label="Browse by topic">
               {TOPICS.map((topic) => (
                  <Link key={topic.to} className="rt-blog-topics__chip" to={topic.to}>
                     {topic.label}
                  </Link>
               ))}
               <Link className="rt-blog-topics__chip rt-blog-topics__chip--all" to="/blog/tags">
                  All topics
               </Link>
            </nav>
         </header>

         <BlogPostItems items={items} />
         <BlogListPaginator metadata={metadata} />
      </BlogLayout>
   );
}

export default function BlogListPage(props: Props): ReactNode {
   return (
      <HtmlClassNameProvider
         className={clsx(
            ThemeClassNames.wrapper.blogPages,
            ThemeClassNames.page.blogListPage,
         )}>
         <BlogListPageMetadata {...props} />
         <BlogListPageStructuredData {...props} />
         <BlogListPageContent {...props} />
      </HtmlClassNameProvider>
   );
}
