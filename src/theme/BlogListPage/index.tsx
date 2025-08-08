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
   const { blogTitle, blogDescription } = metadata;

   return (
      <BlogLayout sidebar={sidebar}>
         {/* Simplified header: clean spacing, no background/shadows/cards */}
         <section className="pb-10">
            <div className="container mx-auto px-4">
               <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{blogTitle}</h1>
                  {blogDescription ? (
                     <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600">{blogDescription}</p>
                  ) : null}
               </div>
            </div>
         </section>

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
