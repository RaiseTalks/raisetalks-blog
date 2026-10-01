/**
 * Turns a post's "Key takeaways" list into the website's takeaways card.
 *
 * Authors keep writing plain Markdown:
 *
 *   ## Key takeaways
 *
 *   - A data room exists to **answer questions**, not to store files.
 *   - ...
 *
 * The H2 is left exactly where it is, so the table of contents and the heading anchor are
 * unchanged; only the list that follows it is wrapped in <BlogTakeaways> (registered in
 * src/theme/MDXComponents.tsx, styled in src/css/blog.css).
 */

const TAKEAWAYS_HEADING = /^key takeaways$/i;

function toText(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children || []).map(toText).join('');
}

module.exports = function remarkKeyTakeaways() {
  return (tree) => {
    const children = tree.children;
    const start = children.findIndex(
      (node) =>
        node.type === 'heading' &&
        node.depth === 2 &&
        TAKEAWAYS_HEADING.test(toText(node).trim()),
    );
    if (start === -1) return;

    const list = children[start + 1];
    if (!list || list.type !== 'list') return;

    children[start + 1] = {
      type: 'mdxJsxFlowElement',
      name: 'BlogTakeaways',
      attributes: [],
      children: [list],
    };
  };
};
