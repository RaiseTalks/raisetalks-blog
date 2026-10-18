# Drop 20 — Home quote portrait: blue side fade removed

Studio files only. Apply AFTER Drop 19 (tokens.css contains the Drop 19 overlay token). Unzip at the ROOT → "Replace all".

## What changed
- `Testimonial.tsx` (Home founder quote 3257:1122): removed the overlay span with the inset blue shadow that faded the
  old placeholder portrait into the card. Its blur also painted blue strips down both sides of the portrait, which
  showed above the card on mobile where the portrait breaks out. The final cut-out needs no fade.
- `tokens.css`: removed the now-unused `--fade-portrait` token.

## Studio QA
Build + lint clean. 375 / 768 / 1280: portrait shows exactly as the file, no blue strips; mobile breakout unchanged
(24px above the card), tablet inside the card, laptop bottom-left as before.

## For Builder
```
TASK: Integrate Studio Drop 20 (Home quote portrait: blue side fade removed).
The designer has unzipped drop-20.zip at the project root (after Drop 19). Read docs/drops/drop-20.md. Do NOT edit Studio files.

1. npm run build + npm run lint must pass. All routes static.
2. QA on a production build (Chromium), Home founder quote card at 375 / 768 / 1280 / 1920:
   - No element with box-shadow var(--fade-portrait) remains; the portrait has no blue strips at its sides
     (screenshot the card at 375 and 1920 for the designer).
   - Portrait position unchanged: 375 = top 24px above the card, 768 = inside the card, 1280+ = bottom-left, ~36px
     inside the card top at 1440 / 1680 / 1920.
   - No page errors, no horizontal overflow.
3. docs/log.md: Drop 20 entry. Commit + push.

REPORT FOR STUDIO
Task: Drop 20  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
Plus: the measurements above and the screenshot paths.
```
