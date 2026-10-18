# Assets

## Naming rule (both accounts rely on this — no guessing)
- Raster images → `public/images/<page>/<node-id with ":" → "-">.webp`
  e.g. node 1285:984 on About → `/images/about/1285-984.webp`
- Nested image inside a section → `<section-id>_<image-node-id>.webp`
  e.g. `/images/home/3257-1087_3257-1120.webp`
- `<page>` = home | about | startups | investors | decoder-game | pitch-competitions | legal | shared
- Desktop image is the master. Export a separate tablet/mobile file ONLY if the crop or
  image itself differs; name it with the tablet/mobile node ID.
- Vectors / logos / icons → `public/icons/<kebab-name>.svg`; partner logos → `public/logos/<kebab-name>.svg`
- Conversion: `sharp`, WebP quality 80, max width 2400px (1:1 if smaller).
- Generic UI icons (arrows, check, chevrons, plus) are NOT exported — lucide-react.

## Manifest (B-02b — images from the designer's folder + Figma “extra”)
Builder has no access to Studio's Figma file; sources are `images/` (git-ignored, read-only) and Figma file `eXCYaeB8cQrRXmXRawMZSM` section “extra”.

| Target | Source | Confidence | Size | Reason |
|---|---|---|---|---|
| `/icons/logo-raisetalks.svg` | Figma extra: logo.svg | high | svg | Figma "extra" → Primary Logo – Colour (760×60) |
| `/icons/logo-raisetalks-white.svg` | Figma extra: logo-white.svg | high | svg | Figma "extra" → Primary Logo – White (760×60) |
| `/images/home/3257-1052.webp` | Backgrounds and repeating elements/Homepage hero desktop.webp | high | 2400×925 | pale-blue swirl hero, 3840×1480 |
| `/images/home/3257-1122.webp` | Backgrounds and repeating elements/founder quote blue bg.webp | medium | 2400×1800 | blue texture named for the founder quote |
| `/images/home/3257-1550.webp` | Claude MCP.webp | high | 858×366 | RaiseTalks × Claude icons, transparent |
| `/icons/logo-raisetalks-tv-white.svg` | Figma extra: logo-tv-white.svg | high | svg | Figma "extra" → RAISETALKS TV white (1011×62) |
| `/images/startups/3420-16697.webp` | Investor grade data room.webp | high | 1860×1080 | data room UI |
| `/images/startups/3420-16938.webp` | one click export memo.webp | high | 1860×1080 | tablet + paper PDF export |
| `/images/startups/3420-17009.webp` | AI Fundraising Advisor.webp | high | 1860×1080 | phone on café table |
| `/images/startups/3420-17025.webp` | Pitch Deck AI.webp | high | 1860×1080 | pitch-slide cards around 3D logo |
| `/images/startups/3420-17169.webp` | IR Updates.webp | high | 1860×1080 | IR Update Agent UI |
| `/images/startups/3420-17358.webp` | IR push readiness.webp | high | 1860×1080 | "247 investors found" dark UI |
| `/images/startups/3420-17413.webp` | IR Pipeline.webp | high | 1860×1080 | pipeline kanban |
| `/images/startups/3420-17903.webp` | claude mcp raisetalks.webp | medium | 1860×1080 | two app icons with beam, 1860×1080 like the other rows |
| `/images/investors/3478-6569.webp` | Investor Frustration Desktop.webp | high | 2400×852 | phone chat → logo → data room, 4056×1440 |
| `/images/investors/1296-1214.webp` | Backgrounds and repeating elements/Founder quote light bg desktop.webp | medium | 2400×1297 | light quote background |
| `/images/about/1285-996.webp` | Figma extra: p996_a.jpg | high | 1920×1080 | Figma extra: woman on stage with headset |
| `/images/about/1285-997.webp` | Figma extra: p997_a.jpg | high | 1920×1080 | Figma extra: Trustmedialens backdrop |
| `/images/about/1285-998.webp` | Figma extra: p998_a.jpg | high | 1920×1080 | Figma extra: big group photo |
| `/images/about/1285-1000.webp` | Figma extra: p1000_a.jpg | high | 1920×1080 | Figma extra: "startup showcase" stage |
| `/images/about/1285-1001.webp` | Figma extra: p1001_a.jpg | high | 1920×1080 | Figma extra: "Building Investor Trust" screen |
| `/images/about/1285-1002.webp` | Figma extra: p1002_a.jpg | high | 1920×1080 | Figma extra: "Community" group |
| `/images/decoder-game/cards/CNST-279 2.webp` | Decoder game/CNST-279 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-269 2.webp` | Decoder game/CNST-269 2.webp | high | 1159×1738 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-260 2.webp` | Decoder game/CNST-260 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-281 2.webp` | Decoder game/CNST-281 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-298 2.webp` | Decoder game/CNST-298 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-327 2.webp` | Decoder game/CNST-327 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-352 2.webp` | Decoder game/CNST-352 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-388 2.webp` | Decoder game/CNST-388 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-357 2.webp` | Decoder game/CNST-357 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-304 2.webp` | Decoder game/CNST-304 2.webp | high | 1161×1742 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-363 2.webp` | Decoder game/CNST-363 2.webp | high | 1159×1738 | original CNST file, copied for Studio |
| `/images/decoder-game/cards/CNST-286 2.webp` | Decoder game/CNST-286 2.webp | high | 1159×1738 | original CNST file, copied for Studio |
| `/icons/mark-512.png` | Backgrounds and repeating elements/Footer Logo Desktop.webp | medium | 512×512 | 3D mark cropped from the footer logo, centred on a transparent 512×512 |

