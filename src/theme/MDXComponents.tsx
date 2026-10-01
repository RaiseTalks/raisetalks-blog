import MDXComponents from '@theme-original/MDXComponents';
import {BlogFAQ, BlogFAQItem} from '@site/src/components/BlogFAQ';
import BlogCTA from '@site/src/components/BlogCTA';
import {
  BlogDeck,
  BlogTakeaways,
  BlogReadNextList,
  BlogReadNextItem,
} from '@site/src/components/BlogArticleParts';

// Global MDX components.
// BlogCTA is the in-post call to action, used directly by posts; with `magnet` it becomes an
// email-gated download. The rest are emitted by the blog's remark plugins:
// BlogDeck                 - src/plugins/remark-article-deck.js
// BlogFAQ/BlogFAQItem      - src/plugins/remark-blog-faq.js
// BlogTakeaways            - src/plugins/remark-key-takeaways.js
// BlogReadNextList/Item    - src/plugins/remark-read-next.js
export default {
  ...MDXComponents,
  BlogFAQ,
  BlogFAQItem,
  BlogCTA,
  BlogDeck,
  BlogTakeaways,
  BlogReadNextList,
  BlogReadNextItem,
};
