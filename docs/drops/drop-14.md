# Drop 14 — Investors, Startups, Decoder Game

## Changes
**Shared**
- `layout/Band.tsx`: new `width="medium"` = rails at 1024 on laptop+ (tablet/mobile = normal rails).
- `sections/StackSection.tsx` (new) + `.stack*` in `styles/components.css`: pinned heading + stacking cards, laptop+ only. Heights are measured in JS, `top = min(heading bottom, 100vh − own height)`. While stuck, a grey strip fills the gap above the heading.
- `PageHero`: mobile buttons stacked full width on all inner pages (`stackButtons`; Home passes `false`). `headingFlow` = mobile heading runs on (Decoder).
- `CtaBand`: mobile buttons stacked full width on every page. New `float` slot (laptop+): centred on the band's top edge, half above.
- `Headline`: `mobileFlow` option.
- `StatementBanner`: `width` and `mobileLeft` options.

**Investors**
- Banner rails at 1024; mobile text left-aligned.
- **What You Get:**
  - Now a StackSection: heading → 5 cards → Pre-Score → Scoring & Committee → DD.
  - 1px line between subsections on laptop, grid rows below laptop.
  - Pre-Score and DD are white inside the rails and grey outside.
- "RaiseTalks" in the heading uses the brand gradient.
- **5 cards:**
  - Every line is ticked. Exception: IC Prep's two intro lines stay plain because a tick list follows them.
  - Tablet columns: AI Readiness + IC Prep | Data Rooms + Shortlist + Fees. The last card of the shorter column stretches.
- **Pre-Score:**
  - The memo is now HTML (`sections/MemoDoc.tsx`, copy in `investors.ts → preScore.memo`), with Lucide icons and a team of 4 (Lukas Smit removed).
  - The blue frame is the scroll box. The rounded bottom and the blue padding only appear at the end.
  - Height: 480px mobile, 600px tablet, the left column's height on laptop+.
  - The memo layout follows the sheet's own width (container queries).
- **Scoring & Committee:**
  - Columns are now Thesis + Multi-Reviewer | Discussion + Decision, with the second column 48px higher (tablet+).
  - On mobile the 4 tiles are a drag slider to the screen edge.
- **DD:** the badges use the `accent` variant; the dots are 6px (Decoder size).
- **Quote:** a grid row added below it, before the CTA (Figma 2190:96). The photo stays a placeholder.

**Startups**
- Banner rails at 1024.
- **The Problem:** 50/50 on laptop. On tablet the heading breaks "Great founders lose raises / in due diligence. / Not in the pitch."
- **How It Works** (`ProcessSteps framed`):
  - The band is a rounded rectangle 8px in from the screen edge on mobile, 12px from tablet. Its rails still line up with the page rails.
  - Yellow lines between the numbers.
  - Below laptop the steps are a drag slider.
  - The step titles were black because of the global h3 colour; they're now white, on Pitch too.
- **Everything you need:** a StackSection. Grey outside the rails; the rows alternate white and grey inside. Image first on tablet and mobile (unchanged).
- **Founder Perks:** grey (unchanged); the mobile items are a drag slider.
- Video section: white, rails at 1024.
- FAQ: grey, rails at 1024.

**Decoder Game**
- FAQ rails at 1024. This also brings back the mobile rails: the old `mx-auto` was overriding the 8px margin.
- **QR:**
  - Laptop+ only, 320px (the current 160px file, upscaled, as a placeholder).
  - Half of it sits above the CTA band.
  - The FAQ gets 160px extra bottom room for it.
- The mobile hero heading runs on as one text: "…tonight, *what would you pay for?*"

## Decisions taken in code
- The investors memo SVG `/images/investors/2539-7813.svg` is no longer used.
- The Pitch "The Process" section is not framed. Only its titles change to white (a bug fix).
- The Decoder FAQ stays white; only its width changed.

## Checked (localhost, placeholders at real sizes, Chromium)
- Build + lint clean, all routes ○.
- No horizontal overflow on Investors, Startups or Decoder at 375 / 768 / 1280 / 1920.
- **Stacking at 1280×800, Investors:** the heading pins at 0 (226px including the navbar strip). The 5 cards (702px) and Pre-Score (781px) are taller than the space left, so they hold bottom-aligned. DD (533px) pins right under the heading.
- **Stacking at 1280×800, Startups:** the heading pins (285px). The rows (443–595px) pin under it or hold bottom-aligned.
- **Memo at 1920:** at the top, the blue padding and rounded corners show. Mid-scroll, the white runs to both edges. At the end, the rounded bottom and blue padding show.
- **Tablet bento:** both columns end level.
- **Mobile sliders** (Committee, How It Works, Perks): no page overflow, and the next card peeks.
- Decoder: the QR sits half above the CTA band at 1280; the mobile heading has a space between the parts.
- **Not judged here:** real images, Georgia italic wraps, and how the stacking feels on a real trackpad or wheel. Please check those on the live site.

## Designer TODO
- Hero tablet/mobile backgrounds (all inner pages).
- The 2 hand-drawn About icons.
- About 5/10-year vision images (desktop/tablet + mobile).
- Final About photos.
- Dariia's quote photo (Investors).
- Final Decoder QR image.

## For Builder
```
Task: Drop 14 (Studio) — integrate + verify. Read docs/drops/drop-14.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks (project ROOT, "Replace all").
   New files: src/components/sections/StackSection.tsx, src/components/sections/MemoDoc.tsx.
2. npm run build && npm run lint (all routes ○).
3. /investors at 1280 and 1920 (real browser, mouse wheel):
   - Scroll through "What You Get with RaiseTalks". The heading stays pinned under the navbar.
     The 4 subsections slide over each other. No content shows above the heading while it is pinned.
   - Scroll the memo window to the end. The rounded bottom corners + blue padding appear only there.
     The page continues scrolling after the memo ends.
   - At 768: the bento columns end level. At 375: the hero buttons are stacked and full width,
     and the 4 committee tiles drag sideways. No page overflow.
4. /startups at 1280: "Everything you need" pins and stacks. How It Works is a rounded blue rectangle
   with yellow lines; at 768/375 its steps drag sideways. At 375 the Founder Perks drag sideways.
5. /decoder-game at 1280: the QR sits half above the dark CTA band, not hidden under the FAQ.
   At 375: the QR is hidden and the FAQ has rails.
6. public/images/investors/2539-7813.svg is no longer referenced. Delete it and remove it from docs/assets.md.
7. Commit "Drop 14: Investors/Startups/Decoder — stacking sections, HTML memo, 1024 sections, mobile sliders",
   push, add a docs/log.md entry (mind CRLF).
```
