import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import type {Props} from '@theme/BlogLayout';

const STORAGE_KEY = 'rt-blog-articles-open';

// Swizzled (ejected) from @docusaurus/theme-classic to add the article-list toggle.
// On article pages (the only blog pages with a table of contents) the left article list starts
// hidden so the article has the page to itself. "All articles" / "Hide articles" sits in the right
// column above "In this article", so it never covers content; the choice is remembered per browser.
// The list pages keep their sidebar, and phones keep the article list in the menu.
export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const isArticle = Boolean(toc);
  const [articlesOpen, setArticlesOpen] = useState(false);

  useEffect(() => {
    try {
      setArticlesOpen(window.localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      // Storage unavailable (private mode, blocked): keep the default.
    }
  }, []);

  // List pages: line the right edge of the Recent Posts text up with the right edge of the
  // header's "Log In" button. The header spans the viewport while the blog sits in a centred
  // container, so the offset is measured and exposed as --rt-list-extend.
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isArticle || !hasSidebar) return undefined;
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    let frame = 0;
    const measure = () => {
      wrapper.style.setProperty('--rt-list-extend', '0px');
      const login = document.querySelector('.navbar__link--login');
      // A list link's content box is where its text wraps, i.e. where the text lines end.
      const link = wrapper.querySelector<HTMLElement>('aside nav a');
      const aside = wrapper.querySelector<HTMLElement>('aside');
      if (!login || !link || !aside) return;
      const loginBox = login.getBoundingClientRect();
      if (loginBox.width === 0 || link.getBoundingClientRect().width === 0) return;
      const textRight =
        link.getBoundingClientRect().right -
        parseFloat(window.getComputedStyle(link).paddingRight || '0');
      // Never push the list past the viewport edge, whatever the header is doing mid-resize.
      const room = window.innerWidth - 16 - aside.getBoundingClientRect().right;
      const extend = Math.max(-120, Math.min(loginBox.right - textRight, room));
      wrapper.style.setProperty('--rt-list-extend', `${Math.round(extend)}px`);
    };
    // Measure after layout settles (next frame), and once more shortly after, in case the
    // header re-renders late; repeat on every window resize.
    let settle = 0;
    const align = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      frame = requestAnimationFrame(measure);
      settle = window.setTimeout(measure, 200);
    };

    align();
    document.fonts?.ready.then(align);
    window.addEventListener('resize', align);
    // The blog container's width only changes with the viewport, so watching it catches every
    // resize (including ones that don't fire a window resize event) without reacting to itself.
    const container = wrapper.querySelector('.container');
    let lastWidth = 0;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (width !== lastWidth) {
        lastWidth = width;
        align();
      }
    });
    if (container) observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener('resize', align);
      observer.disconnect();
    };
  }, [isArticle, hasSidebar]);

  const toggle = () => {
    const next = !articlesOpen;
    setArticlesOpen(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // Not persisted; the toggle still works for this page view.
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        'blog-wrapper',
        isArticle && !articlesOpen && 'blog-wrapper--articles-hidden',
      )}>
      <Layout {...layoutProps}>
        <div className="container margin-vert--lg">
          <div className="row">
            <BlogSidebar sidebar={sidebar} />
            <main
              className={clsx('col', {
                'col--7': hasSidebar,
                'col--9 col--offset-1': !hasSidebar,
              })}>
              {children}
            </main>
            {toc && (
              <div className="col col--2">
                <div className="blog-side-panel">
                  {hasSidebar && (
                    <button
                      type="button"
                      className="blog-articles-toggle"
                      onClick={toggle}
                      aria-expanded={articlesOpen}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        aria-hidden="true">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                      {articlesOpen ? 'Hide articles' : 'All articles'}
                    </button>
                  )}
                  {toc}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
