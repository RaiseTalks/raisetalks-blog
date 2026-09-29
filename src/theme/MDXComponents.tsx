import MDXComponents from '@theme-original/MDXComponents';
import {BlogFAQ, BlogFAQItem} from '@site/src/components/BlogFAQ';
import BlogCTA from '@site/src/components/BlogCTA';

// Global MDX components. BlogFAQ/BlogFAQItem are emitted by src/plugins/remark-blog-faq.js.
// BlogCTA is the in-post call to action; with `magnet` it becomes an email-gated download.
export default {
  ...MDXComponents,
  BlogFAQ,
  BlogFAQItem,
  BlogCTA,
};
