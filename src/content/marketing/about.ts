// About page copy — Figma 1244:742 (desktop), 1429:53 (tablet), 1936:2 (mobile). Owner: Studio (A)
import type { CtaBandContent, Heading } from "./shared";
import { art, links } from "./shared";

export const about = {
  hero: {
    eyebrow: "We are",
    heading: { lead: "Translating founder potential", accent: "into investor-grade intelligence" } satisfies Heading,
    primary: { label: "Browse startups", href: "https://app.raisetalks.com/startups", external: true },
    secondary: { label: "Schedule Demo", ...links.demo },
    image: art.heroAlt,
  },
  goal: {
    eyebrow: "Our 10-year goal",
    text: "Power 1M entrepreneurs to close rounds faster, deploying over $100 Bn in capital by 2036.",
    note: "We believe it's possible - and worth it because it changes the world.",
  },
  why: {
    accent: "Why",
    lead: "we Build.",
    blocks: [
      { text: "We strive to democratize access to capital by making every serious founder investor-ready - regardless of their network, their background, or how many times they've done this before." },
      { text: "Capital has always flowed most easily to those who already know the language: the repeat founders, the Stanford alumni, the people who went to school with the partners." },
      { text: "RaiseTalks is the great equalizer.", emphasis: true },
      { text: "We encode the knowledge that used to live only in warm introductions, and we give it to every founder who's serious enough to show up." },
      { text: "This is not a small aspiration." },
      { text: "It is a structural reshaping of how capital moves in the world." },
      { text: "When great ideas stop dying in due diligence, the entire innovation ecosystem becomes more productive." },
    ],
  },
  photos: [
    { src: "/images/about/1285-996.webp", alt: "Dariia Vasylieva speaking on stage" },
    { src: "/images/about/1285-997.webp", alt: "RaiseTalks at the Trustmedialens event" },
    { src: "/images/about/1285-998.webp", alt: "RaiseTalks community group photo" },
    { src: "/images/about/1285-1000.webp", alt: "Startup Showcase stage" },
    { src: "/images/about/1285-1001.webp", alt: "Speaker at the Building Venture Capital session" },
    { src: "/images/about/1285-1002.webp", alt: "RaiseTalks community meetup" },
  ],
  // UI labels for the photo rows + lightbox (screen readers / close button)
  photosUi: { label: "RaiseTalks events and community", open: "Open photo", close: "Close photo" },
  toward: {
    heading: { lead: "What we\u2019re", accent: "Building Toward" } satisfies Heading,
    text: "RaiseTalks is the operating system of early-stage capital - the infrastructure layer through which deals are organized, evaluated, and funded globally.",
    nots: [
      { icon: "/icons/about-not-data-room.svg", text: "Not just a\ndata room tool." },
      { icon: "/icons/about-not-pitch-coach.svg", text: "Not Just a\npitch coach." },
    ],
    statement: "We are the connective tissue between the world's best founders and the capital they need to change it.",
    detail: "A platform that has processed enough raises, tracked enough outcomes, and built enough intelligence to know - with genuine predictive accuracy - what a successful company looks like at the seed stage.",
    milestones: [
      { when: "In 5 years", title: "The Intelligence Standard", text: "RaiseTalks Readiness Score becomes the industry benchmark - the first thing investors ask about and the first thing founders prepare for. \"What's your RaiseTalks score?\" is a standard pre-meeting question." },
      { when: "In 10 years", title: "The Capital Layer", text: "RaiseTalks becomes the infrastructure that connects founders and investors across markets, stages, and geographies - the Bloomberg Terminal of early-stage startup capital." },
    ],
  },
  backers: { title: "Our Backers & Partners" },
  values: {
    heading: { lead: "We Believe", accent: "in our Values" } satisfies Heading,
    sliderLabel: "Our values",
    text: "Our values are the decisions we make when no one is watching - and especially when the right choice is the expensive one.",
    items: [
      { title: "Founder First.", text: "Every feature, decision, tradeoff is evaluated through one lens: does this make a founder's raise more likely to succeed?", quote: "\"Take care of the people first.\" - Ben Horowitz" },
      { title: "Intelligence Compounds.", text: "Every raise we process makes us smarter. Every mistake we make becomes a system improvement. We never waste a setback.", quote: "\"1% better every day = 37x in a year.\" - Kaizen" },
      { title: "Flow Over Force.", text: "The best product experiences feel effortless. We build for flow - the state where the right next step is obvious, the friction is invisible.", quote: "\"Wu wei - action through alignment.\" - Lao Tzu" },
      { title: "Earn the Trust, Every Time.", text: "Founders share their most sensitive information with us - financials, cap tables, internal documents. We treat this as sacred.", quote: "\"Earn trust before you need it.\" - CEO Excellence (McKinsey)" },
      { title: "Equity in Access.", text: "The founder in London, Dubai, or Accra deserves the same intelligence as the one in San Francisco.", quote: "\"Geography and biology shape outcomes more than individual genius.\" - Jared Diamond" },
      { title: "Build to Last.", text: "We make decisions with a 10-year lens. We don't optimize for the metric of the quarter at the expense of the trust of the decade.", quote: "\"Preserve the core. Stimulate progress.\" - Jim Collins" },
    ],
  },
  cta: {
    heading: { lead: "Investors", accent: "Build With Us" },
    text: "Bring a trusted, standardized diligence layer to your portfolio or program - accelerating deal execution with investor-grade structure and real-time intelligence.",
    primary: { label: "Book a Demo", ...links.demo },
    secondary: { label: "Try it FREE", ...links.signUp },
  } satisfies CtaBandContent,
};
