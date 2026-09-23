/**
 * Turns a blog post's "Frequently asked questions" section into the website FAQ accordion.
 *
 * Authors keep writing the FAQ as plain Markdown, under an H2 containing "frequently asked questions":
 *
 *   **What is a data room for a startup?**
 *   A structured, permissioned record of your company...
 *
 * The heading is normalised to the website's "Frequently Asked Questions". Each bold-led paragraph
 * becomes a <BlogFAQItem question="...">, and consecutive items are wrapped in one <BlogFAQ>. The answer may sit on the next line or in the following paragraph(s). The section
 * ends at the next heading or `---`. Both components are registered in src/theme/MDXComponents.tsx.
 */

const FAQ_HEADING = /frequently asked questions/i;
// Heading text as it appears on the website FAQ, whatever casing the post uses.
const FAQ_TITLE = 'Frequently Asked Questions';

function toText(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children || []).map(toText).join('');
}

function isQuestion(node) {
  return (
    node.type === 'paragraph' &&
    node.children.length > 0 &&
    node.children[0].type === 'strong'
  );
}

function jsx(name, attributes, children) {
  return {
    type: 'mdxJsxFlowElement',
    name,
    attributes: Object.entries(attributes).map(([key, value]) => ({
      type: 'mdxJsxAttribute',
      name: key,
      value,
    })),
    children,
  };
}

// Splits "**Question?**\nAnswer text" into the question string and the inline answer nodes.
function splitQuestion(paragraph) {
  const [strong, ...rest] = paragraph.children;
  while (rest.length && rest[0].type === 'break') rest.shift();
  if (rest.length && rest[0].type === 'text') {
    rest[0] = {...rest[0], value: rest[0].value.replace(/^\s+/, '')};
    if (!rest[0].value) rest.shift();
  }
  return {question: toText(strong).trim(), answer: rest};
}

module.exports = function remarkBlogFaq() {
  return (tree) => {
    const children = tree.children;
    const start = children.findIndex(
      (node) => node.type === 'heading' && node.depth === 2 && FAQ_HEADING.test(toText(node)),
    );
    if (start === -1) return;

    let end = start + 1;
    while (
      end < children.length &&
      children[end].type !== 'heading' &&
      children[end].type !== 'thematicBreak'
    ) {
      end++;
    }

    const items = [];
    for (const node of children.slice(start + 1, end)) {
      if (isQuestion(node)) {
        const {question, answer} = splitQuestion(node);
        items.push({question, body: answer.length ? [{type: 'paragraph', children: answer}] : []});
      } else if (items.length) {
        items[items.length - 1].body.push(node);
      } else {
        return; // Content before the first question: not in the FAQ format, leave it untouched.
      }
    }
    if (!items.length) return;

    children[start].children = [{type: 'text', value: FAQ_TITLE}];

    // FAQPage structured data, rendered by BlogFAQ into the page head for search and AI engines.
    const schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(({question, body}) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: body.map(toText).join(' ').replace(/\s+/g, ' ').trim(),
        },
      })),
    });

    const faq = jsx(
      'BlogFAQ',
      {schema},
      items.map(({question, body}) => jsx('BlogFAQItem', {question}, body)),
    );
    children.splice(start + 1, end - start - 1, faq);
  };
};
