import MDXComponents from '@theme-original/MDXComponents';
import {BlogFAQ, BlogFAQItem} from '@site/src/components/BlogFAQ';
import FundsLeadMagnet from '@site/src/components/FundsLeadMagnet';

// Global MDX components. BlogFAQ/BlogFAQItem are emitted by src/plugins/remark-blog-faq.js.
// FundsLeadMagnet is the email gate used in blog/2026-09-30-new-vc-funds-2026.md.
export default {
  ...MDXComponents,
  BlogFAQ,
  BlogFAQItem,
  FundsLeadMagnet,
};