### Partner logos
The 13 carousel logos live in `/images/home/logos/` (kebab-case names, listed in the B-06 table below; order and alt texts in `src/content/marketing/shared.ts → partnerLogos`). The old `3257-1069…1078` slot files and `shared/logos-extra/` were deleted in Drop 18. Aspect ratios: 3:1, except Step and Founders to Founders 2:1.

### Missing (`?`)

### Unused source files
- Backgrounds and repeating elements/Blue bg full section mobile.webp
- Backgrounds and repeating elements/Blue bg full section tablet.webp
- Backgrounds and repeating elements/founder quote dark bg.webp
- Backgrounds and repeating elements/Founder quote light bg mobile.webp
- Backgrounds and repeating elements/Founder quote light bg tablet.webp
- Backgrounds and repeating elements/Hero Alt Mobile.webp
- Backgrounds and repeating elements/Hero Alt Tablet.webp
- Backgrounds and repeating elements/Highlight bg 1 Destkop.svg
- Backgrounds and repeating elements/Highlight bg 1 mobile.svg
- Backgrounds and repeating elements/Highlight bg 1 tablet.svg
- Backgrounds and repeating elements/Highlight bg 2 Destkop.svg
- Backgrounds and repeating elements/Homepage hero mobile.webp
- Backgrounds and repeating elements/Homepage hero tablet.webp
- Backgrounds and repeating elements/Main CTA dark bg mobile.webp
- Backgrounds and repeating elements/Main CTA dark bg tablet.webp
- Decoder game/CNST-286 2-1.webp
- Investor Frustration Mobile.webp
- Investor Frustration Tablet.webp
- Raisetalks tv mobile.webp
- Raisetalks tv tablet.webp
- vision mobile.svg
- vision.svg

### Real size of `/icons/logo-raisetalks.svg`
760 × 60 (viewBox 0 0 760 60). TV wordmark: 1011 × 62.


