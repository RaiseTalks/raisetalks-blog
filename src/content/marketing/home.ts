// Home page copy — Figma 3257:1024 (Investors view) + 2601:8349 (Startups view). Owner: Studio (A)
import type { Cta, CtaBandContent, Heading, IconName } from "./shared";
import { dariiaPortrait, defaultCta, links } from "./shared";
import { site } from "@/content/site";

export type Audience = "investors" | "founders";

export type McpContent = {
  heading: Heading;
  text: string;
  capabilities: { title: string; text?: string }[];
  steps: {
    title: string;
    text: string;
    action?: { kind: "button"; cta: Cta } | { kind: "copy"; value: string; copiedLabel: string } | { kind: "ghost"; cta: Cta };
  }[];
};
export type FeatureGridContent = {
  heading: Heading; text: string; primary: Cta; secondary?: Cta;
  columns: 2 | 3; tone: "page" | "alt";
  items: { icon: IconName; title: string; text: string }[];
};
export type SplitMediaContent = { heading: Heading; text: string; cta: Cta; image: { src: string; width: number; height: number; alt: string } };

export const home = {
  hero: {
    eyebrow: "AI Native",
    heading: { lead: "Global Fundraising\n& Due Diligence", accent: "for early-stage ventures" },
    text: "Run deals, streamline due diligence, and close rounds faster — all in one place.",
    primary: { label: "Try it Free", ...links.signUp },
    secondary: { label: "Book a Demo", ...links.demo },
    // Home hero only (every other page uses art.heroAlt); own tablet / mobile crops (Drop 18)
    image: { desktop: "/images/home/3257-1052.webp", tablet: "/images/home/3257-1052-tablet.webp", mobile: "/images/home/3257-1052-mobile.webp" },
  },
  statement:
    "RaiseTalks is a full-stack fundraising workspace built for founders and investors. That means organized data rooms and readiness scoring for founders, matched diligence-ready deals for investors, and one place where both sides meet.",
  workspace: {
    heading: { lead: "One Workspace.", accent: "Zero chaos." },
    cards: [
      { title: "From messy docs to investor-grade data", text: "Raw inputs in, investor-grade materials out: data room, narrative, metrics, evidence. Your story and your numbers finally match." },
      { title: "Standardized diligence, faster deals", text: "Founders, VCs, and accelerators work in one shared structure. No back-and-forth, no version chaos, nothing missing." },
      { title: "Data rails for VC private markets", text: "A workspace that stays current becomes live intelligence: interest signals, readiness scores, decision support. Trust compounds round to round." },
    ],
    testimonial: {
      quote: "\u201CGreat companies lose rounds to bad preparation, not bad businesses.",
      quoteStrong: "I spent a career fixing that by hand - RaiseTalks does it at scale.\u201D",
      stats: [
        { value: "€3B", unit: "+", label: "in closed deals" },
        { value: "10k", unit: "+", label: "startups reviewed" },
        { value: "17", unit: "years", label: "on the investment side" },
      ],
      name: "Dr. Dariia Vasylieva",
      role: "Founder & CEO, RaiseTalks",
      cta: { label: "Let\u2019s connect", href: "https://www.linkedin.com/in/dvasylieva/", external: true },
      portrait: { ...dariiaPortrait, alt: "Dr. Dariia Vasylieva, Founder & CEO of RaiseTalks" },
      background: "/images/home/3257-1122.webp",
    },
  },
  switch: {
    label: "Choose your view",
    options: [
      { id: "founders" as Audience, label: "For Startups" },
      { id: "investors" as Audience, label: "For Investors" },
    ],
    default: "founders" as Audience, // Drop 15: Startups first (designer)
  },
  views: {
    investors: {
      mcp: {
        heading: { lead: "Your deal flow,", accent: "Right inside Claude" },
        text: "Connect RaiseTalks to Claude and run your screening from a prompt — score a startup, compare your shortlist, and draft an IC memo without leaving the chat.",
        capabilities: [
          { title: "Score from a prompt", text: "Score any startup across 22 dimensions — team, market, financials, risk — just by asking." },
          // Texts: Figma section "MCP blocks" 4064:2246 ("ead" typo fixed → "Read").
          { title: "Compare side by side", text: "Put two or more startups next to each other and see where each one is strongest, or weakest, before you decide." },
          { title: "Get your shortlist", text: "Ask for your top matches by stage, sector, or score, and get a ranked list ready to review." },
          { title: "Draft the IC memo", text: "Turn a scored startup straight into an investment-committee memo, structured and ready to circulate." },
        ],
        steps: [
          { title: "Copy the RaiseTalks URL", text: "Click to copy the connector URL — you'll paste it into Claude in the next step.", action: { kind: "button", cta: { label: "Request MCP Link", ...links.signUp } } },
          { title: "Add it in Claude", text: "In Claude desktop or claude.ai, go to Settings → Connectors, add a custom connector, name it RaiseTalks, and paste the URL.", action: { kind: "ghost", cta: { label: "Open in Claude", href: "https://claude.ai/new#settings/customize-connectors", external: true } } },
          { title: "Connect and sign in", text: "Click Add → Connect and sign in with your RaiseTalks account. Then just ask Claude to score a startup or prep an IC memo." },
        ],
      } satisfies McpContent,
      features: {
        heading: { lead: "IC decision.", accent: "4x faster" },
        text: "RaiseTalks Scoring OS gives your fund a single system to evaluate, align, and decide.",
        primary: { label: "Start Scoring OS", ...links.signUp },
        secondary: { label: "See Demo", ...links.demo },
        columns: 3, tone: "alt",
        items: [
          { icon: "gauge", title: "Pre-Score Engine", text: "Standardized scorecards so every deal gets a fair, consistent look." },
          { icon: "message-square-lock", title: "Committee Workspace", text: "One place for partners to align, debate, and decide." },
          { icon: "file-check", title: "DD & IC Pack", text: "Diligence and investment memos, version-controlled and always current." },
        ],
      } satisfies FeatureGridContent,
      split: {
        heading: { lead: "Spend less time", accent: "Searching Startups" },
        text: "RaiseTalks surfaces curated, pre-scored startups worth seeing.",
        cta: { label: "Explore Startups", href: "https://app.raisetalks.com/startups", external: true },
        image: { src: "/images/home/spend-less-time-investors.webp", width: 2400, height: 2361, alt: "RaiseTalks startup catalogue with pre-scored startup cards" },
      } satisfies SplitMediaContent,
    },
    founders: {
      mcp: {
        heading: { lead: "Your data room,", accent: "Right inside Claude" },
        text: "Connect RaiseTalks to Claude and run your raise from a prompt — build and update your data room, see what's still missing, and sharpen your story without leaving the chat.",
        capabilities: [
          { title: "Build from a prompt", text: "Create or update any data-room section — profile, vision, traction — just by describing the change." },
          // Texts: Figma section "MCP blocks" 4064:2246; "Know your score" text from the designer (Drop 15).
          { title: "Know your score", text: "Ask for your AI readiness score and see exactly what investors will judge you on." },
          { title: "Fix the gaps", text: "Surface what's still missing before you share your room, then fill it in without leaving the chat." },
          { title: "See who's engaged", text: "See which investors opened your room and what they spent their time on." },
        ],
        steps: [
          { title: "Copy the RaiseTalks URL", text: "Click to copy the connector URL - you'll paste it into Claude in the next step", action: { kind: "copy", value: site.mcp.url, copiedLabel: "Copied" } },
          { title: "Add it in Claude", text: "In Claude desktop or claude.ai, go to Settings → Connectors, add a custom connector, name it RaiseTalks, and paste the URL.", action: { kind: "ghost", cta: { label: "Open in Claude", href: "https://claude.ai/new#settings/customize-connectors", external: true } } },
          { title: "Connect and sign in", text: "Click Add → Connect and sign in with your RaiseTalks account. Then just ask Claude to build or update your data room." },
        ],
      } satisfies McpContent,
      features: {
        heading: { lead: "Investors Decide Fast.", accent: "Be Ready Faster." },
        text: "We provide you with tools and deals to accelerate your raise.",
        primary: { label: "Get access to Perks", href: "/startups#perks" },
        columns: 2, tone: "alt",
        items: [
          { icon: "folder-tree", title: "Investor-Ready Data Room", text: "Organized, structured, and built to impress from day one." },
          { icon: "list-todo", title: "AI Readiness Score", text: "Know exactly what's missing before investors find it." },
          { icon: "file-stack", title: "Investor Matchmaking & Pipeline", text: "Connect with the right investors at the right stage." },
          { icon: "shield-check", title: "Secure, Controlled Sharing", text: "Share with confidence, revoke access anytime." },
        ],
      } satisfies FeatureGridContent,
      split: {
        heading: { lead: "Spend less time", accent: "Searching Investors" },
        text: "RaiseTalks gets your data room pre-scored and ready, in front of investors worth meeting.",
        cta: { label: "Explore Investors", href: "https://app.raisetalks.com/investors", external: true },
        image: { src: "/images/home/spend-less-time-startups.webp", width: 2400, height: 2400, alt: "RaiseTalks investor catalogue with matched investor cards" },
      } satisfies SplitMediaContent,
    },
  },
  mcpIcons: { src: "/images/home/3257-1550.webp", width: 858, height: 366, alt: "RaiseTalks and Claude app icons connected" },
  tv: {
    logo: { src: "/icons/logo-raisetalks-tv-white.svg", width: 227, height: 14, alt: "RaiseTalks TV" },
    heading: { lead: "Your Story", accent: "Is the Strategy" },
    lines: ["Cinema is the method.", "Narrative is the product.", "Perception is the outcome."],
    items: [
      { icon: "stethoscope" as IconName, title: "Diagnostic", text: "Audit your story, find the gaps weakening your raise." },
      { icon: "brain-cog" as IconName, title: "Architecture", text: "Build the core system: category story, positioning, and investor messaging." },
      { icon: "square-play" as IconName, title: "Engine", text: "A content system that reinforces your story consistently across channels." },
      { icon: "film" as IconName, title: "Founder Original", text: "A flagship cinematic piece for investor communication, launches, and major announcements." },
    ],
    cta: { label: "Explore Founder Originals", ...links.tv },
    video: { src: "/video/tv-loop.mp4", poster: "/video/tv-loop-poster.webp" }, // B: TV video import
  },
  pitch: {
    badge: "Coming soon",
    heading: { lead: "Attend our", accent: "Pitch Competitions" },
    text: "Every cohort is built for one thing: helping you deploy capital smarter and faster.",
    stats: [
      { value: "4x", label: "Faster deal\nscreening" },
      { value: "85%", label: "Investor\nsatisfaction" },
      { value: "72hr", label: "Average\nResponse time" }, // two lines so the 3 stats fit one row (Drop 15)
    ],
    items: [
      { title: "Direct founder access.", text: "From first look to first conversation." },
      { title: "100+ vetted startups per cohort", text: "Screened before they reach you." },
      { title: "Standardized data rooms for every participant.", text: "No chasing documents." },
      { title: "AI pre-scoring across Team, Product, Market, and Deal.", text: "So you arrive informed." },
    ],
  },
  cta: defaultCta satisfies CtaBandContent,
};
