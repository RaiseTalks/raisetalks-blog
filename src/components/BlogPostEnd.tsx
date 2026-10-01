import React, {useState, type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import styles from './BlogPostEnd.module.css';

// Sits at the end of every article (rendered from src/theme/BlogPostItem): who wrote it, and a
// way to pass it on. The article's own closing CTA stays in the Markdown, above this.

function XIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
    </svg>
  );
}

function LinkIcon(): ReactNode {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function BlogPostEnd(): ReactNode {
  const {metadata} = useBlogPost();
  const {siteConfig} = useDocusaurusContext();
  const {withBaseUrl} = useBaseUrlUtils();
  const [copied, setCopied] = useState(false);

  const author = metadata.authors[0];
  const url = `${siteConfig.url}${metadata.permalink}`;
  const shareText = encodeURIComponent(metadata.title);
  const shareUrl = encodeURIComponent(url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, denied permission): leave the label unchanged.
    }
  };

  return (
    <aside className={styles.end} aria-label="About the author and sharing">
      {author && (
        <div className={styles.author}>
          {author.imageURL && (
            <img
              className={styles.avatar}
              src={withBaseUrl(author.imageURL)}
              alt=""
              width={56}
              height={56}
              loading="lazy"
            />
          )}
          <div>
            <p className={styles.eyebrow}>Written by</p>
            <p className={styles.name}>
              {author.url ? (
                <a href={author.url} target="_blank" rel="noopener noreferrer">
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </p>
            {author.title && <p className={styles.role}>{author.title}</p>}
          </div>
        </div>
      )}

      <div className={styles.share}>
        <span className={styles.shareLabel}>Share</span>
        <a
          className={styles.shareButton}
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X">
          <XIcon />
        </a>
        <a
          className={styles.shareButton}
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn">
          <LinkedInIcon />
        </a>
        <button
          type="button"
          className={styles.shareButton}
          onClick={copy}
          aria-label="Copy link to this article">
          <LinkIcon />
        </button>
        <span className={styles.copied} role="status" aria-live="polite">
          {copied ? 'Link copied' : ''}
        </span>
      </div>
    </aside>
  );
}
