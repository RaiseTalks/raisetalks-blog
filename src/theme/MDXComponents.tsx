import MDXComponents from '@theme-original/MDXComponents';
import {BlogFAQ, BlogFAQItem} from '@site/src/components/BlogFAQ';

// Global MDX components. BlogFAQ/BlogFAQItem are emitted by src/plugins/remark-blog-faq.js.
export default {
  ...MDXComponents,
  BlogFAQ,
  BlogFAQItem,
};
