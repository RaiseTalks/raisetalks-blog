# Drop 23 — Site-wide fixes from the designer's review (Studio)

One drop for the whole list. New rules are in docs/design-system.md, "Drop 23 rules".

## Global
- `divider-1` #F0F2F5 (tokens.css): dividers between cells of divider grids on white, lighter than the rail. Used in
  Home Pitch + feature grid, About Values, Startups AI Advisor, Investors Due Diligence, Decoder co-host,
  Pitch Why Join / What You Get, Affiliate audience cards. Card outlines unchanged.
- Mobile inner line `--spacing-inner` 20px: below 768, loose text, buttons, FAQ and divider-grid cells sit 20px inside the
  band padding (= where text in a card starts); slider first cards start there too (About Values, Founder Perks,
  Committee tiles, Pro Toolkit, How It Works / The Process; tablet How It Works 32 + 24px).
- `text-h4-alt` = H4 + 2px (19 / 21 / 22). Also enlarges its existing uses (Home soft cards, About, Startups feature
  subtitles, Decoder quotes).
- `GridGap lines="column"` (+ `width="hero"`): horizontal lines stop at the rails.
- Home hero intro (Linear-style), CSS only, Home only: `PageHero intro`, `.hero-intro-*` in components.css.

## Pages
- Home: Pitch stats labels on 2 lines ("Faster deal / screening", "Investor / satisfaction"), 80px apart on tablet,
  40px on laptop; 4 cards half as tall on mobile; stats → cards gap 40 → 32px; mobile tiles/cells on the inner line.
- About: band under the hero = 1024 rails, its grid rows 1024 wide and white (lower one was grey). Why We Build was
  already grey (#F7F7F7) at 375 here.
- Startups: highlight band rows 1024; Problem headline breaks after "lose" at every width; new grey grid row after the
  "Everything you need" stack (above the AI Advisor); AI Advisor headline left on mobile + tablet; FAQ inner line.
- Investors: highlight band rows 1024; memo "Investment Recommendation" title white; grey grid row between Due
  Diligence and the quote; quote stats centred, "Average IC memo / draft time".
- Decoder: fact values in H4 Alt; co-host heading on one line at every width, tablet = heading left / button right,
  top-aligned; FAQ grey; What People Are Saying cards 16px from the frame on mobile.
- Pitch Competitions: grid row under the hero at the hero column width (948, lines stop at its rails).
- Pricing: "Save 40%" = dark Website badge; grid row between hero and cards removed; mobile cards: name → price
  ~half, price → button 32 → 24px.
- Affiliate: audience section + cells vertical padding −50%; Pro card "Recommended" = RaiseTalks TV "Most Popular"
  tab (accent gradient, breaks out of the top edge); mobile gap between tier cards 40px for the tab.

## Files (Studio)
docs/design-system.md, docs/drops/drop-23.md, src/styles/tokens.css, src/styles/components.css,
src/components/layout/Band.tsx, src/content/marketing/{home,investors,startups}.ts,
src/app/(marketing)/{page,about,startups,investors,decoder-game,pitch-competitions,pricing}.tsx (each page.tsx),
src/components/sections/{AboutSections,AffiliateSections,BentoCards,CheckGrid,DecoderSections,FeatureGrid,FeatureRows,
IntroMedia,InvestorTools,McpSection,MemoDoc,PageHero,PerksGrid,PitchTeaser,PricingPlans,ProblemSection,ProcessSteps,
QuoteStats,SplitMedia,VideoSection}.tsx

## Studio QA
Build + lint clean, 20 routes ○. next start, Chromium: 15 routes × 375 / 768 / 1280 / 1920 — no horizontal overflow, no
page errors. Co-host heading one line (height 37 / 51 / 59 / 59px at 375 / 768 / 1280 / 1920). Hero intro: animation
`hero-intro` on the headline, opacity 1 after load. Mobile screenshots checked by eye on all 8 changed pages.

## For Builder
```
Integrate Studio Drop 23 (site-wide fixes). Read docs/drops/drop-23.md. Do not edit Studio files.

1. Check the drop was unzipped at the project root (no copies under images/): src/styles/tokens.css,
   src/components/layout/Band.tsx and docs/drops/drop-23.md changed.
2. Builder change: serve images exactly as supplied (designer decision, no re-compression). In next.config.ts add
   `unoptimized: true` to `images` (keep the i.ytimg.com remotePatterns). Log it in docs/log.md.
3. npm run build and npm run lint (fix nothing in Studio files unless the build breaks; then smallest fix, logged).
4. QA on npm start at 375 / 768 / 1280 / 1920:
   - Every <img> on /, /about, /startups, /investors, /decoder-game: src is the /images/... file itself (no
     /_next/image), and <picture> still picks *-mobile / *-tablet files at 375 / 768. 0 broken images.
   - Home: on load the hero headline appears first, then text, buttons, background, badge + logo strip (blur fade);
     with prefers-reduced-motion: reduce nothing animates. Pitch Competitions stats labels on 2 lines.
   - 375: headings/paragraphs start 20px further in than the band padding (e.g. Home MCP heading left ≈ 37px), level with
     text inside cards; slider first cards (About Values, Startups Founder Perks + How It Works, Investors Committee,
     Affiliate Pro Toolkit) start at the same line.
   - About / Startups / Investors: grid rows above and below the blue band have horizontal lines only between the
     1024 rails (laptop+), white background. /pitch-competitions: row under the hero lines only between the hero rails.
   - Startups: grey grid row between the "Everything you need" stack and the AI Advisor; "Great founders lose" ends
     line 1 at every width.
   - Investors: memo "Investment Recommendation" title white (light + dark memo); grey row before the quote; quote
     stats centred, "draft time" on line 2.
   - Decoder: "Join us as Co-Host" one line at all widths, tablet button right + top-aligned; FAQ band grey.
   - Pricing: no grid row under the hero; "Save 40%" dark navy badge. Affiliate: "Recommended" gradient tab above the
     Venture Ambassador card, no badge inside it.
   - No page errors, no horizontal overflow on all routes (scripts/screens.mjs).
5. Add a Drop 23 entry to docs/log.md (newest on top).
6. Commit "Drop 23: site-wide review fixes", push, check the Vercel deploy, then finish with REPORT FOR STUDIO.
```
