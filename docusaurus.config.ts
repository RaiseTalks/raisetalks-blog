import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RaiseTalks',
  tagline: 'Streamlining Due Diligence with Expert Insights',
  favicon: 'favicon/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://raisetalks.com',
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
            copyright: `Copyright © ${new Date().getFullYear()} RaiseTalks AI, INC.`,
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
        src: 'img/logo-color.svg',
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
          to: 'https://dev.raisetalks.com/sign-in',
          label: 'Log In',
          position: 'right',
          className: 'navbar__link--login button button--secondary',
        },
        {
          to: 'https://dev.raisetalks.com/sign-up',
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
              to: 'https://www.linkedin.com/company/raisetalks/jobs/',
            },
            {
              label: 'Terms of Service',
              to: '/terms-of-service',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
            {
              label: 'Refund Policy',
              to: '/refund-policy',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Data Room',
              to: 'https://raisetalks.com/data-room',
            },
            {
              label: 'Inbox',
              to: 'https://dev.raisetalks.com/inbox',
            },
            {
              label: 'Self-Score',
              to: 'https://dev.raisetalks.com/self-score',
            },
            {
              label: 'Guides',
              to: 'https://dev.raisetalks.com/guides',
            },
            {
              label: 'Startups',
              to: 'https://dev.raisetalks.com/startups',
            },
            {
              label: 'Adviser',
              to: 'https://dev.raisetalks.com/adviser',
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
              to: '/affiliate-program',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Feature Requests',
              to: '/feature-request',
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
      copyright: `© ${new Date().getFullYear()} RaiseTalks AI, INC. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Custom fields for client-side environment variables
    customFields: {
      SUPABASE_URL: 'https://wzmlpdetrelxzunebnox.supabase.co',
      SUPABASE_ANON_KEY:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bWxwZGV0cmVseHp1bmVibm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NjMxNDksImV4cCI6MjA2MDAzOTE0OX0.-9StrWLSgULqZr_tW8vnqVqts8tVtwJKzEDx2gaBzGc',
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
        'Discover AI-powered due diligence tools at <a target="_blank" rel="noopener noreferrer" to="https://raisetalks.com">RaiseTalks</a>',
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
    // Favicon links for various devices and browsers
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/favicon/site.webmanifest',
      },
    },
  ],
};

export default config;
