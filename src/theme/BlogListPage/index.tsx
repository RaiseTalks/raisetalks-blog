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

   return (
      <BlogLayout sidebar={sidebar}>
         {/* Enhanced Blog Header - Matching Homepage Hero Style */}
         <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-2xl shadow-lg shadow-gray-200/50 mb-8">
            {/* Background Pattern - matching homepage */}
            <div className="absolute inset-0 opacity-10">
               <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(
                     45deg,
                     transparent,
                     transparent 35px,
                     rgba(1, 116, 225, 0.03) 35px,
                     rgba(1, 116, 225, 0.03) 70px
                  )`
               }}></div>
            </div>

            {/* Animated gradient orb - matching homepage */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="container mx-auto px-4 relative z-10">
               <div className="max-w-4xl mx-auto text-center">
                  {/* Pre-title badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                     <span className="text-sm font-semibold text-[var(--raisetalks-blue-primary)]">📚 Knowledge Hub</span>
                  </div>

                  {/* Main Title with gradient text */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                     <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                        RaiseTalks Blog
                     </span>
                  </h1>

                  {/* Subtitle with enhanced typography */}
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto mb-8">
                     Expert insights on <span className="text-[var(--raisetalks-blue-primary)] font-semibold">due diligence</span>,
                     <span className="text-[var(--raisetalks-blue-primary)] font-semibold"> fundraising</span>, and
                     <span className="text-[var(--raisetalks-blue-primary)] font-semibold"> business growth</span>
                  </p>

                  {/* Trust indicators */}
                  <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                     <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Weekly insights</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Industry experts</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Actionable advice</span>
                     </div>
                  </div>
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
