// Decoder Game copy — Figma 2601:7778 (desktop only; tablet/mobile derived by Studio). Owner: Studio (A)
// Links from the live page raisetalks.com/decoder-game.
import type { Cta, CtaBandContent, Heading, IconName } from "./shared";
import { art, links } from "./shared";

const coHost = { href: "mailto:hq@raisetalks.ai?subject=Co-Host%20RaiseTalks%20Decoder%20Game" };

export const decoder = {
  hero: {
    heading: { lead: "If you'd pay for one piece\nof knowledge tonight,", accent: "what would you pay for?" } satisfies Heading,
    text: "One chip. One question you'd actually pay to have answered. The room picks the night's agenda and answers it live. Join the next game, or bring it to your city.",
    primary: { label: "Join The Game", href: "https://luma.com/z0q3ykpd", external: true } satisfies Cta,
    secondary: { label: "Ask to Co-Host", ...coHost } satisfies Cta,
    image: art.heroAlt,
  },
  chip: {
    heading: { lead: "One Chip -", accent: "One Bet" } satisfies Heading,
    checks: ["Every Participant Bet on One question.", "Top 4 questions = the program of the night.", "Every answer unlocks priceless Insights.", "Every game is a dataset of Real pains."],
    facts: [
      { label: "Timeline", value: "60 Minutes" },
      { label: "Knowledge Budget", value: "$1,000" },
    ],
    roles: { label: "Voices Chip Roles:", items: ["Founder", "Investor", "Operator"] },
    wheel: {
      // designer SVGs (Drop 18): desktop file from tablet up, mobile file below 768
      desktop: { src: "/images/decoder-game/decoder-wheel-desktop.svg", width: 913, height: 646 },
      mobile: { src: "/images/decoder-game/decoder-wheel-mobile.svg", width: 351, height: 490 },
      alt: "RaiseTalks Decoder Game wheel with eight fundraising questions",
    },
  },
  // final event photos (B-06), 2:3 portrait like the strip frames
  photos: [
    { src: "/images/decoder-game/decoder-photo-01.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-02.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-03.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-04.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-05.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-07.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-08.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-09.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-10.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-11.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-12.webp", alt: "Photo from a RaiseTalks Decoder Game" },
    { src: "/images/decoder-game/decoder-photo-13.webp", alt: "Photo from a RaiseTalks Decoder Game" },
  ],
  testimonials: {
    heading: "What People are Saying",
    items: [
      { quote: "\u201CIt was a great event and the best part was getting to know Dariia Vasylieva. Excellent topic and amazing workshop.\"", name: "Reza Ghiasi", role: "Co-Founder @ YEX" },
      { quote: "\u201CEvents like this remind you how important strong communities and meaningful conversations are in building the next generation of companies.\u201D", name: "Ikram Boumediene", role: "Founder & CEO @ ScoutLabs.io" },
      { quote: "\u201CIt was a pleasure connecting with so many talented professionals, innovators, and thought leaders.\u201D", name: "Hanan Al-Shayeb", role: "CEO @ Altery" },
    ],
  },
  coHost: {
    heading: { lead: "Join us as", accent: "Co-Host" } satisfies Heading,
    cta: { label: "Co-Host RaiseTalks Decoder Game", ...coHost } satisfies Cta,
    items: [
      { icon: "lightbulb" as IconName, title: "A curated Room", text: "Direct visibility with founders, investors, and operators who showed up to trade real questions for real answers." },
      { icon: "badge-check" as IconName, title: "A proprietary dataset", text: "Every night's votes become a ranked map of the market's live pains - yours to use for content and positioning." },
      { icon: "camera" as IconName, title: "Ready-made content", text: "Photo, video and quote assets from a high-energy, visually distinct format - built for social." },
      { icon: "file-check" as IconName, title: "A proven format", text: "Already run in Dubai, with strong reviews from founders and investors in the room." },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    // Answers: Figma. Blank line = new paragraph · "- " = bullet · "1. " = numbered step.
    items: [
      { q: "What is the RaiseTalks Decoder Game?", a: "A 60-minute live format where the audience builds the agenda instead of sitting through one.\n\nEvery person in the room walks in with a symbolic $1,000 knowledge budget and one chip. They bet that chip on the single fundraising question they would actually pay to have answered tonight. The four most-backed questions become the program, and the room answers them out loud: founders, investors and operators on the same question, in the same hour.\n\nNo pre-baked panel. No moderator's script. The room decides what matters, then decodes it." },
      { q: "How does a night actually run?", a: "Eight questions on the wheel. One chip per person. Sixty minutes.\n\n1. Place your bet. Every participant puts their chip on the one question worth their $1,000.\n2. The room sets the agenda. Top 4 questions by bet volume become the program of the night. Live, visible, unarguable.\n3. Three voices per question. Founder, investor, operator each answer the same question from their own chip role. Same question, three vantage points, zero hedging.\n4. The room closes it. Open floor, live scoring, and the answers that changed people's minds get captured.\n\nEvery answer unlocks insight that normally sits behind a closed-door coffee. Every game produces a dataset of real pains." },
      { q: "Is the $1,000 real money? Does anyone pay to attend?", a: "No. The $1,000 is a knowledge budget, not a ticket.\n\nIt exists to force a real choice. Ask people \"any questions?\" and you get politeness. Give them one chip and a budget and you get truth: the thing they are actually stuck on. That constraint is the whole engine of the format, and it is why the questions that surface are the ones people never raise on a panel." },
      { q: "Do we need to pay anything to co-host?", a: "No. There is no fee to co-host a RaiseTalks Decoder Game.\n\nWe are not selling a sponsorship. We are trading assets. What we ask from a co-host:\n\n- A venue or community space for 30 to 80 guests\n- An audience of founders, investors or operators\n- Local promotion and community reach — your channels, your list, your city\n- Co-branding on the night — your name on the room, next to ours\n\nThat is the whole ask. If external sponsorship comes in on top, it is possible and we profit-share it with you." },
      { q: "What does RaiseTalks bring?", a: "The entire game, run and moderated end to end. You open the room, we run the night.\n\n- The Decoder Game format and IP, fully facilitated\n- Dr. Dariia Vasylieva hosting on stage\n- Chip kits, question bank and live scoring\n- Promotion to the RaiseTalks founder and investor network\n- A post-event insights report: the ranked dataset of real pains from your room\n\nYou are not producing an event. You are hosting one that is already built." },
      { q: "What does a founder get out of playing?", a: "Two things that almost never happen in the same hour: being heard by investors, and being seen by peers.\n\nYou get heard. When you bet your chip, you put your actual blocker in front of real investors and get their answer to it live. Not a generic \"traction matters\" from a stage. Their read on your question, in the room, with follow-ups. Most founders pay for that access in months of cold outreach.\n\nYou get seen. When you answer, you show your own judgment on venture capital out loud. Your read on dilution, on terms, on what a data room really needs, on what killed your last round. That is the moment other founders remember you, and the moment an investor in the room decides you are worth a coffee. You do not pitch your way into credibility here. You reason your way into it.\n\nAnd it runs both ways. You hear how an investor answers the exact question you were about to answer, and how a founder two years ahead of you answers it. The gap between those three answers is the education. Nobody leaves with only their own perspective intact." },
      { q: "What do investors get?", a: "Unfiltered signal on what founders are actually stuck on, before it reaches a pitch deck.\n\nThe betting round is a live, ranked map of founder pain in your market. You see which questions the room paid for, then you watch how founders reason in real time under real questions. That tells you more about judgment than 30 pitches will. It is also the least awkward way to be visible to a curated room of founders: you are useful for an hour instead of being sold to for an hour." },
      { q: "Why not just run a panel or a pitch night?", a: "Because panels answer the questions the organizer guessed, and pitch nights reward performance over thinking.\n\nThe Decoder Game inverts both. The agenda is voted with chips, so the content is provably what the room wanted. Founders and investors answer the same question side by side, so you get contrast instead of consensus theatre. And the format is visually distinct on camera: chips, a wheel, live scoring, real reactions. It photographs and films like a game, not like a row of chairs." },
      { q: "What does a co-host walk away with?", a: "Four assets, all of them reusable after the night ends.\n\n- A curated room. Direct visibility with founders, investors and operators who showed up to trade real questions for real answers.\n- A proprietary dataset. Every night's votes become a ranked map of your market's live pains. Yours to use for content, positioning and programming.\n- Ready-made content. Photo, video and quote assets from a high-energy, visually distinct format, built for social.\n- A proven format. Already run in Dubai with strong reviews from the founders and investors in the room." },
      { q: "Where is it running, and how do we bring it to our city?", a: "Run in Dubai. Next: Cyprus, UK, San Francisco during STEP Conference, and Dubai again.\n\nIf your city is not on that list, that is the point of this page. Pick your city, open your room, and let your audience build the agenda. We handle the game. You host the night that gets talked about after." },
    ],
  },
  cta: {
    heading: { lead: "Pick your city, open your room", accent: "Let your audience build the agenda" },
    text: "We handle the game — you host the night that gets talked about after.",
    primary: { label: "Book a Call", ...links.demo },
  } satisfies CtaBandContent,
  qr: { src: "/images/decoder-game/decoder-qr.svg", width: 301, height: 301, alt: "QR code for the next RaiseTalks Decoder Game" },
};
