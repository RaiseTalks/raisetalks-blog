// Per-page SEO metadata. Page copy lives in one file per page (home.ts, about.ts …),
// added by Studio as each page is built. Owner: Studio (A)

export type PageMeta = { path: string; title: string; description: string };

export const pages = {
  home: { path: "/", title: "Global Fundraising & Due Diligence for early-stage ventures", description: "One workspace for founders and investors: data rooms, readiness scoring, diligence-ready deal flow." },
  about: { path: "/about", title: "About us", description: "Translating founder potential into investor-grade intelligence." },
  startups: { path: "/startups", title: "For Startups", description: "The raise is won before the meeting. Get investor-ready with RaiseTalks." },
  investors: { path: "/investors", title: "For Investors", description: "10,000 decks in. Most aren't ready. Screen faster with RaiseTalks." },
  decoderGame: { path: "/decoder-game", title: "Decoder Game", description: "One chip, one bet. The RaiseTalks Decoder Game for founders and investors." },
  pitchCompetitions: { path: "/pitch-competitions", title: "Pitch Competitions", description: "Discover startups worth meeting at RaiseTalks pitch competitions." },
  featureRequest: { path: "/feature-request", title: "Feature Request", description: "Submit your feature requests and help shape the future of RaiseTalks" },
  affiliate: { path: "/affiliate-program", title: "Affiliate Program", description: "Earn 20% one-time or 10% recurring commissions. Perfect for startup mentors, VC scouts, and accelerators." },
  pricing: { path: "/pricing", title: "Pricing", description: "Plans for founders, investors and venture funds. Monthly or annual billing, cancel anytime." },
  privacy: { path: "/privacy-policy", title: "Privacy Policy", description: "How RaiseTalks collects, uses and protects your data." },
  terms: { path: "/terms-of-service", title: "Terms of Service", description: "The terms that govern your use of RaiseTalks." },
  refund: { path: "/refund-policy", title: "Refund Policy", description: "Transparent refund terms for RaiseTalks subscriptions." },
} satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pages;
