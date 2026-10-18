// Investors page copy — Figma 1244:1355 (desktop), 1433:1253 (tablet), 1947:651 (mobile). Owner: Studio (A)
import type { Cta, CtaBandContent, Heading, IconName } from "./shared";
import { art, dariiaPortrait } from "./shared";

export type MemoIcon =
  | "circle-check-big" | "circle-alert" | "badge-dollar-sign" | "tag" | "chart-area" | "target" | "rocket" | "box"
  | "sparkles" | "triangle-alert" | "milestone" | "earth" | "hand-coins" | "file-text" | "chart-pie" | "landmark" | "star";
/** good = green box/icon (strengths, differentiation, highlights); bad = orange box/icon (gaps, risks). */
export type MemoTone = "good" | "bad";
type MemoFact = { icon: MemoIcon; label: string; value: string };
type MemoList = { title: string; items: string[] };
type MemoIconList = MemoList & { icon: MemoIcon; tone: MemoTone };
type MemoNote = { title: string; text: string };
export type MemoContent = {
  title: string; label: string; meta: { label: string; value: string }[];
  theme: { group: string; light: string; dark: string };
  overview: MemoNote;
  transaction: { title: string; terms: { label: string; value: string }[]; fundsTitle: string; funds: { share: number; label: string }[] };
  team: { title: string; score: string; members: { role: string; name: string; title: string; text: string }[]; notes: (MemoNote & { icon: MemoIcon; tone: MemoTone })[] };
  product: { title: string; score: string; text: string; facts: MemoFact[]; lists: MemoList[] };
  market: { title: string; score: string; sizes: { label: string; value: string; note: string }[]; facts: MemoFact[]; whyNow: MemoNote; competitors: MemoList; lists: MemoIconList[] };
  deal: { title: string; score: string; facts: MemoFact[]; lists: MemoIconList[]; recommendation: MemoNote; disclaimer: MemoNote };
};
/** Destinations as on the live investors page (raisetalks.com/investors). */
const investorLinks = {
  demo: { href: "https://calendly.com/raisetalks/demo", external: true },
  earlyAccess: { href: "mailto:hq@raisetalks.ai?subject=Early%20Access%20-%20Investor", external: false },
};

