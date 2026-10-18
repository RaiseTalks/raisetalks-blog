// Startups page copy — Figma 1316:2864 (desktop), 1496:2 (tablet), 1967:3529 (mobile). Owner: Studio (A)
import type { Cta, CtaBandContent, Heading, IconName } from "./shared";
import { art, links } from "./shared";

export type FeatureRow = {
  title: string; subtitle: string; text: string; checks: string[];
  image: { src: string; width: number; height: number; alt: string };
};
export type FaqItem = { q: string; a: string };

export const startups = {
  hero: {
    heading: { lead: "The Raise Is Won", accent: "Before the Meeting" } satisfies Heading,
    text: "Investors don\u2019t pass on the idea. They pass on the mess. RaiseTalks fixes it first.",
    primary: { label: "Try it FREE", ...links.signUp } satisfies Cta,
    secondary: { label: "Book a Demo", ...links.demo } satisfies Cta,
    image: art.heroAlt,
  },
  statement:
    "The fundraising problem is not a pitch problem. It's a preparation problem - and nobody has built the infrastructure to solve it at scale, with AI, from the investor's perspective.",
  problem: {
    eyebrow: "The Problem",
    // line break after "lose" at every width, like desktop (Drop 23, designer)
    heading: { lead: [{ text: "Great founders lose", breakAfter: "all" as const }, { text: "raises in due diligence." }], accent: "Not in the pitch." },
    text: ["You have customers, product, conviction.", "But your raise dies in the paperwork."],
    cards: [
      { title: "Your Data is Disorganized", text: "Documents scattered across emails, Dropbox, Google Drive, etc. Investors spend hours just trying to find what they need - and most don't bother." },
      { title: "Your Narrative is Inconsistent", text: "The story you tell in the meeting doesn't match the numbers in the data room. Investors notice. They pass. They don't tell you why." },
      { title: "\u201CThe Invisible Gap\u201D", text: "You don't know what \"investor-ready\" actually looks like. Nobody told you. There's no benchmark - until now." },
    ],
  },
  process: {
    heading: "How RaiseTalks Works",
    sliderLabel: "How RaiseTalks works, steps",
    steps: [
      { title: "We Prepare", lead: "Fix issues in private ", strong: "before", leadEnd: " they become objections in the room.", text: "Our AI reads your data room the way a skeptical investor would - surfacing gaps, inconsistencies, and missing signals before they cost you the deal." },
      { title: "We Illuminate", lead: "The black box of investor behavior becomes a live feed.", text: "We show you exactly what investors see: which documents they open, how long they linger, which slides lose them, and what questions they're forming." },
      { title: "We Accelerate", lead: "Collapse weeks of back-and-forth diligence into ", strong: "days", leadEnd: ".", text: "Standardized scorecards, IC-ready summaries, and AI-generated Q&A give everyone in the process - founder and investor - their time back." },
    ],
  },
  features: {
    heading: { lead: "Everything you need", accent: "to walk in ready." },
    note: "Used by early-stage founders preparing seed and Series A raises.",
    rows: [
      { title: "Investor-Grade Data Room", subtitle: "A secure vault your investors will actually use.", text: "Upload, organize, and share every document in a single structured workspace. No more Dropbox chaos.",
        checks: ["22 structured sections and 143 fields, purpose-built for investor evaluation", "Four access tiers - Public, Basic, Due Diligence, Owner - with field-level control", "Invite investors with per-invite access level and expiration: 30 days to never", "One public, SEO-ready company profile at your own URL"],
        image: { src: "/images/startups/3420-16697.webp", width: 620, height: 360, alt: "RaiseTalks data room with 22 sections and 143 fields" } },
      { title: "AI Readiness Scoring", subtitle: "Score your readiness. Close with confidence.", text: "Our AI audits your data room the way a skeptical investor would - checking completeness, consistency, and narrative alignment. You fix gaps in private before they become deal-killers.",
        checks: ["Readiness scored 1-5 across Team, Product, Market and Deal - the dimensions investors score", "Gap identification with a \"Fix this\" link straight into the right section", "Risk and inconsistency flags across your whole data room", "Completeness review across all 22 sections - know exactly what is missing"],
        image: { src: "/images/startups/3420-16938.webp", width: 620, height: 360, alt: "Readiness report with one-click PDF export" } },
      { title: "AI Fundraising Advisor", subtitle: "An advisor that has actually read your data room.", text: "Generic fundraising advice is free everywhere. Your advisor answers from your own numbers, your own narrative, your own gaps - and in Agent mode, it fixes them with you.",
        checks: ["General mode for strategy, positioning, and investor-meeting prep", "Data Room mode analyzes your real content - not hypotheticals", "Agent mode drafts and saves improvements section by section, always asking before it writes", "Unlimited questions on Pro"],
        image: { src: "/images/startups/3420-17009.webp", width: 620, height: 360, alt: "AI Fundraising Advisor answering investor questions on a phone" } },
      { title: "Pitch Deck AI", subtitle: "Your deck and your data room, always in sync.", text: "Upload your pitch deck and the AI builds your data room from it - then, when your data room is stronger than your deck, generate a new one from the source of truth.",
        checks: ["Deck upload auto-fills your data room - empty fields only, never overwrites your work", "Generate an investor-standard 10-12 slide deck straight from your data room", "Export to PDF, ready to send", "AI field assist on the details investors read closest"],
        image: { src: "/images/startups/3420-17025.webp", width: 620, height: 360, alt: "Pitch deck slides generated from the data room" } },
      { title: "IR Updates", subtitle: "Investor updates that write themselves - and never overshare.", text: "The AI drafts your monthly, quarterly, or annual update from what actually changed in your data room, in two versions at once: one for basic-access investors, one for due-diligence investors. Nobody sees numbers they were not granted.",
        checks: ["AI-drafted from your data room, leading with what changed since the last update", "Tier-aware by construction - each investor receives exactly their access level", "Scheduled sends with a review window before anything goes out", "Built-in gap analysis tells you what to fix before investors notice"],
        image: { src: "/images/startups/3420-17169.webp", width: 620, height: 360, alt: "IR Update Agent drafting a monthly investor update" } },
      { title: "Investor Discovery & IR Push", subtitle: "Stop cold-emailing. Get pushed to investors who already match.", text: "Browse the verified investor catalog, then let IR Push do the outreach: when your data room is complete and your readiness score clears the bar, one click puts it in front of matched investors - with access already granted.",
        checks: ["Verified investor catalog: filter by type, stage, and geography", "Matching on sector, stage, ticket size, and geography - no spray-and-pray", "Matched investors get instant basic-tier access and a pipeline card on both sides", "Readiness-gated: only complete, scored data rooms go out"],
        image: { src: "/images/startups/3420-17358.webp", width: 620, height: 360, alt: "IR Push showing 247 matched investors" } },
      { title: "IR Pipeline", subtitle: "Every investor conversation, one board.", text: "A drag-and-drop pipeline built for how raises actually progress - from first share to hard commitment.",
        checks: ["10 stages, from Data Room Shared and NDA Signed through Term Sheet to Hard Commitment", "Notes and meetings on every investor card", "Access requests approve or decline right from your dashboard", "Included free - pipeline discipline should not cost anything"],
        image: { src: "/images/startups/3420-17413.webp", width: 620, height: 360, alt: "IR Pipeline board with investor cards by stage" } },
      { title: "Data Room MCP", subtitle: "Your data room, available to your AI.", text: "Connect Claude - or any AI assistant that supports the open MCP standard - to your RaiseTalks data room. Ask questions, pull answers, make updates, all from the tool you already work in.",
        checks: ["Works with Claude and any MCP-compatible AI client", "Secure, one-time authorization - your login is the permission boundary", "Read and update your data room by chatting", "The same connection powers the in-app Data Room Agent"],
        image: { src: "/images/startups/3420-17903.webp", width: 620, height: 360, alt: "RaiseTalks and Claude app icons connected" } },
    ] satisfies FeatureRow[],
  },
  advisor: {
    heading: { lead: "RaiseTalks AI Advisor is not just a tool.", accent: "It\u2019s a standard." },
    items: [
      { title: "Precise", text: "Not vague, not diplomatic. The gap is on slide 14. The inconsistency is in row 47. We point at things directly." },
      { title: "Warm", text: "We know what it costs to build something and try to raise for it. We're direct because we respect the founder." },
      { title: "Confident", text: "We know what investor-ready looks like. We've seen enough raises to have conviction. We speak with authority." },
      { title: "Radical Transparency", text: "We tell you what investors actually think - not a softened version designed to protect feelings." },
      { title: "Founder First", text: "Every feature, every decision is evaluated through one lens: does this make your raise more likely to succeed?" },
      { title: "Relentless", text: "Every data room we process makes us smarter. Our AI flywheel compounds. The product gets better with every raise." },
    ],
  },
  perks: {
    id: "perks",
    sliderLabel: "Founder perks",
    heading: { lead: "Get access to", accent: "Founder Perks" },
    cta: { label: "Claim your Perks", href: "mailto:startups@raisetalks.ai" } satisfies Cta,
    items: [
      { icon: "calendar-check" as IconName, eyebrow: "30-Day Trial", title: "Extended free trial", text: "Full platform access for 30 days - enough time to build and share your data room before your first investor meeting." },
      { icon: "headset" as IconName, eyebrow: "Onboarding", title: "Priority setup call", text: "A 1-on-1 session with our team to get your data room structured and your readiness score running in under an hour." },
      { icon: "notebook" as IconName, eyebrow: "Resources", title: "Founder playbook", text: "The exact investor-readiness checklist our team uses - what documents to include, how to structure them, and what gaps kill deals." },
      { icon: "user-star" as IconName, eyebrow: "Early Access", title: "New features first", text: "Skip the waitlist. As a perk member you get early access to every new feature we ship - starting with our IC memo generator." },
    ],
  },
  video: {
    heading: { lead: "Your Next Investor Meeting", accent: "Is Closer Than You Think" },
    text: "RaiseTalks gives you one workspace to run your entire raise - so you spend less time on infrastructure and more time closing.",
    cta: { label: "See it in action", ...links.demo } satisfies Cta,
    title: "The AI Workspace That Gets Founders Investor-Ready in Hours | RaiseTalks",
    youtubeId: "8WOwPsQE158",
    fallbackHref: "https://youtube.com/@raisetalks",
    poster: "https://i.ytimg.com/vi/8WOwPsQE158/maxresdefault.jpg",
  },
  faq: {
    heading: { lead: "Frequently Asked Questions" },
    // Questions: Figma (Q9 from live). Answers: Figma (1st) + live raisetalks.com/startups (2–20).
    // An item with an empty answer is not rendered.
    items: [
      { q: "What makes RaiseTalks different from a Google Drive or Notion setup?", a: "Because investors don't invest in folders. They invest in founders who understand what investors need to see, in what order, and why. RaiseTalks structures your data room the way a VC would build it - not the way a founder would organise it." },
      { q: "Who is RaiseTalks built for?", a: "Pre-seed and seed founders preparing for their first or second institutional raise. If you're going into investor meetings without a readiness score, you're flying blind." },
      { q: "What is an investor readiness score?", a: "A diagnostic that tells you exactly where your raise will break down - before an investor tells you with a pass. We score your data room, narrative consistency, and gap coverage against what institutional investors actually expect." },
      { q: "How long does it take to set up a data room?", a: "Most founders have a structured, shareable data room live in under an hour. We give you the exact document checklist investors use, you fill it, we score it." },
      { q: "Can RaiseTalks help me if I don't have revenue yet?", a: "Yes. Most of our founders are pre-revenue. Investor readiness isn't about traction - it's about how you present what you have. We help you close the gap between where you are and what investors need to see." },
      { q: "What documents should be in my data room?", a: "Pitch deck, financial model, cap table, team bios, product demo, market research, and legal docs. We give you the exact checklist and flag what's missing before your investor does." },
      { q: "How is my data room kept secure?", a: "Enterprise encryption, granular access controls, and a single shareable link - so you control exactly who sees what, and when." },
      // Answers 8–20: live site (designer screenshots). Q9 wording from the live site — see drop notes.
      { q: "Will RaiseTalks tell me if my pitch deck is weak?", a: "Yes, and we won't soften it. If slide 14 is the problem, we'll tell you it's slide 14. Radical transparency isn't a brand value for us - it's the product." },
      { q: "What do I get during the trial, and what does a subscription add?", a: "Every new account starts with a 30-day trial: build your data room, get your readiness score and browse the catalogs, with the AI Advisor limited to 3 questions a day. Startup Pro or Investor Pro (monthly or annual) unlocks the unlimited AI Advisor, DD-ready sharing, IR Push and direct investor invites. Cancel anytime." },
      { q: "I'm raising right now. Is it too late to use RaiseTalks?", a: "No - it's exactly the right time. Founders who set this up mid-raise consistently catch gaps they didn't know existed. One fixed inconsistency can be the difference between a pass and a term sheet." },
      { q: "What is RaiseTalks?", a: "AI-powered SaaS fundraising workspace for early-stage startups to organise data rooms, streamline DD and secure funding." },
      { q: "How does AI Advisor work?", a: "Simply ask any question about fundraising preparation - whether it's about structuring your data room, crafting a pitch deck, or building a financial model - and it provides tailored answers, tools, and templates." },
      { q: "What is a data room, and why do I need one?", a: "A data room is a secure space where startups organize essential documents and data for investors during the due diligence process. It ensures transparency and helps investors evaluate your business." },
      { q: "What kinds of documents should I include in a data room?", a: "Typical data room documents include your pitch deck, team bios, and product demos, market research, financial statements, legal agreements. RaiseTalks will guide you through each step." },
      { q: "Can RaiseTalks help me improve my pitch deck?", a: "Absolutely. RaiseTalks analyzes your pitch deck and offers suggestions for improvement, such as optimizing your slides, refining your messaging, and emphasizing key metrics." },
      { q: "How do I know what investors are looking for in a pitch deck?", a: "RaiseTalks provides insights on investor expectations, ensuring your deck effectively communicates your value proposition, market opportunity, and growth potential." },
      { q: "Does RaiseTalks connect me with investors?", a: "Yes, RaiseTalks facilitates introductions to investors once your readiness score meets the threshold. This feature is currently in beta." },
      { q: "Is RaiseTalks free to use?", a: "There is no free plan. New accounts get a 30-day trial to explore the workspace; after that you subscribe to Startup Pro ($99/mo or $699/yr) or Investor Pro ($199/mo or $1,428/yr). Venture funds: talk to us about VC Platinum." },
      { q: "Is RaiseTalks available worldwide?", a: "Yes, RaiseTalks is accessible globally, as long as you have an internet connection." },
      { q: "How do I sign up?", a: "Click the \"Sign Up\" button on the homepage, create an account, and start your fundraising journey with RaiseTalks." },
    ] satisfies FaqItem[],
  },
  cta: {
    heading: { lead: "Walk into that meeting ready.", accent: "Not just prepared - ready." },
    text: "Join the founders building investor-grade data rooms with RaiseTalks. Start free. Get your readiness score in minutes.",
    primary: { label: "Start FREE", ...links.signUp },
    secondary: { label: "View Pricing", href: "/pricing" },
  } satisfies CtaBandContent,
};
