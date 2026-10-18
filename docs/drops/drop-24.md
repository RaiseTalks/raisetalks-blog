# Drop 24 — Final fixes for raisetalks.com rebuild (Studio)

- RaiseTalks TV links (navbar, footer, Home TV teaser) → https://raisetalks-tv.vercel.app (site.ts, shared.ts).
  Links to app.raisetalks.com unchanged. Links from RaiseTalks TV back to this site live in the TV repo.
- Hero intro (Linear-style blur fade) on every hero: PageHero `intro` now defaults on (Home, About, Startups,
  Investors, Decoder, Pitch, Pricing, Feature Request, Affiliate); Pitch stats card comes in last; legal heroes use the
  same classes (title, subtitle, then the "Last updated" tab).
- Hero column 948 → 1024 (`--container-hero`), on every page (also /sign-in, which uses the same token).
- Double-line grid rows always run edge to edge: Drop 23 `lines="column"` removed from GridGap and its uses
  (About, Startups, Investors, Pitch). Rails stay at their column width (1024 under heroes).
- Startups row after "Everything you need": checked at 375 / 768 / 1280 / 1920 and at 5 scroll positions — it is grey
  (#F7F7F7) with full-width #DEDEDE lines top and bottom, the same as the Investors row under "What You Get". No change
  needed; if it still looks white on the live site, send a screenshot.
- Decoder photo strip: decoder-photo-06 removed (exact copy of 05) → 11 photos.
- Pricing "Save 40%": Website badge in footnote size (12px).
- Investors quote stats order: < 1 min, 63, 1,000,000.
- ui/ArtImage.tsx: stale "image optimizer" comment fixed (Builder's note, Drop 23).
- docs/design-system.md: Drop 23 rules updated.

## Files (Studio)
docs/design-system.md, docs/drops/drop-24.md, src/styles/tokens.css, src/components/layout/Band.tsx,
src/components/sections/{PageHero,PricingPlans}.tsx, src/components/legal/LegalPage.tsx, src/components/ui/ArtImage.tsx,
src/content/site.ts, src/content/marketing/{shared,investors,decoder}.ts,
src/app/(marketing)/{about,startups,investors,pitch-competitions}/page.tsx

## Studio QA
Build + lint clean. next start, 14 routes × 375 / 768 / 1280 / 1920: no overflow, no page errors; every `.hero-intro`
element at opacity 1 after load; hero column 1024 at 1280+; every GridGap as wide as the viewport (the only narrower rows
are the blue rows inside the rounded frames, by design); TV link = raisetalks-tv.vercel.app on every page; Decoder strip
11 unique photos; badge 12px.

## For Builder
```
Integrate Studio Drop 24 (final fixes for this site). Read docs/drops/drop-24.md. Do not edit Studio files.

1. Check the drop was unzipped at the project root: src/styles/tokens.css, src/components/layout/Band.tsx and
   docs/drops/drop-24.md changed.
2. public/images/decoder-game/decoder-photo-06.webp is no longer used (exact duplicate of 05): delete it and remove it
   from docs/assets.md.
3. npm run build and npm run lint (fix nothing in Studio files unless the build breaks; then smallest fix, logged).
4. QA on npm start at 375 / 768 / 1280 / 1920:
   - Every page hero (/, /about, /startups, /investors, /decoder-game, /pitch-competitions, /pricing, /feature-request,
     /affiliate-program, legal pages) plays the blur-fade intro on load: headline, text, buttons, background, then
     eyebrow / logo strip / Pitch stats; nothing animates with prefers-reduced-motion: reduce; nothing stays hidden.
   - Hero column 1024 wide at 1280+; on About / Startups / Investors its rails line up with the blue band's rails.
   - Every double-line grid row runs edge to edge (incl. under the heroes and around the blue bands).
   - Navbar, footer and Home "Explore Founder Originals" open https://raisetalks-tv.vercel.app.
   - Decoder photo strip: 11 different photos, none repeated next to itself; 0 broken images.
   - Pricing "Save 40%" badge text 12px; Investors quote stats order "< 1 min", "63", "1,000,000".
   - No page errors, no horizontal overflow on all routes (scripts/screens.mjs).
5. Add a Drop 24 entry to docs/log.md (newest on top).
6. Commit "Drop 24: final fixes", push, check the Vercel deploy, then finish with REPORT FOR STUDIO.
```
