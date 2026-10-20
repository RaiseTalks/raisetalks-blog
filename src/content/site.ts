// Site-wide settings, navigation and footer. Changes per website.
// Owner: Studio (Account A)
// Nav follows the LIVE site (raisetalks.com, designer decision): Decoder Game in the
// navbar, Pitch Competitions only in the footer. Footer = Home footer (3257:1403) on every page.

/**
 * external: opens in a new tab (other domains: app, TV, socials, Calendly).
 */
export type NavLink = { label: string; href: string; external?: boolean };

const APP = "https://app.raisetalks.com";
const DEMO = "https://calendly.com/iamdariiava/30min";

export const site = {
  name: "RaiseTalks",
  title: "RaiseTalks — AI Fundraising Workspace",
  description:
    "Global fundraising and due diligence for early-stage ventures. Data rooms, readiness scoring and diligence-ready deal flow for founders and investors.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://raisetalks.com",
  logo: { src: "/icons/logo-header.svg", width: 200, height: 16 }, // final designer file (B-06), viewBox 200x16
  /** No backend on this site. Login / sign-up live on app.raisetalks.com (separate platform). */
  features: { members: false },
  links: { app: APP, signIn: `${APP}/sign-in`, signUp: `${APP}/sign-up`, demo: DEMO },
} as const;

/** `href` optional: without it the strip is plain text. */
export const announcement: { text: string; href?: string; dismissLabel: string } = {
  text: "See you in UAE at Dubai AI Festival - October 26-27, 2026",
  dismissLabel: "Dismiss announcement",
};

export const nav = {
  public: [
    { label: "About", href: "/about" },
    { label: "Startups", href: "/startups" },
    { label: "Investors", href: "/investors" },
    { label: "Decoder Game", href: "/decoder-game" },
    { label: "Pricing", href: "/pricing" },
    { label: "RaiseTalks TV", href: "https://tv.raisetalks.com", external: true }, // live domain, as on the old site
  ] as NavLink[],
  actions: {
    // Local sign-in page (RaiseTalks TV style) → hands off to app.raisetalks.com on submit.
    signIn: { label: "Login", href: "/sign-in" } as NavLink,
    signUp: { label: "Try it Free", href: "/sign-in?mode=signup" } as NavLink,
  },
};

export const footer = {
  columns: [
    {
      title: "Company",
      links: [
        { label: "About RaiseTalks", href: "/about" },
        { label: "Startups", href: "/startups" },
        { label: "Investors", href: "/investors" },
        { label: "Careers", href: "https://www.linkedin.com/company/raisetalks/jobs/", external: true },
        { label: "Pitch Competitions", href: "/pitch-competitions" },
        { label: "Feature Requests", href: "/feature-request" },
        { label: "Pricing", href: "/pricing" },
        { label: "Media Toolkit", href: `${APP}/brand`, external: true },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Startup Catalogue", href: `${APP}/startups`, external: true },
        { label: "Investor Catalogue", href: `${APP}/investors`, external: true },
        { label: "Data Room", href: `${APP}/data-room`, external: true },
        { label: "Inbox", href: `${APP}/inbox`, external: true },
        { label: "Scoring", href: `${APP}/scoring`, external: true },
        { label: "Dealflow", href: `${APP}/investor-pipeline`, external: true },
        { label: "AI Advisor", href: `${APP}/advisor`, external: true },
        { label: "IR Pipeline", href: `${APP}/pipeline`, external: true },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "LinkedIn", href: "https://linkedin.com/company/raisetalks", external: true },
        { label: "YouTube", href: "https://youtube.com/@raisetalks", external: true },
        { label: "Blog", href: "/blog" },
        { label: "Instagram", href: "https://instagram.com/raisetalks", external: true },
        { label: "Facebook", href: "https://facebook.com/raisetalks", external: true },
        { label: "Support", href: "/support" },
      ],
    },
  ] as { title: string; links: NavLink[] }[],
  newsletter: {
    title: "Newsletter",
    text: "Get insights from RaiseTalks and build trust in every round.",
    placeholder: "Enter your Email",
    button: "Subscribe",
    success: "Thanks — you're on the list.",
  },
  affiliate: { label: "Become an affiliate and earn money", href: "/affiliate-program" } as NavLink,
  copyright: "© 2026 RaiseTalks AI, INC. All rights reserved.",
  legal: [
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
  ] as NavLink[],
};
