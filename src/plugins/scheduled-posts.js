/**
 * Scheduled publishing for the blog.
 *
 * Every post has a publish `date` in its front matter (one per working day). Production builds only
 * include posts whose date has arrived; the deploy workflow rebuilds each working-day morning, so the
 * day's post goes live without a push. `yarn start` shows every post, so upcoming ones can be previewed.
 * Set SHOW_SCHEDULED_POSTS=true to include upcoming posts in a production build as well, or
 * BLOG_BUILD_DATE=YYYY-MM-DD to build the site as it will look on that day.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SHOW_ALL =
  process.env.NODE_ENV === 'development' || process.env.SHOW_SCHEDULED_POSTS === 'true';

const BUILD_DATE = process.env.BLOG_BUILD_DATE ? new Date(process.env.BLOG_BUILD_DATE) : new Date();

function isPublished(date, now = BUILD_DATE) {
  return SHOW_ALL || new Date(date).getTime() <= now.getTime();
}

// Front matter of every post in blog/, read directly so it is available before Docusaurus loads content.
function readPosts(siteDir) {
  const blogDir = path.join(siteDir, 'blog');
  return fs
    .readdirSync(blogDir)
    .filter((file) => /\.mdx?$/.test(file) && !file.startsWith('_'))
    .map((file) => {
      const source = fs.readFileSync(path.join(blogDir, file), 'utf8');
      const match = source.match(/^---\n([\s\S]*?)\n---/);
      return {file, ...(match ? yaml.load(match[1]) : {})};
    })
    .filter((post) => !post.draft && post.slug);
}

// Slugs of posts that exist but are not live yet in this build.
function unpublishedSlugs(siteDir) {
  return new Set(
    readPosts(siteDir)
      .filter((post) => post.date && !isPublished(post.date))
      .map((post) => post.slug),
  );
}

// Blog plugin `processBlogPosts` hook: drops posts whose publish date is still in the future.
async function filterScheduledPosts({blogPosts}) {
  return blogPosts.filter((post) => isPublished(post.metadata.date));
}

module.exports = {isPublished, readPosts, unpublishedSlugs, filterScheduledPosts};