## Final asset import (B-06, 2026-10-07) — source `D:Claude_Dev
aisetalks-assets`

Real sizes after conversion (WebP q80, logos q90, never upscaled; caps: -desktop / backgrounds / default 2400, -tablet 1536, -mobile 750, logos 600). **These rows supersede the size column above for every path marked `overwritten`.** SVGs: copied as-is, root width/height removed, viewBox kept; the heavy decoder-wheel SVGs are heavy by design (no embedded `<image>`/base64 — pure vector). Status `wired: …` = referenced by code since Drop 18 (where used). The pre-B-06 placeholder files that Drop 18 replaced were deleted from `public/images/` (see docs/log.md, Drop 18). Video (`tv-loop*.mp4`, `tv-loop-poster.webp`) was NOT in the source folder — not imported.

| Public path | Source | Real W×H (SVG: viewBox) | Ratio | KB | Status |
|---|---|---|---|---|---|
| `/images/about/1285-996.webp` | about-photo-01.webp | 2048×1152 | 1.778 | 105.5 | overwritten |
| `/images/about/1285-997.webp` | about-photo-02.webp | 2048×1152 | 1.778 | 93.2 | overwritten |
| `/images/about/1285-998.webp` | about-photo-03.webp | 2048×1152 | 1.778 | 174.7 | overwritten |
| `/images/about/1285-1000.webp` | about-photo-04.webp | 2048×1152 | 1.778 | 77.2 | overwritten |
| `/images/about/1285-1001.webp` | about-photo-05.webp | 2048×1152 | 1.778 | 117.2 | overwritten |
| `/images/about/1285-1002.webp` | about-photo-06.webp | 2048×1152 | 1.778 | 85.8 | overwritten |
| `/images/home/3257-1052.webp` | home-hero-desktop.webp | 2400×925 | 2.595 | 13.3 | overwritten |
| `/images/home/3257-1052-tablet.webp` | home-hero-tablet.webp | 1536×1480 | 1.038 | 13.9 | wired: Home hero (tablet) — home.ts, ArtImage |
| `/images/home/3257-1052-mobile.webp` | home-hero-mobile.webp | 750×1480 | 0.507 | 7.8 | wired: Home hero (mobile) — home.ts, ArtImage |
| `/images/home/3257-1550.webp` | claude-mcp.webp | 858×366 | 2.344 | 63.2 | overwritten |
| `/images/investors/3478-6569.webp` | same-problems-desktop.webp | 2400×852 | 2.817 | 75.2 | overwritten |
| `/images/investors/3478-6569-tablet.webp` | same-problems-tablet.webp | 1536×545 | 2.818 | 47.2 | wired: Investors Frustration (tablet) — investors.ts, ArtSized |
| `/images/investors/3478-6569-mobile.webp` | same-problems-mobile.webp | 750×2004 | 0.374 | 64.5 | wired: Investors Frustration (mobile) — investors.ts, ArtSized |
| `/images/investors/1296-1214.webp` | quote-bg-desktop.webp | 2400×1297 | 1.85 | 17.7 | overwritten |
| `/images/investors/1296-1214-tablet.webp` | quote-bg-tablet.webp | 1536×1365 | 1.125 | 12 | wired: Investors quote bg (tablet) — investors.ts |
| `/images/investors/1296-1214-mobile.webp` | quote-bg-mobile.webp | 750×2000 | 0.375 | 8.2 | wired: Investors quote bg (mobile) — investors.ts |
| `/images/startups/3420-16697.webp` | feature-investor-grade-data-room.webp | 1860×1080 | 1.722 | 76.9 | overwritten |
| `/images/startups/3420-16938.webp` | feature-ai-readiness-scoring.webp | 1860×1080 | 1.722 | 72.8 | overwritten |
| `/images/startups/3420-17009.webp` | feature-ai-fundraising-advisor.webp | 1860×1080 | 1.722 | 131 | overwritten |
| `/images/startups/3420-17025.webp` | feature-pitch-deck-ai.webp | 1860×1080 | 1.722 | 134.4 | overwritten |
| `/images/startups/3420-17169.webp` | feature-ir-updates.webp | 1860×1080 | 1.722 | 74.2 | overwritten |
| `/images/startups/3420-17358.webp` | feature-investor-discovery-ir-push.webp | 1860×1080 | 1.722 | 109.8 | overwritten |
| `/images/startups/3420-17413.webp` | feature-ir-pipeline.webp | 1860×1080 | 1.722 | 60.6 | overwritten |
| `/images/startups/3420-17903.webp` | feature-data-room-mcp.webp | 1860×1080 | 1.722 | 63.7 | overwritten |
| `/images/home/spend-less-time-investors.webp` | spend-less-time-investors.webp | 2400×2361 | 1.017 | 242.9 | wired: Home Spend Less Time, startups slot (shows the startup catalogue) — home.ts |
| `/images/home/spend-less-time-startups.webp` | spend-less-time-startups.webp | 2400×2400 | 1 | 298.9 | wired: Home Spend Less Time, investors slot (shows the investor catalogue) — home.ts |
| `/images/shared/hero-alt-desktop.webp` | hero-alt-desktop.webp | 2400×625 | 3.84 | 4.4 | wired: hero of every page except Home (laptop+) — shared.ts `art.heroAlt` |
| `/images/shared/hero-alt-tablet.webp` | hero-alt-tablet.webp | 1536×800 | 1.92 | 4.1 | wired: same hero, tablet — shared.ts `art.heroAlt` |
| `/images/shared/hero-alt-mobile.webp` | hero-alt-mobile.webp | 750×1000 | 0.75 | 2.3 | wired: same hero, mobile — shared.ts `art.heroAlt` |
| `/images/shared/blue-panel-pattern-desktop.webp` | blue-panel-pattern-desktop.webp | 2400×875 | 2.743 | 6.9 | wired: BrandFrame (Startups How It Works, Decoder testimonials), Pitch steps — shared.ts `art.panel` |
| `/images/shared/blue-panel-pattern-tablet.webp` | blue-panel-pattern-tablet.webp | 1536×1344 | 1.143 | 6.5 | wired: same, tablet — shared.ts `art.panel` |
| `/images/shared/blue-panel-pattern-mobile.webp` | blue-panel-pattern-mobile.webp | 750×1312 | 0.572 | 3.7 | wired: same, mobile — shared.ts `art.panel` |
| `/images/shared/cta-desktop.webp` | cta-desktop.webp | 2400×778 | 3.085 | 3.7 | wired: CTA band on every page — shared.ts `art.cta` |
| `/images/shared/cta-tablet.webp` | cta-tablet.webp | 1536×960 | 1.6 | 2.8 | wired: CTA band, tablet — shared.ts `art.cta` |
| `/images/shared/cta-mobile.webp` | cta-mobile.webp | 750×750 | 1 | 1.1 | wired: CTA band, mobile — shared.ts `art.cta` |
| `/images/shared/logo-footer.webp` | logo-footer.webp | 963×732 | 1.316 | 29.4 | wired: footer 3D mark (294 / 400px) — SiteFooter.tsx |
| `/images/shared/dariia-portrait.webp` | dariia-portrait.webp | 888×900 | 0.987 | 203.8 | wired: Home quote + Investors portrait — shared.ts `dariiaPortrait` |
| `/images/decoder-game/decoder-photo-01.webp` | decoder-photo-01.webp | 1161×1742 | 0.666 | 97.5 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-02.webp` | decoder-photo-02.webp | 1159×1738 | 0.667 | 87.7 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-03.webp` | decoder-photo-03.webp | 1161×1742 | 0.666 | 68.4 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-04.webp` | decoder-photo-04.webp | 1161×1742 | 0.666 | 70.9 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-05.webp` | decoder-photo-05.webp | 1159×1738 | 0.667 | 70.6 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-07.webp` | decoder-photo-07.webp | 1161×1742 | 0.666 | 152.8 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-08.webp` | decoder-photo-08.webp | 1161×1742 | 0.666 | 98.6 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-09.webp` | decoder-photo-09.webp | 1161×1742 | 0.666 | 72.4 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-10.webp` | decoder-photo-10.webp | 1161×1742 | 0.666 | 94.2 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-11.webp` | decoder-photo-11.webp | 1161×1742 | 0.666 | 89.5 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-12.webp` | decoder-photo-12.webp | 1159×1738 | 0.667 | 110.7 | wired: Decoder photo strip — decoder.ts |
| `/images/decoder-game/decoder-photo-13.webp` | decoder-photo-13.webp | 1161×1742 | 0.666 | 142.2 | wired: Decoder photo strip — decoder.ts |
| `/images/home/logos/al-liwan.webp` | logos/logo-al liwan.webp | 360×120 | 3 | 6.9 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/aws.webp` | logos/logo-aws.webp | 360×120 | 3 | 3.5 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/dubai-ai-festival.webp` | logos/logo-Dubai AI Festival.webp | 360×120 | 3 | 12.1 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/founder-institute.webp` | logos/logo-founder Institute.webp | 360×120 | 3 | 9.6 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/founders-to-founders.webp` | logos/logo-founders to founders.webp | 240×120 | 2 | 4.2 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/getvision.webp` | logos/logo-getvision.webp | 360×120 | 3 | 4.5 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/global-ai-show.webp` | logos/logo-Global AI Show.webp | 360×120 | 3 | 13.8 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/grechka-media.webp` | logos/logo-Grechka Media.webp | 360×120 | 3 | 5.4 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/microsoft-for-startups.webp` | logos/logo-microsoft For startups.webp | 360×120 | 3 | 7 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/nlsql.webp` | logos/logo-NLSQL.webp | 360×120 | 3 | 8.4 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/nvidia.webp` | logos/logo-nvidia.webp | 360×120 | 3 | 8.8 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/step.webp` | logos/logo-step.webp | 240×120 | 2 | 6.6 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/images/home/logos/web-summit.webp` | logos/logo-web summit.webp | 360×120 | 3 | 4.1 | wired: partner strip (13 logos) — shared.ts `partnerLogos` |
| `/icons/logo-header.svg` | logo-header.svg | 200×16 | 12.5 | 3.1 | wired: navbar logo — site.ts `logo` |
| `/icons/about-not-data-room.svg` | about-not-data-room.svg | 48×48 | 1 | 1.8 | wired: About “Not just a…” tile 1 (40 / 48px) — about.ts |
| `/icons/about-not-pitch-coach.svg` | about-not-pitch-coach.svg | 48×48 | 1 | 1.9 | wired: About “Not just a…” tile 2 (40 / 48px) — about.ts |
| `/images/home/hero-band-desktop-wide.svg` | hero-band-desktop-wide.svg | 1480×250 | 5.92 | 6.5 | wired: blue band under hero, 1480 column (Home, legal) — shared.ts `art.bandWide` |
| `/images/shared/hero-band-desktop.svg` | hero-band-desktop.svg | 1024×250 | 4.096 | 6.5 | wired: blue band, 1024 column (About, Startups, Investors) — shared.ts `art.band` |
| `/images/shared/hero-band-tablet.svg` | hero-band-tablet.svg | 1024×250 | 4.096 | 6.4 | wired: blue band, tablet — shared.ts `art.band` / `bandWide` |
| `/images/shared/hero-band-mobile.svg` | hero-band-mobile.svg | 400×250 | 1.6 | 6.5 | wired: blue band, mobile — shared.ts `art.band` / `bandWide` |
| `/images/decoder-game/decoder-qr.svg` | decoder-qr.svg | 301×301 | 1 | 38.9 | wired: Decoder QR (320px) — decoder.ts `qr` |
| `/images/decoder-game/decoder-wheel-desktop.svg` | decoder-wheel-desktop.svg | 913×646 | 1.413 | 698.3 | wired: Decoder wheel, 768+ — decoder.ts |
| `/images/decoder-game/decoder-wheel-mobile.svg` | decoder-wheel-mobile.svg | 351×490 | 0.716 | 472.7 | wired: Decoder wheel, <768 — decoder.ts |
| `/video/tv-loop.mp4` | tv-loop.mp4 | 1920×1080, 25 fps, 12.0 s, H.264 yuv420p, no audio, faststart | 1.778 | 2954.2 | wired: Home TV background (Drop 19) — home.ts `tv.video`; copied as-is |
| `/video/tv-loop-poster.webp` | first frame of tv-loop.mp4 (regenerated; delivered 2512×1472 did not match) | 1920×1080 | 1.778 | 72.6 | wired: Home TV poster (Drop 19) |
