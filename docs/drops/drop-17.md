# Drop 17 — Investors + sitewide (badge, banner rows, FAQ, Pricing "Coming soon")

## Changes
**Sitewide**
- **Banner rows:** the grid rows above and below the blue banner are 1024 wide on laptop+, like the banner (Figma 2187:82).
  - Investors and Startups banners.
  - About "Our 10-year goal": its section rails are now 1024 too, and the card spans them.
- **Website Badge** (Figma 4152:2642): new `Badge variant="website"` and token `ink-badge-border` #162B4A. Shown on /kit.
- **FAQ questions:** Medium 500 on mobile, Regular from tablet.
- **Pricing:** the "Coming soon" feature tags use the pulsing-dot badge, light and dark plans.

**Investors**
- **What You Get:**
  - Stacking removed. StackSection stays for Startups.
  - Laptop+: a 1px line between subsections only inside the rails. Tablet and mobile keep their grid rows.
- **Due Diligence:**
  - Q&A Log / Document Requests / Audit Trail use the Website Badge.
  - Area items ("Cap table…") are Body text.
- **Scoring & Committee:** tablet is an even 2×2. The 48px offset is laptop+ only.
- **Quote stats:**
  - Tablet and desktop: no dividers.
  - Mobile: white tiles, 2 + 1 full width (as Home Pitch).
- **Memo** (`MemoDoc` rebuilt, new `MemoWindow`):
  - Figma A4 design 876:5759 with the live content and a 2×2 team.
  - RaiseTalks wordmark top left, "NutriTrack" as text top right.
  - Light/dark tokens from Figma 876:5759 / 4154:3946.
  - A fixed 794px sheet that never reflows: CSS zoom fits it to the window (0.40 at 375, 0.70 at 768, 0.69 at 1280, 1 at 1920).
  - Sun/moon toggle pinned top right in the blue frame.
  - Score pills by grade (5 = very good, 4 = good, 3 = moderate).

## Checked (localhost, placeholders, Chromium)
- Build + lint clean, all routes ○.
- No horizontal overflow and no page errors on Investors at 375 / 768 / 1280 / 1920, and on Home / Startups / Decoder / Pitch / Kit / About / Pricing.
- **Memo:**
  - Light at the top, dark mid-scroll, end with rounded bottom + blue padding (1280).
  - Mobile is scaled, not stacked.
- Committee tablet 2×2 is even. Quote mobile tiles are correct. DD badges are dark navy. Pricing dark plan "Coming soon" has the dot. About goal card is at 1024.

## For Builder
```
Task: Drop 17 (Studio) — integrate + verify. Read docs/drops/drop-17.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks (project ROOT, "Replace all").
   New file: src/components/sections/MemoWindow.tsx.
2. npm run build && npm run lint (all routes ○).
3. Browser at 375 / 768 / 1280 / 1920:
   - /investors, /startups, /about: the grid rows right above and below the blue banner / goal card have rails at 1024 (1280+).
   - /investors "What You Get": no pinned heading / no stacking. 1280+: thin line between subsections only between the rails.
   - Due Diligence: dark navy badges; "Cap table · IP ownership…" in body size.
   - Scoring & Committee at 768: 4 equal tiles in a 2×2, no offset (offset only at 1280+).
   - Quote stats: no vertical dividers at 768+; at 375 two tiles + one full-width tile.
   - Memo: the sheet never stacks; at 375 it is scaled down as a whole. The sun/moon toggle (top right of the blue
     frame) switches light/dark and stays put while the memo scrolls. Scroll to the end: rounded bottom + blue padding.
   - FAQ (Startups, Decoder) questions weight 500 at 375, 400 at 768+.
   - /pricing: "Coming soon" tags have the pulsing blue dot. /kit shows the new dark "Q&A Log" badge.
   - No horizontal overflow on any route.
4. Commit "Drop 17: Investors (no stacking, HTML A4 memo light/dark), Website badge, banner rows, FAQ, Pricing dots",
   push, add a docs/log.md entry (mind CRLF).
```
