import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RaiseTalks',
  tagline: 'Streamlining Due Diligence with Expert Insights',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://raisetalks.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'raisetalks', // Usually your GitHub org/user name.
  projectName: 'raisetalks', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable docs completely
        blog: {
          routeBasePath: '/blog', // Move blog to /blog route
          showReadingTime: true,
          blogTitle: 'RaiseTalks Blog',
          blogDescription:
            'Expert insights on due diligence, fundraising, and business growth',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'RaiseTalks Blog',
            description:
              'Expert insights on due diligence, fundraising, and business growth',
            copyright: `Copyright © ${new Date().getFullYear()} RaiseTalks.`,
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/raisetalks-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'RaiseTalks',
      logo: {
        alt: 'RaiseTalks Logo',
        src: 'img/RaiseTalks-logo-long.svg',
        height: 40,
      },
      items: [
        {
          to: '/about-us',
          label: 'About Us',
          position: 'left',
        },
        {
          to: '/features',
          label: 'Features',
          position: 'left',
        },
        {
          to: '/pricing',
          label: 'Pricing',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: 'https://calendly.com/iamdariiava/30min',
          label: 'Contact Us',
          position: 'right',
          className: 'navbar__link--calendar',
        },
        {
          to: 'https://x.com/raisetalks_ai',
          label: 'X',
          position: 'right',
          className: 'navbar__link--x',
        },
        {
          to: 'https://www.linkedin.com/company/raisetalks/',
          label: 'LinkedIn',
          position: 'right',
          className: 'navbar__link--linkedin',
        },
        {
          to: 'https://dev.raisetalks.ai/sign-in',
          label: 'Log In',
          position: 'right',
          className: 'navbar__link--login button button--secondary',
        },
        {
          to: 'https://dev.raisetalks.ai/sign-up',
          label: 'Sign Up',
          position: 'right',
          className: 'navbar__link--signup button button--primary',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About Us',
          items: [
            {
              label: 'About',
              to: '/about-us',
            },
            {
              label: 'Features',
              to: '/features',
            },
            {
              label: 'Schedule a Demo',
              to: 'https://calendly.com/iamdariiava/30min',
            },
            {
              label: 'Careers',
              to: '#',
            },
            {
              label: 'Terms of Service',
              to: '#',
            },
            {
              label: 'Privacy Policy',
              to: '#',
            },
            {
              label: 'Refund Policy',
              to: '#',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Data Room',
              to: 'https://raisetalks.ai/data-room',
            },
            {
              label: 'Inbox',
              to: 'https://raisetalks.ai/inbox',
            },
            {
              label: 'Self-Score',
              to: 'https://raisetalks.ai/self-score',
            },
            {
              label: 'Guides',
              to: 'https://raisetalks.ai/guides',
            },
            {
              label: 'Startups',
              to: 'https://raisetalks.ai/startups',
            },
            {
              label: 'Adviser',
              to: 'https://raisetalks.ai/adviser',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Pricing',
              to: '/pricing',
            },
            {
              label: 'Affiliate Program',
              to: '#',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Feature Requests',
              to: '#',
            },
            {
              label: 'Media ToolKit',
              to: '#',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              to: 'https://twitter.com/raisetalks',
            },
            {
              label: 'LinkedIn',
              to: 'https://linkedin.com/company/raisetalks',
            },
            {
              label: 'Instagram',
              to: 'https://instagram.com/raisetalks',
            },
            {
              label: 'Facebook',
              to: 'https://facebook.com/raisetalks',
            },
            {
              label: 'YouTube',
              to: 'https://youtube.com/@raisetalks',
            },
            {
              label: 'TikTok',
              to: 'https://tiktok.com/@raisetalks',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} RaiseTalks. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    metadata: [
      {
        name: 'keywords',
        content:
          'raisetalks, due diligence, fundraising, startup funding, venture capital, business intelligence',
      },
      {
        name: 'description',
        content:
          'Expert insights on due diligence, fundraising strategies, and business growth from RaiseTalks',
      },
      { name: 'author', content: 'RaiseTalks' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'RaiseTalks Blog' },
    ],
    announcementBar: {
      id: 'visit_raisetalks',
      content:
        '🚀 Discover AI-powered due diligence tools at <a target="_blank" rel="noopener noreferrer" to="https://raisetalks.ai">RaiseTalks.ai</a>',
      backgroundColor: '#0174e1',
      textColor: '#ffffff',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,

  // Sitemap plugin is already included in the classic preset

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        to: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        to: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],
};

export default config;
