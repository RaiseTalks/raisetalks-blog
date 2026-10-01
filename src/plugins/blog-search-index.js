/**
 * Builds the article index for the blog's article navigation (src/components/BlogArticleNav).
 *
 * One entry per published post: its permalink, its topic (the first tag, labelled from
 * blog/tags.yml) and a lowercased haystack of title, description, keywords and tags, exposed as
 * plugin global data. The sidebar groups the list by topic and filters it against the haystack.
 * The whole index is a few kilobytes, so both run in the page with no request and no search
 * service. Scheduled posts appear on the day they go live, like everywhere else on the site.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {readPosts, isPublished} = require('./scheduled-posts');

// Tag id -> display label, e.g. 'data-room' -> 'Data Room'.
function tagLabels(siteDir) {
  const file = path.join(siteDir, 'blog', 'tags.yml');
  const tags = yaml.load(fs.readFileSync(file, 'utf8')) || {};
  return new Map(Object.entries(tags).map(([id, tag]) => [id, tag.label || id]));
}

function haystack(post) {
  return [
    post.title,
    post.title_meta,
    post.description,
    ...(Array.isArray(post.keywords) ? post.keywords : []),
    ...(Array.isArray(post.tags) ? post.tags.map((tag) => String(tag).replace(/-/g, ' ')) : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

module.exports = function blogSearchIndexPlugin(context) {
  return {
    name: 'blog-search-index',
    async contentLoaded({actions}) {
      const labels = tagLabels(context.siteDir);
      const posts = readPosts(context.siteDir)
        .filter((post) => post.title && !post.unlisted && isPublished(post.date))
        .map((post) => {
          // A post's first tag is the one it is primarily about: the house format puts the
          // subject tag first, so it is what the sidebar groups by.
          const [primary] = Array.isArray(post.tags) ? post.tags : [];
          return {
            permalink: `/blog/${post.slug}`,
            topic: primary ? labels.get(primary) || primary : 'More',
            text: haystack(post),
          };
        });
      actions.setGlobalData({posts});
    },
  };
};
