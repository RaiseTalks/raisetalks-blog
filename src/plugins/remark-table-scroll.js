/**
 * Puts every article table in a scrollable frame.
 *
 * A table only shrinks so far before it stops fitting: the six-column fund tables ran past the
 * right edge of a phone screen with the last column unreachable, and broke words mid-word in the
 * columns that did fit. Wrapped in <BlogTable>, a table that cannot fit scrolls sideways instead
 * of being clipped, and keeps a floor on its width so columns stay legible.
 *
 * The column count travels with it, so the stylesheet can set that floor and tighten the type on
 * the widest tables (src/css/blog.css).
 */

function columnCount(table) {
  const [headerRow] = table.children || [];
  return headerRow ? (headerRow.children || []).length : 0;
}

module.exports = function remarkTableScroll() {
  return (tree) => {
    const children = tree.children;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.type !== 'table') continue;
      children[i] = {
        type: 'mdxJsxFlowElement',
        name: 'BlogTable',
        attributes: [
          {type: 'mdxJsxAttribute', name: 'columns', value: String(columnCount(node))},
        ],
        children: [node],
      };
    }
  };
};
