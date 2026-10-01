/**
 * Marks a post's opening paragraphs as its deck.
 *
 * The house format opens with two or three paragraphs before `<!-- truncate -->` and the first
 * section heading. Those paragraphs are the article's standfirst, so they are wrapped in
 * <BlogDeck> and set one step above the body; without this only the very first paragraph was
 * styled and the intro dropped to body size mid-thought.
 *
 * Only the leading run of paragraphs is wrapped: the first node that is anything else (a heading,
 * a list, the truncate marker) ends the deck, so nothing else about the post changes.
 */

module.exports = function remarkArticleDeck() {
  return (tree) => {
    const children = tree.children;
    // The parsed front matter is still the first node at this point.
    const start = children.findIndex((node) => node.type !== 'yaml' && node.type !== 'toml');
    if (start === -1) return;

    let end = start;
    while (end < children.length && children[end].type === 'paragraph') end++;
    if (end === start) return;

    // A post that is nothing but paragraphs has no sections to lead into: leave it alone.
    if (end === children.length) return;

    children.splice(start, end - start, {
      type: 'mdxJsxFlowElement',
      name: 'BlogDeck',
      attributes: [],
      children: children.slice(start, end),
    });
  };
};
