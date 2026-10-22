"use client";

import Image from "next/image";
import { useState } from "react";
import type { Author } from "@/lib/blog/posts";

/** End of every article (pre-redesign blog look): who wrote it, and a way to pass it on. */
export function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedInSquare({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

const shareButton = "flex size-9 items-center justify-center rounded-full border border-article-border bg-page text-article-author transition-colors duration-200 hover:border-brand-light-blue hover:text-brand-light-blue";

export function ArticleEnd({ author, url, title }: { author?: Author; url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: leave the label unchanged
    }
  };
  const u = encodeURIComponent(url);
  return (
    <aside aria-label="About the author and sharing" className="mt-10 flex flex-col gap-4 border-t border-article-border px-4 pt-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-5 laptop:mx-8">
      {author && (
        <div className="flex items-center gap-4">
          {author.image && <Image src={author.image} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-article-faint">Written by</p>
            <p className="text-[16px] font-semibold text-article-author">
              {author.url ? <a href={author.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light-blue">{author.name}</a> : author.name}
            </p>
            {author.title && <p className="text-footnote text-article-muted">{author.title}</p>}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-article-faint">Share</span>
        <a className={shareButton} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><XIcon /></a>
        <a className={shareButton} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><LinkedInSquare /></a>
        <button type="button" className={shareButton} onClick={copy} aria-label="Copy link to this article"><LinkIcon /></button>
        <span role="status" aria-live="polite" className="text-footnote text-article-muted">{copied ? "Link copied" : ""}</span>
      </div>
    </aside>
  );
}
