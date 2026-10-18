# Drop 9 — Home: RaiseTalks TV, Pitch, footer

Ships in one zip with Drops 7 + 8.

## Changes
- **RaiseTalks TV** (`TvTeaser`, one grid placed per breakpoint):
  - Laptop: the left column is logo → headline → lines → button. The button sits 64px under the lines at natural width. Cards on the right.
  - Tablet: headline | lines in one row, cards 2×2, full-width button at the bottom.
  - Mobile: headline and lines stacked, cards 2×2, full-width button at the bottom.
- **Pitch** (`PitchTeaser`):
  - Tablet: the 3 stats are left-aligned, 64px apart.
  - Mobile (Figma 1405:677): stats are white bordered tiles (2 + 1 full width). Item titles use SemiBold body type, item text regular body.
- **Footer**:
  - The desktop text wordmark is removed, leaving only the 3D mark (now carrying the alt text).
  - Tablet/mobile keep their wordmark row, which is their only logo. Designer to confirm.
- **Newsletter** Subscribe button: regular weight.

## Checked
TV button gap 64px / 239px wide at 1920; 2×2 cards at 768 and 375.

## For Builder (Drops 7 + 8 + 9)
```
Task: Drops 7+8+9 (Studio) — integrate + verify. Read docs/drops/drop-7.md, drop-8.md, drop-9.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks ("Replace all").
2. npm run build && npm run lint (all routes ○).
3. npm start + node scripts/screens.mjs at 375/768/1280/1920, no page errors, no horizontal overflow. Check:
   a) From /about, /pricing and mid-page /startups, click the logo → Home must be at scrollY 0. Browser Back must restore the previous position.
   b) Home quote card:
      - 1280/1920: portrait flush bottom-left, overlapping the glass panel by 24px.
      - 375: Daria's head ~24px above the blue card.
      - Check with the real photo.
   c) Logo strip (Home, About) and Decoder photo strip: keep moving on hover, draggable with the mouse.
   d) Home switch band, on both Startups and Investors:
      - Sticks 48px under the floating navbar through MCP + cards.
      - Lets go at the top of Spend Less Time.
      - Pill left-aligned on tablet.
   e) MCP at 768/375: steps slide and drag inside the grey panel. 375: icons centred with 64px each side.
   f) Investors cards section has the grey background. "AI Readiness Score" icon shows all its lines.
   g) TV / Pitch / footer layouts as described in drop-9.md.
4. Commit "Drops 7-9: Home fixes (scroll-to-top, sliders, sticky switch, layout)", push, add a docs/log.md entry (mind CRLF).
REPORT FOR STUDIO
Task: Drops 7-9  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
