import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

// In-article blocks generated from plain Markdown by the blog's remark plugins
// (remark-article-deck, remark-key-takeaways, remark-read-next). Posts never use these directly.
// Styles live in src/css/blog.css next to the rest of the article styling.

export function BlogDeck({children}: {children: ReactNode}): ReactNode {
  return <div className="rt-deck">{children}</div>;
}

export function BlogTable({
  columns,
  children,
}: {
  columns?: string;
  children: ReactNode;
}): ReactNode {
  const count = Number(columns) || 3;
  return (
    <>
      <div
        className={clsx('rt-table', count >= 5 && 'rt-table--wide')}
        // The floor on the table's width, so columns stay legible instead of squeezing
        style={{'--rt-table-columns': count} as React.CSSProperties}
        // Scrollable regions need to be reachable from the keyboard
        tabIndex={0}
        role="group">
        {children}
      </div>
      {/* Only shown on the screens narrow enough for the table to actually scroll */}
      {count >= 4 && <p className="rt-table__hint">Scroll the table for more columns</p>}
    </>
  );
}

export function BlogTakeaways({children}: {children: ReactNode}): ReactNode {
  return <div className="rt-takeaways">{children}</div>;
}

export function BlogReadNextList({children}: {children: ReactNode}): ReactNode {
  return <div className="rt-read-next">{children}</div>;
}

export function BlogReadNextItem({
  href,
  title,
  image,
}: {
  href: string;
  title: string;
  image?: string;
}): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();
  return (
    <Link className="rt-read-next__card" to={href}>
      {image && (
        <span className="rt-read-next__media">
          <img src={withBaseUrl(image)} alt="" loading="lazy" />
        </span>
      )}
      <span className="rt-read-next__title">{title}</span>
    </Link>
  );
}
