# Drop 1 — Foundations + Home + Startups + Investors

## What's in it
- **Tokens:** muted #696969 (style guide wins), shadow-nav, nav/hero widths, on-brand text,
  glass-on-brand, announcement/card/footer gradients, audience theme vars, `text-h4-alt`.
- **Shared layout:** AnnouncementBar (dismiss) · sticky glass SiteHeader (active page semibold,
  mobile menu) · SiteFooter = Home footer on every page (3D mark desktop, wordmark row tablet/mobile,
  affiliate button) · `Band` + `GridGap` grid rhythm · `CtaBand`.
- **UI:** new light Badge set · Button `outline` + `nav` size + `external` · `Icon` (lucide,
  gradient stroke following the audience) · LinkedIn glyph.
- **Sections (reusable):** PageHero, LogoMarquee, StatementBanner, SoftCards, Testimonial,
  AudienceSwitch, McpSection (+ CapabilityList, CopyField), FeatureGrid, SplitMedia, TvTeaser,
  PitchTeaser, ProblemSection, ProcessSteps, FeatureRows, CheckGrid, PerksGrid, VideoSection
  (YouTube facade), Faq, IntroMedia, BentoCards, PreScore/Committee/Dd sections, QuoteStats, Checklist.
- **Pages:** `/` (Investors + Startups views, `/?for=startups`), `/startups`, `/investors`; `/kit` updated.
- Other routes are still placeholders (Drop 2).

## Checked in Studio sandbox (placeholder images)
Build + lint + tsc clean. No horizontal overflow at 375 / 768 / 1920. No page errors.
Desktop heights vs Figma: Home 6972 / 6997 · Startups 12500 / 12407 · Investors 6957 / 6554.
Tablet/mobile heights will change once real images replace the 4:3 placeholders.

## Decisions / flags
1. **No invented copy.** Text missing in Figma was taken from the live site (raisetalks.com):
   Startups FAQ answers 2–7, "Claim your Perks" (mailto:startups@raisetalks.ai), "Open in Claude"
   link, Investors "Book a Demo" (calendly.com/raisetalks/demo) + "Request Early Access" (mailto).
   Where neither Figma nor the live HTML has text, the item stays title-only (MCP capabilities 2–4 in
   both views, Pre-Score Product-Tech / Market / Deal) and the 13 remaining FAQ answers are listed as
   empty in `src/content/marketing/startups.ts` (not rendered until filled).
2. Typos fixed in FAQ questions: "I'm racing" → "raising", "Is RaiseTalks is free" → "Is RaiseTalks free".
3. "Let's connect" → linkedin.com/in/dvasylieva · Startups video → YouTube 8WOwPsQE158.
4. "Request MCP Link" → sign-up (not on the live page).
5. Snapped: panel radius 24→16, hairline colours → border-1 (#EBEBEB).

## For Builder
1. Unzip into `D:\Claude_Dev\raisetalks` → Replace all. (Only Studio files: src/, docs/, CLAUDE.md, README.md.)
2. `Do docs/prompts/B-02-assets.md` — it now exports exactly `docs/drops/images-needed.md`.
3. Then `Do docs/prompts/B-04-qa-archive.md` and send the zip to Studio.
Until B-02 runs, images show as broken — expected.