export const investors = {
  hero: {
    heading: { lead: "10,000 decks in.", accent: "Most aren't ready" } satisfies Heading,
    text: "RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready memos - before the round hits the market.",
    primary: { label: "Book a Demo", ...investorLinks.demo } satisfies Cta,
    secondary: { label: "Request Early Access", ...investorLinks.earlyAccess } satisfies Cta,
    image: art.heroAlt,
  },
  statement: "RaiseTalks is built for angels, micro funds, institutional VCs and accelerators who want to spend less time on intake and more time on conviction.",
  frustration: {
    heading: { lead: "Investors Face the same", accent: "Frustration Patterns" },
    text: "Founders send unstructured decks with missing financials, turning first meetings into discovery calls instead of diligence. IC memos take hours to assemble from scattered files, strong founders outside the usual hubs never surface, and the companies you passed on six months ago quietly close their next round without you.",
    image: {
      desktop: { src: "/images/investors/3478-6569.webp", width: 2400, height: 852 },
      tablet: { src: "/images/investors/3478-6569-tablet.webp", width: 1536, height: 545 },
      mobile: { src: "/images/investors/3478-6569-mobile.webp", width: 750, height: 2004 },
      alt: "Scattered files turned into one structured RaiseTalks data room with readiness score and IC memo" },
  },
  bento: {
    heading: { lead: "What You Get with", accent: "RaiseTalks" },
    scoring: {
      icon: "list-todo" as IconName, title: "AI Readiness Scoring", text: "Every startup on RaiseTalks is scored across 22 dimensions, including:",
      checks: ["Team Strength", "Product", "Technology", "Market Attractiveness", "Financial Quality", "Data Room Readiness", "Diligence completeness", "Narrative clarity", "Risk profile", "Investor fit"],
      more: "and many others",
    },
    cards: [
      { icon: "folder-tree" as IconName, title: "Structured Data Rooms", lines: ["Single Standard.", "Compare 10 companies side-by-side in 20 minutes.", "Every founder on RaiseTalks has organised their data room to VC standards."] },
      { icon: "list-filter-plus" as IconName, title: "Curated Weekly Shortlist", lines: ["Set your thesis and receive a curated weekly digest of 5-10 founders who match.", "Pre-screened and ready to talk."] },
      { icon: "timer" as IconName, title: "IC Prep in 30 Minutes", lines: ["It is no longer a 4-hour task.", "Select any company & one-click IC summary:"], checks: ["Snapshot", "Score Breakdown", "Key Risks flagged by AI", "Comparable benchmarks"] },
      { icon: "tag-x" as IconName, title: "Zero Success Fees", lines: ["Flat annual subscription.", "Your deal economics stay clean."] },
    ],
  },
  preScore: {
    title: "Pre-Score Engine",
    text: "Quickly screen incoming deal flow with structured, evidence-based scoring",
    card: { title: "Pre-Scoring Card", text: "Shareable link + PDF export for each evaluation", checks: ["Screen faster", "Higher-quality inbound", "Cohort-ready"] },
    // Texts: Figma (Team) + designer screenshot of the live cards (Product-Tech, Market, Deal).
    dimensions: [
      { title: "Team", text: "Experience, expertise & execution capability" },
      { title: "Product-Tech", text: "Technology differentiation & moat" },
      { title: "Market", text: "Size, timing & competitive dynamics" },
      { title: "Deal", text: "Terms, traction & investment thesis fit" },
    ],
  // Pre-Score memo, rendered as a scrollable HTML document (Drop 14). Copy: live raisetalks.com/investors;
  // team cut to 4 (designer: Lukas Smit removed). Icons are Lucide names (see MemoDoc.tsx).
  memo: {
    title: "Investment Memo Sample",
    label: "Investment memo example, scrollable",
    theme: { group: "Memo theme", light: "Light", dark: "Dark" },
    meta: [
      { label: "Date", value: "24.04.2026" },
      { label: "Company", value: "NutriTrack" },
      { label: "Sector", value: "HealthTech / Nutrition" },
      { label: "Stage", value: "Seed" },
      { label: "Jurisdiction", value: "Netherlands" },
    ],
    overview: {
      title: "Company overview",
      text: "NutriTrack is a digital nutrition platform combining a consumer app with a clinician dashboard to help dietitians, clinics, and insurers manage patient nutrition through AI-assisted food logging and connected health data. The company operates in clinical nutrition and chronic-disease management, and enables patients with diabetes, obesity, and cardiovascular risk to track intake automatically while their care teams monitor adherence in real time.",
    },
    transaction: {
      title: "Transaction overview",
      terms: [
        { label: "Target Raise:", value: "\u20AC1,500,000" },
        { label: "Offered Stake:", value: "15%" },
        { label: "Instrument:", value: "Equity" },
        { label: "Implied Valuation:", value: "\u20AC10,000,000" },
      ],
      fundsTitle: "Use of Funds",
      funds: [
        { share: 40, label: "Product & Engineering" },
        { share: 30, label: "Go-to-market & sales" },
        { share: 20, label: "Data/ML infrastructure & tooling" },
        { share: 10, label: "General and administrative" },
      ],
    },
    team: {
      title: "Team",
      score: "Team Score: 4 / 5",
      members: [
        { role: "Founder", name: "Sanne de Vries", title: "CEO & Founder", text: "Registered dietitian turned product builder with 9 years across clinical nutrition and digital health. Previously led product at a Dutch telehealth scale-up before founding NutriTrack." },
        { role: "Advisor", name: "Dr. Pieter Janssen", title: "Medical & Clinical Advisor", text: "Practicing endocrinologist and former head of a hospital nutrition unit. Advises on clinical validation, reimbursement strategy, and medical-device regulatory pathways across the EU." },
        { role: "Core team", name: "Eva Bakker", title: "Chief Product Officer", text: "Product leader specializing in patient-facing health apps and behavior-change design. Previously shipped consumer wellness products serving over 1 million monthly active users." },
        { role: "Core team", name: "Daan Visser", title: "Head of Growth & Partnerships", text: "Growth lead with a strong network across EU clinics and insurers. Previously managed payer partnerships at a digital-therapeutics company operating in the Benelux region." },
      ],
      notes: [
        { icon: "circle-check-big", tone: "good", title: "Strengths", text: "The founding team blends clinical nutrition credibility with proven SaaS product and engineering delivery, backed by a respected practicing-clinician advisor who anchors regulatory and reimbursement strategy." },
        { icon: "circle-alert", tone: "bad", title: "Gaps", text: "No dedicated commercial or insurer-contracting lead has been hired yet, and clinical-affairs and regulatory capacity currently depend on the part-time advisor rather than a full-time in-house function." },
      ],
    },
    product: {
      title: "Product",
      score: "Product Score: 4 / 5",
      text: "The platform pairs a consumer app with a clinician dashboard. Patients log meals via photo and connected devices; AI estimates macros and micronutrients, while care teams set goals, track adherence, and message securely. Integrates with wearables and EHRs.",
      facts: [
        { icon: "badge-dollar-sign", label: "Revenue Model", value: "SaaS Subscription (clinics) + Freemium consumer app" },
        { icon: "tag", label: "Pricing", value: "\u20AC29 per clinician seat per month, annual billing" },
        { icon: "chart-area", label: "Monetization Stage", value: "Revenue generating, early traction" },
      ],
      lists: [
        { title: "Product/Service", items: [
          "AI photo-based food logging that automatically estimates macros and micronutrients to cut patient data-entry burden",
          "Clinician dashboard for dietitians to monitor adherence, set goals, and message patients securely in one place",
          "Wearable and health-data integrations (Apple Health, Google Fit, glucose monitors) for a unified nutrition record",
          "Personalized meal-planning engine with allergy, budget, and cultural dietary preference filters built in",
        ] },
        { title: "Traction", items: [
          "Month over month active-user growth averaging 18% over six consecutive months since product launch",
          "12 Dutch clinics and two regional health insurers running paid pilots covering roughly 3,000 patients",
          "Selected for the Rockstart Health accelerator cohort with non-dilutive grant support secured",
        ] },
        { title: "Roadmap", items: [
          "2026 Q3: Launch continuous glucose monitor (CGM) integration for diabetes and pre-diabetes cohorts",
          "2026 Q4: Release multilingual clinician dashboard and expand pilots into Belgium and Germany",
        ] },
      ],
    },
    market: {
      title: "Market",
      score: "Market Score: 5 / 5",
      sizes: [
        { label: "TAM", value: "\u20AC18 Bn", note: "(global digital nutrition & wellness)" },
        { label: "SAM", value: "\u20AC3.2 Bn", note: "(EU clinical nutrition & chronic-disease management)" },
        { label: "SOM", value: "\u20AC180 Mn", note: "(achievable EU clinic + insurer share within current GTM)" },
      ],
      facts: [
        { icon: "target", label: "Target market", value: "Dietitians, hospital nutrition departments, chronic-disease clinics, and health insurers across the EU managing patients with diabetes, obesity, and cardiovascular risk who need measurable, continuous adherence data." },
        { icon: "rocket", label: "Growth Drivers", value: "Rising chronic-disease burden and a reimbursement shift toward preventive digital care are pushing payers and clinics to adopt tools that prove patient adherence and outcomes at scale." },
        { icon: "box", label: "Category", value: "HealthTech / Digital Nutrition / Clinical Decision Support / Chronic Disease Management" },
      ],
      whyNow: { title: "Why now", text: "Insurers and regulators increasingly reimburse digital therapeutics, and mainstream wearable and CGM adoption now supplies the continuous data needed to make nutrition care measurable and clinically credible." },
      competitors: { title: "Competitive Landscape", items: [
        "MyFitnessPal \u2014 strong consumer logging but no clinician dashboard or provider reimbursement pathway",
        "Nutrium \u2014 dietitian-focused but limited AI logging and weak wearable and EHR integration",
        "Oviva \u2014 closest clinical competitor, but a service-heavy model with higher cost and slower onboarding",
      ] },
      lists: [
        { title: "Differentiation", icon: "sparkles", tone: "good", items: [
          "AI photo-based logging reduces patient burden and improves adherence versus manual-entry competitors",
          "Clinician and insurer reporting designed around EU reimbursement and GDPR data handling from day one",
          "Open integration layer unifying wearables, CGMs, and EHRs into a single longitudinal nutrition record",
          "Dual B2B/B2C model lets clinics onboard patients who then continue on a paid consumer tier",
        ] },
        { title: "Market Risks", icon: "triangle-alert", tone: "bad", items: [
          "Reimbursement timelines vary by country and could slow insurer-led adoption beyond the Netherlands",
          "The crowded consumer nutrition space could raise acquisition cost if B2C is pushed too early",
          "Clinical-grade accuracy claims for AI logging will require ongoing validation and regulatory diligence",
        ] },
      ],
    },
    deal: {
      title: "Deal",
      score: "Deal Score: 4 / 5",
      facts: [
        { icon: "milestone", label: "Stage", value: "Seed" },
        { icon: "earth", label: "Jurisdiction", value: "Netherlands" },
        { icon: "hand-coins", label: "Amount", value: "\u20AC1,500,000" },
        { icon: "file-text", label: "Instrument", value: "Equity" },
        { icon: "chart-pie", label: "Stake", value: "15%" },
        { icon: "landmark", label: "Valuation", value: "\u20AC10,000,000" },
      ],
      lists: [
        { title: "Investment Highlights", icon: "star", tone: "good", items: [
          "Strong founder-market fit pairing registered-dietitian expertise with proven product and engineering delivery",
          "Genuine paid traction across 12 clinics and two insurers with healthy month-over-month user growth",
          "Defensible integration and reimbursement positioning in a large, structurally growing EU market",
        ] },
        { title: "Key Risks", icon: "triangle-alert", tone: "bad", items: [
          "The \u20AC10M valuation looks rich for seed stage relative to current ARR and early pilot revenue",
          "Regulatory and clinical-validation overhead could extend runway needs beyond this round",
          "Revenue is concentrated in early pilots; conversion to long-term paid contracts is still unproven",
        ] },
      ],
      recommendation: { title: "Investment Recommendation", text: "Proceed to full due diligence. NutriTrack shows strong founder-market fit, real paid traction across clinics and insurers, and a defensible position in a large EU market. Before committing, negotiate the valuation toward a more typical seed range, confirm pilot-to-contract conversion rates, and independently validate the accuracy of the AI nutrient-estimation engine." },
      disclaimer: { title: "Disclaimer", text: "This is not investment advice. The pre-scoring analysis is generated for informational purposes only and should not be relied upon as a basis for making investment decisions. Always conduct your own due diligence." },
    },
  } satisfies MemoContent,
  },
  committee: {
    title: "Scoring & Committee Workspace",
    text: "Collaborative scoring with variance detection and structured decision-making",
    card: { title: "Short Memo", text: "IC-lite format for faster committee reviews", checks: ["Better decisions, less bias", "Faster IC prep", "Repeatable process"] },
    sliderLabel: "Committee workspace tools",
    tiles: [
      { icon: "columns-3-cog" as IconName, title: "Thesis Templates", text: "Customizable scoring criteria aligned to fund strategy" },
      { icon: "workflow" as IconName, title: "Multi-Reviewer", text: "Parallel scoring with automatic variance detection" },
      { icon: "message-square-plus" as IconName, title: "Discussion Thread", text: "Structured debate and alignment on key questions" },
      { icon: "toggle-right" as IconName, title: "Decision Controls", text: "Clear pass/fail/hold workflow with audit trail" },
    ],
  },
  dd: {
    title: "Due Diligence & IC Pack",
    text: "Comprehensive DD tracking with full audit trail and IC-ready exports",
    tags: ["Q&A Log", "Document Requests", "Audit Trail"],
    card: { title: "Investment Memo + IC Pack", text: "Complete package ready for Investment Committee", checks: ["De-risk decisions", "Close faster", "LP-grade professionalism"] },
    areas: [
      { icon: "gavel" as IconName, title: "Legal", items: ["Cap table", "IP ownership", "Contracts"] },
      { icon: "dollar-sign" as IconName, title: "Commercial", items: ["Customer refs", "Pipeline", "Partnerships"] },
      { icon: "landmark" as IconName, title: "Financial", items: ["Audited statements", "Projections", "Unit economics"] },
      { icon: "database" as IconName, title: "Tech", items: ["Architecture", "Security audit", "Scalability"] },
    ],
  },
  quote: {
    text: "\u201CWe reviewed 1M impressions of founder activity across 63 countries. The signal is there - RaiseTalks surfaces it.\u201D", // numbers from the live site (designer decision)
    name: "Dariia Vasylieva",
    role: "Founder",
    portrait: { ...dariiaPortrait, alt: "Dariia Vasylieva, Founder of RaiseTalks" },
    background: { desktop: "/images/investors/1296-1214.webp", tablet: "/images/investors/1296-1214-tablet.webp", mobile: "/images/investors/1296-1214-mobile.webp" },
    stats: [
      // order: designer, Drop 24
      { value: "< 1 min", label: "Average IC memo\ndraft time" },
      { value: "63", label: "Countries" },
      { value: "1,000,000", label: "Founder activity impressions reviewed" },
    ],
  },
  cta: {
    heading: { lead: "Join 60 days", accent: "Investor Edition Pilot" },
    text: "Book a 20-minute demo. We'll show you three vetted deals before you close the tab.",
    primary: { label: "Book a Demo", ...investorLinks.demo },
    secondary: { label: "Request Early Access", ...investorLinks.earlyAccess },
  } satisfies CtaBandContent,
};
