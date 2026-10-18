// Support page copy (/support). Built from the design system, copy from the old site's support page.
// Answers use [label](href) for links; everything else is plain text.
import type { CtaBandContent, Heading, IconName } from "./shared";
import { links } from "./shared";

export const SUPPORT_EMAIL = "support@raisetalks.ai";
export const BILLING_EMAIL = "billing@raisetalks.ai";
export const PRIVACY_EMAIL = "privacy@raisetalks.ai";
const YOUTUBE = "https://youtube.com/@raisetalks";

export const support = {
  hero: {
    heading: { lead: "RaiseTalks Support", accent: "How can we help?" } satisfies Heading,
    text: "Video tutorials, step-by-step guides and a real team on the other end of every email.",
    primary: { label: "Email support", href: `mailto:${SUPPORT_EMAIL}`, external: false },
    secondary: { label: "Watch the guide", href: "#founders-guide", external: false },
  },
  channels: {
    heading: { lead: "Pick the route", accent: "that fits" } satisfies Heading,
    items: [
      { icon: "square-play", label: "Video", title: "Watch tutorials", text: "Product walkthroughs and feature demos on the RaiseTalks YouTube channel.", action: "Open YouTube", href: YOUTUBE },
      { icon: "book-open", label: "Guides", title: "Read the blog", text: "In-depth guides on data rooms, readiness scores, investor pipelines and diligence.", action: "Browse articles", href: "/blog" },
      { icon: "headset", label: "Email", title: "Contact support", text: "Stuck on something in the app? Write to us and a member of the team will reply.", action: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
      { icon: "lightbulb", label: "Ideas", title: "Request a feature", text: "Tell us what would make your raise or your dealflow easier to run.", action: "Submit a request", href: "/feature-request" },
    ] satisfies { icon: IconName; label: string; title: string; text: string; action: string; href: string }[],
  },
  video: {
    eyebrow: "Founders guide",
    heading: { lead: "How to use RaiseTalks,", accent: "step by step" } satisfies Heading,
    text: "Follow a sample startup from its first pitch deck upload to a signed term sheet. Pick a step to jump straight to it.",
    // "How to Use RaiseTalks: The Complete Founders Guide (Step by Step)", uploaded 2026-10-05, 11:26 long
    youtubeId: "tVBOT9ymqiE",
    title: "How to Use RaiseTalks: The Complete Founders Guide (Step by Step)",
    description:
      "A step-by-step walkthrough of RaiseTalks for founders: build an investor-grade data room, score your investment readiness, get in front of matched investors and run your whole round from one workspace.",
    uploadDate: "2026-10-05T14:24:25-07:00",
    duration: "PT11M26S",
    // From the video description; `end` is where the next chapter starts (Clip structured data)
    chapters: [
      { time: "0:57", start: 57, end: 105, title: "Set up in 5 minutes with pitch deck auto-fill" },
      { time: "1:45", start: 105, end: 161, title: "Build an investor-grade data room" },
      { time: "2:41", start: 161, end: 205, title: "Get your Readiness Score" },
      { time: "4:08", start: 248, end: 286, title: "Control who sees what with access tiers" },
      { time: "6:01", start: 361, end: 404, title: "IR Push to matched investors" },
      { time: "6:44", start: 404, end: 443, title: "Run your round on one pipeline" },
    ],
    more: { label: "More videos on YouTube", href: YOUTUBE },
  },
  guides: {
    heading: { lead: "Popular guides", accent: "from the blog" } satisfies Heading,
    // Post slugs; posts that are not live yet are skipped
    slugs: [
      "data-room-checklist-pre-seed-seed-startups",
      "data-room-access-tiers-what-to-share",
      "fundraising-readiness-score-guide",
      "run-your-raise-as-a-pipeline-10-stages",
      "investor-qa-answer-40-questions-once",
      "pre-screening-at-scale-scoring-startups",
    ],
    all: { label: "Browse all articles", href: "/blog" },
  },
  faq: {
    heading: { lead: "Frequently Asked Questions" } satisfies Heading,
    items: [
      {
        q: "How do I contact RaiseTalks support?",
        a: `Email [${SUPPORT_EMAIL}](mailto:${SUPPORT_EMAIL}) from the address you signed up with and describe what you were trying to do. Screenshots help. For billing questions, write to [${BILLING_EMAIL}](mailto:${BILLING_EMAIL}).`,
      },
      {
        q: "Where can I learn how to use RaiseTalks?",
        a: `Start with the complete founders guide video on this page or on the [RaiseTalks YouTube channel](${YOUTUBE}), then use the [blog](/blog) for in-depth guides on data rooms, readiness scores, investor pipelines and diligence.`,
      },
      {
        q: "What do I get during the trial?",
        a: "Every new account starts with a 30-day trial and no payment is taken during it. You can build your data room, get your readiness score and browse the catalogs, with the AI Advisor limited to 3 questions a day. Startup Pro or Investor Pro unlocks the full workspace - see [pricing](/pricing).",
      },
      {
        q: "How do I cancel my subscription?",
        a: `Cancel at any time from your dashboard, or email [${SUPPORT_EMAIL}](mailto:${SUPPORT_EMAIL}). Cancellation takes effect at the end of the current billing period.`,
      },
      {
        q: "Can I get a refund?",
        a: `Refund requests must reach [${BILLING_EMAIL}](mailto:${BILLING_EMAIL}) within 7 calendar days of the charge, with your account details and the reason. The [Refund Policy](/refund-policy) lists which cases qualify.`,
      },
      {
        q: "How do I export or delete my data?",
        a: `Go to Profile in the app and choose Download my data for a full export, or Delete Account to erase your account permanently. For any other privacy request, email [${PRIVACY_EMAIL}](mailto:${PRIVACY_EMAIL}).`,
      },
      {
        q: "How do I report a bug or suggest a feature?",
        a: `Email bugs to [${SUPPORT_EMAIL}](mailto:${SUPPORT_EMAIL}) with the steps that led to the problem. Ideas for new features go through the [feature request form](/feature-request).`,
      },
    ],
  },
  cta: {
    heading: { lead: "Still need help?", accent: "Talk to the team." },
    text: "Email us with what you were trying to do, or book a call and walk us through it.",
    primary: { label: "Email support", href: `mailto:${SUPPORT_EMAIL}`, external: false },
    secondary: { label: "Book a call", ...links.demo },
  } satisfies CtaBandContent,
};
