# Drop 13 — fixes for the 2 failed Drop 12 checks

## Changes
- `styles/components.css`: `.audience-sticky` now has `pointer-events: none`. Links under the band area ("Know your score", "Fix the gaps") are clickable again. The pill keeps `pointer-events-auto`, so the tabs still switch.
- `content/marketing/home.ts:53`: the quote portrait is now declared 888×900, matching the real file (was 499×428). The laptop width cap uses this ratio, so Dasha stays inside the card at 1440 / 1680 / 1920.

## Checked (localhost, 888×900 placeholder, by script)
- **Band area:** at 375 / 768 / 1280 / 1440 / 1680 / 1920, `elementFromPoint` under the stuck band hits the content, not the band. The pill is still hit, and a tab click switches the audience.
- **Portrait top vs card top:** 375 = -24 (breaks out, as designed), 768 = 24px inside, 1280 / 1440 / 1680 / 1920 = 129 / 103 / 99 / 99px inside.
- Build + lint clean, all routes ○.

## Note for the designer
- Builder added "images" to `tsconfig.json` exclude, because a stray unzip put drop copies into `images/src/`. Delete `images/src` and unzip at the project root only.

## For Builder
```
Task: Drop 13 (Studio) — integrate + verify. Read docs/drops/drop-13.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks (project ROOT, "Replace all").
2. npm run build && npm run lint (all routes ○).
3. Home at 375 / 768 / 1280 / 1440 / 1680 / 1920:
   - With the switch stuck, real-mouse-click a link that sits under the band area, e.g. "Know your score" or "Fix the gaps". It must navigate or act.
   - Clicking the pill tabs still switches Startups / Investors.
   - Quote card, real 888×900 portrait:
     - 1280+: fully inside the blue card, no part above the top edge.
     - 768: inside.
     - 375: breaks out 24px above.
4. Commit "Drop 13: switch band click-through, portrait ratio", push, add a docs/log.md entry (mind CRLF).
   In "Requests for Studio", mark Drop 12 items 1 and 2 done.
   Item 3 (phone shift) waits for the designer's re-check on the live site.
   The About rail change (Values right rail stops beside the cards) shipped in Drop 12. Why We Build / Building Toward already have rails; their "missing" rails are part of the phone shift.
REPORT FOR STUDIO
Task: Drop 13  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
