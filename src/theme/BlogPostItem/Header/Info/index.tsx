import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {usePluralForm} from '@docusaurus/theme-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogPostItem/Header/Info';

// Swizzled to drop the visible publish date: posts show only the reading time. The date stays in
// front matter for ordering, the sitemap, RSS and structured data.
export default function BlogPostItemHeaderInfo({className}: Props): ReactNode {
  const {metadata} = useBlogPost();
  const {selectMessage} = usePluralForm();
  const {readingTime} = metadata;

  if (typeof readingTime === 'undefined') return null;

  const minutes = Math.ceil(readingTime);
  return (
    <div className={clsx('margin-vert--md', className)}>
      {selectMessage(
        minutes,
        translate(
          {
            id: 'theme.blog.post.readingTime.plurals',
            message: 'One min read|{readingTime} min read',
          },
          {readingTime: minutes},
        ),
      )}
    </div>
  );
}
