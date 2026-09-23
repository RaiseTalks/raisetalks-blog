/**
 * Hides links to blog posts that are scheduled but not live yet (see scheduled-posts.js), so readers
 * never land on a 404 and the build's broken-link check passes. Once the target post is published,
 * the next build restores the link automatically.
 *
 * - A list item that is only a link to an unpublished post (e.g. a "Read next" entry) is removed.
 *   If that empties the list, the list and its heading are removed too.
 * - Any other link to an unpublished post keeps its text but loses the link.
 */
const LINK = /^\/blog\/([a-z0-9-]+)\/?(?:#.*)?$/;

module.exports = function remarkUnpublishedLinks({unpublished}) {
  const isHidden = (node) => {
    if (node.type !== 'link') return false;
    const match = node.url.match(LINK);
    return Boolean(match && unpublished.has(match[1]));
  };

  const isOnlyHiddenLink = (listItem) =>
    listItem.children.length === 1 &&
    listItem.children[0].type === 'paragraph' &&
    listItem.children[0].children.filter((child) => !(child.type === 'text' && !child.value.trim()))
      .every(isHidden);

  // Replaces hidden links with their children (the link text), recursively.
  const unwrap = (node) => {
    if (!node.children) return;
    node.children = node.children.flatMap((child) => (isHidden(child) ? child.children : [child]));
    node.children.forEach(unwrap);
  };

  return (tree) => {
    if (!unpublished.size) return;

    const children = tree.children;
    for (let i = children.length - 1; i >= 0; i--) {
      const node = children[i];
      if (node.type !== 'list') continue;
      node.children = node.children.filter((item) => !isOnlyHiddenLink(item));
      if (!node.children.length) {
        const headingBefore = children[i - 1] && children[i - 1].type === 'heading';
        children.splice(headingBefore ? i - 1 : i, headingBefore ? 2 : 1);
      }
    }

    unwrap(tree);
  };
};
