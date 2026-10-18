# Drop 5 — floating navbar: TV padding + lighter glass

## Changes
- **Floating bar (scrolled) only**: inner padding is now the same as RaiseTalks TV, 16px (24px from laptop).
  - Height: 72px on mobile/tablet, 88px from laptop (40px buttons + padding).
  - The top-of-page bar is unchanged (58 / 60px, Figma).
  - The sticky box keeps 58 / 60px, so the taller floating bar overlaps the content under it and nothing jumps.
- **Glass** (navbar-only tokens):
  - `--color-glass` 72% → 66% white (top bar).
  - `--color-glass-strong` 90% → 78% white (floating bar).
  - `--blur-glass` 16 → 20px.
  - Contours underneath show through blurred, and nav text stays readable.
- `--shadow-nav` kept on the floating bar (designer decision).
- docs/design-system.md motion table updated.

## Checked
Build + lint clean, all routes ○. Measured floating bar: 1480×90 at 1920 (16px from top), 1216×90 at 1280, 359×74 at 375 (12px from top). These sizes include the 1px border.
Readability was checked over the Home H1 and the blue statement banner. Photos aren't in the sandbox, so please judge the bar over the hero image on the live site.

## For Builder
```
Task: Drop 5 (Studio) — integrate + verify. Read docs/drops/drop-5.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks ("Replace all").
2. npm run build && npm run lint (all routes ○).
3. On localhost, scroll Home, /startups, /about at 375 / 1280 / 1920.
   - Floating bar height: 74 / 90 / 90 (incl. border).
   - The text must be readable over the hero photos and the blue banners, with no content jump.
4. Commit "Drop 5: floating navbar TV padding, lighter glass", push, add a docs/log.md entry (mind CRLF).
REPORT FOR STUDIO
Task: Drop 5  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
