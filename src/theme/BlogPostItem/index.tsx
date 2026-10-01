import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import BlogPostEnd from '@site/src/components/BlogPostEnd';

// Swizzled (ejected) from @docusaurus/theme-classic.
//
// List pages (/blog, tag and author lists) get a compact card instead of the default stack of
// title + reading time + author + avatar + socials + excerpt + every tag: one author writes the
// blog, so repeating the author block on every row costs a third of the card height and says
// nothing. The card shows the post's own OG image (front matter `image`, already produced for
// every post), the title, reading time, the SEO description as the excerpt, and three tags.
//
// Article pages keep the default header (title, reading time, author) and add the post's topic
// above it as an eyebrow, plus a rule under it. The author card and share row at the end of the
// post come from src/components/BlogPostEnd.

const MAX_CARD_TAGS = 3;

function ArrowIcon(): ReactNode {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function BlogPostCard({className}: {className?: string}): ReactNode {
  const {metadata, frontMatter} = useBlogPost();
  const {permalink, title, description, readingTime, tags} = metadata;
  const {withBaseUrl} = useBaseUrlUtils();
  const image = frontMatter.image ? withBaseUrl(frontMatter.image) : undefined;
  const minutes = typeof readingTime === 'number' ? Math.ceil(readingTime) : undefined;

  return (
    <article className={clsx('rt-post-card', className)}>
      {image && (
        <Link className="rt-post-card__media" to={permalink} tabIndex={-1} aria-hidden="true">
          <img src={image} alt="" loading="lazy" />
        </Link>
      )}
      <div className="rt-post-card__body">
        <h2 className="rt-post-card__title">
          <Link to={permalink}>{title}</Link>
        </h2>
        {minutes !== undefined && (
          <p className="rt-post-card__meta">{minutes} min read</p>
        )}
        {description && <p className="rt-post-card__excerpt">{description}</p>}
        <div className="rt-post-card__footer">
          {tags.length > 0 && (
            <ul className="rt-post-card__tags">
              {tags.slice(0, MAX_CARD_TAGS).map((tag) => (
                <li key={tag.permalink}>
                  <Link to={tag.permalink}>{tag.label}</Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            className="rt-post-card__more"
            to={permalink}
            aria-label={`Read more about ${title}`}>
            Read more
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ArticleHeader(): ReactNode {
  const {metadata} = useBlogPost();
  const [topic] = metadata.tags;

  return (
    <div className="rt-article-header">
      {topic && (
        <Link className="rt-article-header__eyebrow" to={topic.permalink}>
          {topic.label}
        </Link>
      )}
      <BlogPostItemHeader />
    </div>
  );
}

export default function BlogPostItem({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}): ReactNode {
  const {isBlogPostPage} = useBlogPost();

  if (!isBlogPostPage) {
    return <BlogPostCard className={className} />;
  }

  return (
    <BlogPostItemContainer className={className}>
      <ArticleHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
      <BlogPostEnd />
    </BlogPostItemContainer>
  );
}
