# Drop 18 — final images wired (all pages, except the TV video)

Studio files only. Unzip at the project ROOT → "Replace all".

## What changed
- **New `ui/ArtImage.tsx`** (`ArtFill`, `ArtSized`): a different file per breakpoint (desktop = laptop+, tablet 768–1279,
  mobile <768) via Next `getImageProps` + `<picture>`. No new library.
- **Shared backgrounds** (`shared.ts → art`), now the default in their components:
  - Heroes: Home = `home/3257-1052` + `-tablet` / `-mobile`; **every other page (About, Startups, Investors, Decoder,
    Pitch, Pricing) = `shared/hero-alt-*`**. Pitch + Pricing no longer use the Home hero.
  - Blue band under the hero (`StatementBanner`, About `GoalCard`): `hero-band-desktop-wide.svg` on the 1480 column
    (Home, legal pages), `hero-band-desktop.svg` on the 1024 column (About, Startups, Investors); tablet / mobile SVGs everywhere.
  - CTA band: `shared/cta-*` on every page (About / Investors / Decoder own CTA images removed).
  - Blue panels (`BrandFrame`: Startups How It Works, Decoder testimonials; Pitch steps): `shared/blue-panel-pattern-*`.
- **Logos:** header `/icons/logo-header.svg` (200×16), footer 3D mark `/images/shared/logo-footer.webp` (963×732, same
  294 / 400px width). Partner strip: 13 logos from `/images/home/logos/` (Figma order + Al Liwan Labs, AWS, Founders to
  Founders at the end), declared 360×120 / 240×120.
- **Home:** Dariia portrait → `shared/dariia-portrait.webp` (also Investors, declared 888×900). Spend Less Time wired by
  what the image shows: the startup-catalogue picture (`spend-less-time-investors.webp`, 2400×2361) in the startups slot,
  the investor-catalogue picture (`spend-less-time-startups.webp`, 2400×2400) in the investors slot — not swapped.
  Claude MCP icons declared 858×366 (real file).
- **Investors:** Frustration image = `ArtSized` desktop 2400×852 / tablet 1536×545 / mobile 750×2004. Quote background
  desktop / tablet / mobile.
- **About:** the 2 hand-drawn icon tiles replace the Lucide placeholders (40px, 48px from laptop). Timeline left as it
  was (designer decision: the timeline SVG is NOT used).
- **Decoder:** wheel = designer SVGs (desktop file from tablet up, mobile file below 768); 13 new strip photos;
  QR = `decoder-qr.svg` (its own white tile + blue frame, so the extra white padding is gone), 320px.
- Not in this drop: TV video (Drop 20 when the file exists). `/sign-in` keeps the Home hero image.

## Studio QA (localhost, Chromium)
Build + lint clean, all routes ○. At 375 / 768 / 1280 / 1920 on /, /about, /startups, /investors, /decoder-game,
/pitch-competitions, /pricing, /privacy-policy the browser picks the right file per width (e.g. 375 = `*-mobile`,
768 = `*-tablet`, 1280+ = desktop; wide band on Home + legal, narrow band elsewhere). No broken images except the YouTube
poster (sandbox can't reach i.ytimg.com), no horizontal overflow. Not judged: real phones / WebKit, final look of
logos with their baked-in padding.

## For Builder
```
TASK: Integrate Studio Drop 18 (final images wired) + clean up obsolete images.
Read docs/drops/drop-18.md. Do NOT edit Studio files.

1. npm run build + npm run lint must pass. All routes static.
2. QA on a production build (Chromium), 375 / 768 / 1280 / 1920, routes: / /about /startups /investors /decoder-game
   /pitch-competitions /pricing /privacy-policy /sign-in:
   - For every <picture> img, log currentSrc: 375 must load *-mobile files, 768 *-tablet, 1280/1920 the desktop files.
     Home + /privacy-policy band = hero-band-desktop-wide.svg on laptop+, the other pages hero-band-desktop.svg.
   - No broken images (the i.ytimg.com poster is fine to ignore if offline), no horizontal overflow, no page errors.
   - Header logo, footer 3D mark (294px at 1280, 400px at 1920), 13 partner logos moving in the strip,
     Decoder QR half above the CTA band at 1280+, About icon tiles 40 / 48px.
3. Delete these now-unused files, ONLY after `grep -r` over src/ confirms no reference
   (scripts/asset-review.html and scripts/import-images.mjs still list some of them: update or leave those tools, your call):
   home: 3257-1083, 3257-1123, 3257-1593, 2601-8564
   shared: 3257-1069, -1070, -1071, -1072, -1073, -1074, -1075, -1076, -1078, 3257-1388, 3257-1409, logos-extra/ (folder)
   about: 1285-943, 1285-967, 2368-199, about-timeline-desktop.svg, about-timeline-mobile.svg
   startups: 1316-2892, 1338-4839
   investors: 1296-286, 1430-774, 2368-219, 2187-94
   decoder-game: 2601-7806, 2601-7855, 2601-8253, 2601-9420, 2677-16853, 2677-16971, 2601-7725 … 2601-7736
   Keep /icons/logo-raisetalks.svg and logo-raisetalks-white.svg (memo + mobile footer still use them).
4. docs/assets.md: mark the B-06 UNWIRED rows as wired (where used), remove the deleted rows. docs/log.md: Drop 18 entry.
5. Commit + push.

REPORT FOR STUDIO
Task: Drop 18  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
Plus: the currentSrc table per width, deleted files, anything that failed.
```
