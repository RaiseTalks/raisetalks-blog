/**
 * Turns a post's "Read next" list into cards.
 *
 * Authors keep writing plain Markdown:
 *
 *   ## Read next
 *
 *   - [The startup data room, field by field](/blog/startup-data-room-field-by-field-2026)
 *   - ...
 *
 * Each entry becomes a <BlogReadNextItem> with the target post's real title and its OG image,
 * read from that post's front matter at build time, wrapped in one <BlogReadNextList>
 * (registered in src/theme/MDXComponents.tsx, styled in src/css/blog.css).
 *
 * Runs after remark-unpublished-links, so entries pointing at posts that are not live yet have
 * already been dropped from the list and never become cards.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const READ_NEXT_HEADING = /^read next$/i;
const BLOG_LINK = /^\/blog\/([a-z0-9-]+)\/?(?:#.*)?$/;

// slug -> {title, image}, read straight from the Markdown front matter (one scan per build).
let cache = null;
function postsBySlug(siteDir) {
  if (cache) return cache;
  const blogDir = path.join(siteDir, 'blog');
  cache = new Map();
  for (const file of fs.readdirSync(blogDir)) {
    if (!/\.mdx?$/.test(file) || file.startsWith('_')) continue;
    const source = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const match = source.match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;
    const frontMatter = yaml.load(match[1]) || {};
    if (frontMatter.slug) {
      cache.set(frontMatter.slug, {title: frontMatter.title, image: frontMatter.image});
    }
  }
  return cache;
}

function toText(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children || []).map(toText).join('');
}

// The single link in a "- [title](/blog/slug)" list item, or null for anything else.
function itemLink(listItem) {
  const [paragraph] = listItem.children;
  if (!paragraph || paragraph.type !== 'paragraph') return null;
  const links = paragraph.children.filter((child) => child.type === 'link');
  return links.length === 1 ? links[0] : null;
}

function attribute(name, value) {
  return {type: 'mdxJsxAttribute', name, value};
}

module.exports = function remarkReadNext({siteDir}) {
  return (tree) => {
    const children = tree.children;
    const start = children.findIndex(
      (node) =>
        node.type === 'heading' && node.depth === 2 && READ_NEXT_HEADING.test(toText(node).trim()),
    );
    if (start === -1) return;

    const list = children[start + 1];
    if (!list || list.type !== 'list') return;

    const posts = postsBySlug(siteDir);
    const items = [];
    for (const listItem of list.children) {
      const link = itemLink(listItem);
      if (!link) return; // Not the plain link list this transform expects: leave the post alone.
      const slug = (link.url.match(BLOG_LINK) || [])[1];
      const post = slug ? posts.get(slug) : undefined;
      const attributes = [
        attribute('href', link.url),
        attribute('title', post?.title || toText(link).trim()),
      ];
      if (post?.image) attributes.push(attribute('image', post.image));
      items.push({type: 'mdxJsxFlowElement', name: 'BlogReadNextItem', attributes, children: []});
    }
    if (!items.length) return;

    children[start + 1] = {
      type: 'mdxJsxFlowElement',
      name: 'BlogReadNextList',
      attributes: [],
      children: items,
    };
  };
};
