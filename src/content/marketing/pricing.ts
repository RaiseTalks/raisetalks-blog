// Pricing copy — from the live page raisetalks.com/pricing (not in Figma; layout designed by Studio). Owner: Studio (A)
import type { CtaBandContent, Heading } from "./shared";
import { art, links } from "./shared";

export type Billing = "annual" | "monthly";
export type Plan = {
  id: string; audience: string; name: string;
  price?: { annual: string; monthly: string }; priceNote?: string;
  features: { text: string; soon?: boolean }[];
  cta: { label: string; href: string; external?: boolean };
  tone: "founders" | "investors" | "platinum";
};

export const pricing = {
  hero: {
    heading: { lead: "Simple, Transparent Pricing" } satisfies Heading,
    text: "Whether you're raising capital or sourcing deals, RaiseTalks offers plans designed to help you move faster.",
    image: art.heroAlt,
  },
  billing: {
    label: "Billing period",
    // Monthly first and selected by default (Drop 21). Annual saves 41% on Startup Pro, 40% on Investor Pro.
    options: [
      { id: "monthly" as Billing, label: "Monthly" },
      { id: "annual" as Billing, label: "Annual", badge: "Save 40%" },
    ] as { id: Billing; label: string; badge?: string }[],
    per: { annual: "/yr", monthly: "/mo" },
  },
  plans: [
    {
      id: "startup-pro", audience: "For Founders", name: "Startup Pro", tone: "founders",
      price: { annual: "$699", monthly: "$99" },
      features: [{ text: "Unlimited AI Advisor" }, { text: "DD-ready data room" }, { text: "IR Pipeline" }, { text: "IR Push" }, { text: "Direct investor invites" }, { text: "Data Room MCP" }],
      cta: { label: "Start now", ...links.signUp },
    },
    {
      id: "investor-pro", audience: "For Investors", name: "Investor Pro", tone: "investors",
      price: { annual: "$1,428", monthly: "$199" },
      features: [{ text: "DD-tier access (143 fields)" }, { text: "Scoring OS" }, { text: "Connections & IR Updates" }, { text: "1-click Investment Memo PDFs" }, { text: "Investor MCP" }, { text: "Q&A Constructor with public share links" }],
      cta: { label: "Start now", ...links.signUp },
    },
    {
      id: "vc-platinum", audience: "For Venture Funds", name: "VC Platinum", tone: "platinum",
      priceNote: "Contact us",
      features: [{ text: "All in Investor Pro, plus:" }, { text: "2H 2026 Pilot Program" }, { text: "Early access to the new features" }, { text: "Priority Customer Support" }, { text: "Online Pitch Competitions", soon: true }, { text: "Watch List" }, { text: "IC Committee", soon: true }],
      cta: { label: "Let's talk", ...links.demo },
    },
  ] satisfies Plan[],
  soonLabel: "Coming soon",
  trust: ["Monthly or annual billing", "Cancel anytime", "Secure payment by Stripe"],
  cta: {
    heading: { lead: "Ready to transform your fundraising?" },
    text: "Join thousands of founders and investors using AI to move faster with confidence.",
    primary: { label: "Start now", ...links.signUp },
    secondary: { label: "Schedule Demo", ...links.demo },
  } satisfies CtaBandContent,
};
