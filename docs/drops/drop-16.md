# Drop 16 — Startups

## Changes
- **The Problem:** on desktop the heading breaks after "Great founders lose". Tablet still breaks after "raises"; mobile wraps naturally.
- **How It Works** (new `sections/BrandFrame.tsx`, exactly as Figma 2191:118 / 1500:865 / 1967:4446):
  - A blue grid row with #258BFF lines at the top and bottom of the rectangle.
  - Radius 12 / 32 / 48px. New tokens: `--radius-2xl` 32 and `--radius-3xl` 48.
  - The white grid rows around the section are removed.
  - The cards keep the 4px dark-blue bottom edge.
  - The Decoder testimonials use the same frame.
- **Everything you need:**
  - `StackSection pinLast`: the Data Room MCP card stops right under the pinned heading, then leaves with it. The cards before it stay pinned while it slides over them.
  - `outerLines={false}`: lines between rows only between the rails (laptop+).
  - Investors is unchanged.
- **AI Advisor:**
  - The grid row above it is removed.
  - On tablet the heading runs on as one text: "…not just a tool. *It's a standard.*"
- **Founder Perks:**
  - Desktop: heading and cards top-aligned.
  - Tablet: heading top left, button top right, cards below.
- **Video:** 1024-wide white grid rows above and below it (Figma 2306:924), replacing the 1480 ones. No extra rail row on top of the FAQ.
- **FAQ (Startups + Decoder):**
  - Questions in H4.
  - The + / × icon is brand blue (20px).
  - Only the open answer sits in a soft rounded card; the questions have no background.
  - Dividers between items.

## Checked (localhost, placeholders at real sizes, Chromium)
- Build + lint clean, all routes ○.
- No horizontal overflow and no page errors on Startups, Decoder, Home, About, Investors and Pitch at 375 / 768 / 1280.
- **Stacking at 1280×800:**
  - The previous row stays pinned at 285px while Data Room MCP slides up.
  - When MCP reaches the heading, the heading and MCP move up together (heading bottom = MCP top).
- **Screens:**
  - Problem: the heading breaks at 1280 and at 768.
  - How It Works rows and radius look right at 375 / 768 / 1280.
  - The Perks tablet head row and the desktop top alignment look right.
  - The video rows are 1024 wide.
  - The FAQ shows the answer card only, with a blue icon.
  - Decoder testimonials are in the new frame.

## For Builder
```
Task: Drop 16 (Studio) — integrate + verify. Read docs/drops/drop-16.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks (project ROOT, "Replace all").
   New file: src/components/sections/BrandFrame.tsx.
2. npm run build && npm run lint (all routes ○).
3. /startups in a browser at 375 / 768 / 1280 / 1920:
   - 1280+: "Great founders lose" / "raises in due diligence." / "Not in the pitch." on 3 lines.
   - How It Works: blue grid row with #258BFF lines at the top and the bottom of the rectangle.
     Corner radius 48px at 1280+, 32px at 768, 12px at 375. No white grid row directly above or below it.
   - 1280+ with a mouse wheel: scroll through "Everything you need". When Data Room MCP arrives it stops under the
     heading (never slides under it), then heading + MCP scroll away together. Lines between rows stop at the rails.
   - No grid row between "Everything you need" and the AI Advisor. At 768 the AI Advisor heading is one run-on text.
   - Founder Perks: 1280+ heading level with the top of the cards; 768 heading left, "Claim your Perks" right.
   - Video: white grid rows above and below with rails at 1024 (1280+).
   - FAQ: blue + / × icons, H4 questions, only the open answer in a soft card.
4. /decoder-game: the testimonials rectangle has the same blue grid rows and radius. /investors stacking works as before.
5. No horizontal overflow on any route. Commit "Drop 16: Startups fixes, BrandFrame, stack pinLast, FAQ", push,
   add a docs/log.md entry (mind CRLF).
```
