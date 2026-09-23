/**
 * Writes /llms.txt at build time: a plain-text index of the site and every published blog post,
 * the format AI assistants and answer engines read to find a site's canonical content.
 * Posts are read from blog/*.md(x) front matter, so new posts appear without touching this file;
 * scheduled posts are listed once their publish date has arrived.
 */
const fs = require('fs');
const path = require('path');
const {readPosts, isPublished} = require('./scheduled-posts');

const PAGES = [
  ['About RaiseTalks', '/about-us', 'Who we are and why we build RaiseTalks.'],
  ['For startups', '/startups', 'Structured data room, readiness score and investor pipeline for founders.'],
  ['For investors', '/investors', 'Dealflow, scoring and diligence tools for angels, micro-funds and VCs.'],
  ['Pricing', '/pricing', 'Plans and the 30-day trial.'],
];

module.exports = function llmsTxtPlugin(context) {
  return {
    name: 'llms-txt',
    async postBuild({outDir}) {
      const {url, title, tagline} = context.siteConfig;
      const posts = readPosts(context.siteDir)
        .filter((post) => post.title && !post.unlisted && isPublished(post.date))
        .sort((a, b) => a.file.localeCompare(b.file));
      const line = (name, href, description) =>
        `- [${name}](${url}${href})${description ? `: ${description}` : ''}`;

      const text = [
        `# ${title}`,
        '',
        `> ${tagline}. RaiseTalks is a fundraising workspace for early-stage startups and investors: a structured 143-field data room with tiered access, an AI readiness score, and pipelines for both sides.`,
        '',
        '## Pages',
        '',
        ...PAGES.map(([name, href, description]) => line(name, href, description)),
        '',
        '## Blog',
        '',
        ...posts.map((post) => line(post.title, `/blog/${post.slug}`, post.description)),
        '',
      ].join('\n');

      fs.writeFileSync(path.join(outDir, 'llms.txt'), text);
    },
  };
};
