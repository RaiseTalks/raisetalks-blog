# Drop 6 — Home hero badge: orbiting border

Source: designer's handoff artifact "Badge border animation" (Figma 3997:519, approved code version).

## Changes
- New Badge variant `eyebrow-orbit`. It's used **only** by the Home hero "AI NATIVE" badge (`PageHero eyebrowStyle="orbit"`). Every other hero eyebrow keeps the solid blue border.
- The border is a faint 1px track (`border-2` at 50%) with a soft blue patch (`brand-light-blue`).
  - The patch travels the pill outline by distance (`offset-path`, linear), so the speed is even all the way round.
  - One lap takes 4s.
- Patch length is 40px on mobile (badge 36px tall) and 56px from tablet up (badge 48px).
- Fallback: in browsers without `offset-path` shapes, and with reduced motion, it shows the static Figma gradient (new token `--gradient-orbit-static`).
- The CSS lives in `components.css → .border-orbit`, and tuning is done with `--orbit-duration` / `--orbit-size`.
- `/kit` shows the variant. design-system.md updated.

## Checked
- Build + lint clean, all routes ○.
- Frames 1s apart at 1920 and 375: the patch sits at bottom → left end → top → right end, i.e. an even quarter-lap per second.
- Reduced motion shows the static gradient.
- `/startups` hero still uses the plain badge.

## For Builder
```
Task: Drop 6 (Studio) — integrate + verify. Read docs/drops/drop-6.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks ("Replace all").
2. npm run build && npm run lint (all routes ○).
3. On localhost, check the Home hero "AI NATIVE" badge at 375 / 1920. The blue patch should circle the border at an even speed (4s per lap).
   - With reduced motion (DevTools → Rendering → prefers-reduced-motion) it should show a static gradient stroke.
   - Other pages' hero badges must be unchanged (solid blue border).
4. Commit "Drop 6: Home hero badge orbit border", push, add a docs/log.md entry (mind CRLF).
REPORT FOR STUDIO
Task: Drop 6  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
