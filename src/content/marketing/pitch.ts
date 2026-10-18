// Pitch Competitions copy — Figma 1244:1062 (rough page: copy + intent kept, rebuilt with the
// current section system). Owner: Studio (A)
import type { CtaBandContent, Heading, IconName } from "./shared";
import { art, links } from "./shared";

export const pitch = {
  hero: {
    eyebrow: "Pitch Competitions",
    heading: { lead: "Discover startups", accent: "worth meeting" } satisfies Heading,
    primary: { label: "Browse startups", href: "https://app.raisetalks.com/startups", external: true },
    secondary: { label: "Schedule Demo", ...links.demo },
    stats: [
      { value: "4x", label: "Faster deal screening" },
      { value: "85%", label: "Investor satisfaction" },
      { value: "72hr", label: "Avg response time" },
    ],
    image: art.heroAlt,
  },
  why: {
    heading: { lead: "Why Join Our", accent: "Pitch Competitions" } satisfies Heading,
    items: [
      { icon: "badge-check" as IconName, title: "Vetted Startups", text: "Access pre-screened startups competing for investment opportunities" },
      { icon: "bar-chart-3" as IconName, title: "Structured Evaluation", text: "Consistent scoring across Team, Product, Market, and Deal dimensions" },
      { icon: "handshake" as IconName, title: "Founder Access", text: "Connect directly with founders building the next big thing" },
      { icon: "calendar-clock" as IconName, title: "Early Deal Flow", text: "Get first look at high-potential startups before they hit the market" },
    ],
  },
  process: {
    heading: "The Process",
    sub: "From Application to Investment Decision",
    sliderLabel: "The Process, steps",
    steps: [
      { title: "Apply", text: "Startups submit structured profiles and data rooms" },
      { title: "Screen", text: "AI-powered pre-scoring filters top candidates" },
      { title: "Pitch", text: "Live or async presentations to investor panel" },
      { title: "Connect", text: "Direct introductions to matching investors" },
    ],
  },
  get: {
    heading: { lead: "What You Get in Every Competition" } satisfies Heading,
    items: [
      { title: "Standardized Data Rooms", text: "Consistent format across all participants." },
      { title: "Pre-Score Cards", text: "AI-generated initial assessments" },
      { title: "Founder Profiles", text: "Team backgrounds and track records" },
      { title: "Market Analysis", text: "Competitive landscape and sizing" },
      { title: "Financial Projections", text: "Unit economics and runway" },
      { title: "Direct Messaging", text: "Reach founders instantly" },
    ],
  },
  cta: {
    heading: { lead: "Ready to discover", accent: "your next investment?" },
    text: "Browse startup profiles and connect with founders building innovative solutions.",
    primary: { label: "Browse Startups", href: "https://app.raisetalks.com/startups", external: true },
    secondary: { label: "Schedule Demo", ...links.demo },
  } satisfies CtaBandContent,
};
