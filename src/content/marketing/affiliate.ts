// Affiliate Program copy — from the live page raisetalks.com/affiliate-program (not in Figma; layout by Studio,
// Drop 21). The two long tier sections of the live page are folded into the tier cards. Owner: Studio (A)
import type { CtaBandContent, Heading, IconName } from "./shared";
import { art, links } from "./shared";

export type Tier = {
  id: string; eyebrow: string; name: string; fit: string; rate: string; rateLabel: string;
  earnings: { label: string; value: string; unit?: string };
  features: { text: string; included: boolean }[];
  cta: { label: string; href: string; external?: boolean };
  tone: "light" | "dark"; badge?: string;
};

export const affiliate = {
  hero: {
    eyebrow: "Affiliate Program",
    heading: { lead: "Turn your network", accent: "into capital" } satisfies Heading,
    text: "Support founders, earn rewards. Whether you're a startup enthusiast, VC scout, accelerator lead, or founder community builder - our affiliate program lets you grow with us.",
    image: art.heroAlt,
  },
  audiences: [
    { title: "Startup Mentors", text: "Guide founders to better fundraising" },
    { title: "VC Scouts", text: "Connect promising startups" },
    { title: "Accelerators", text: "Empower your portfolio" },
    { title: "Community Builders", text: "Add value to your network" },
  ],
  tiers: {
    heading: { lead: "Affiliate Program Tiers" } satisfies Heading,
    sub: "Choose the tier that matches your impact",
    items: [
      {
        id: "basic", eyebrow: "Basic", name: "Referral Partner", tone: "light",
        fit: "Perfect for startup mentors, community builders, early users",
        rate: "20%", rateLabel: "one-time commission",
        earnings: { label: "Average earnings per referral", value: "$20 - $100" },
        features: [
          { text: "Personalized referral link", included: true },
          { text: "Monthly payouts", included: true },
          { text: "Performance dashboard", included: true },
          { text: "Standard partner kit", included: true },
          { text: "Co-branded campaigns", included: false },
          { text: "Dedicated partner manager", included: false },
          { text: "Official ambassador badge", included: false },
        ],
        // live button is "#"; Calendly demo link approved by the designer (Drop 21)
        cta: { label: "Join as Referral Partner", ...links.demo },
      },
      {
        id: "pro", eyebrow: "Pro", name: "Venture Ambassador", tone: "dark", badge: "Recommended",
        fit: "For VC scouts, accelerators, incubators",
        rate: "10%", rateLabel: "recurring commission",
        earnings: { label: "Lifetime earnings potential", value: "$1,000+", unit: "per active referral" },
        features: [
          { text: "Personalized link + onboarding toolkit", included: true },
          { text: "Monthly payouts", included: true },
          { text: "Advanced performance dashboard", included: true },
          { text: "Pro partner kit + support", included: true },
          { text: "Co-branded campaigns eligible", included: true },
          { text: "Dedicated partner manager", included: true },
          { text: "RaiseTalks Venture Ambassador badge", included: true },
          { text: "Early access to features & events", included: true },
        ],
        // live button is "#"; Calendly demo link approved by the designer (Drop 21)
        cta: { label: "Apply to Become Venture Ambassador", ...links.demo },
      },
    ] satisfies Tier[],
    note: "Both tiers include full tracking, monthly payouts, and partner support.",
  },
  toolkit: {
    heading: { lead: "Pro Toolkit Overview" } satisfies Heading,
    sub: "Everything you need to succeed as a Venture Ambassador",
    sliderLabel: "Pro toolkit",
    items: [
      { icon: "book-open" as IconName, title: "Ambassador Welcome Guide", text: "Step-by-step guide to succeed as a Venture Ambassador" },
      { icon: "link" as IconName, title: "Unique Referral Link", text: "Personalized tracking link for all referrals" },
      { icon: "list-checks" as IconName, title: "Startup Fit Criteria", text: "Checklist for qualified leads (ideal startup persona)" },
      { icon: "send" as IconName, title: "Outreach Templates", text: "Pre-written email, LinkedIn DM, and WhatsApp scripts" },
      { icon: "palette" as IconName, title: "Brand Assets", text: "Logos, screenshots, badges, and social media graphics" },
      { icon: "presentation" as IconName, title: "Demo Deck + Video", text: "Short product intro deck + founder pitch demo" },
      { icon: "chart-line" as IconName, title: "Performance Dashboard", text: "Real-time referral tracking and payout history" },
      { icon: "file-pen-line" as IconName, title: "Partner Agreement", text: "Commission structure, payout terms, usage rights" },
      { icon: "award" as IconName, title: "Perks & Recognition", text: "Early feature access, public spotlight, co-branded PR" },
    ],
  },
  cta: {
    heading: { lead: "Have Questions?" },
    text: "We're happy to walk you through the program or help you onboard your first referral.",
    // live button is "#"; Calendly demo link approved by the designer (Drop 21)
    primary: { label: "Contact Our Partner Team", ...links.demo },
  } satisfies CtaBandContent,
};
