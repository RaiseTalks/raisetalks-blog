# Drop 12 — Home: quote portrait, switch band, MCP tablet slider, TV tablet, footer mark + mobile shift fix

## Changes
- **Quote card portrait** (`sections/Testimonial.tsx`)
  - Laptop+: Dasha fills her column width, capped at the card height minus the 36px top padding (container query). She stays inside the blue card at every width.
  - Tablet stays inside the card (as before). Mobile still breaks 24px above the card.
- **Audience switch** (`sections/AudienceSwitch.tsx`, `styles/components.css`)
  - The white glass background and bottom hairline are gone. Only the pill is sticky, and it gets the navbar shadow when stuck.
  - It sits 24px under the floating navbar at all breakpoints.
  - The band no longer catches clicks.
  - Removed the Drop 10 laptop compaction and its 64px compensation; it isn't needed without a visible band.
- **MCP tablet slider** (`sections/McpSection.tsx`, `ui/DragScroll.tsx`)
  - Card 3 is reachable and ends at the panel's right padding: a 32px trailing spacer on tablet only.
  - DragScroll settles on min(card offset, max scroll). This fixes the snap back to card 2 after a mouse drag, and applies to all card sliders.
  - Mobile is unchanged.
- **TV teaser, tablet** (`sections/TvTeaser.tsx`): "Cinema is the method…" is right-aligned, ending at the right padding. Laptop and mobile are unchanged.
- **Footer 3D mark** (`layout/SiteFooter.tsx`)
  - 2x: 147 → 294px at laptop, 200 → 400px at desktop.
  - Laptop grid is `[auto_max-content_max-content_1fr]`, so link labels stay on one line. Desktop grid is `[auto_1fr_1fr_2fr]`.
  - Tablet/mobile wordmark unchanged.
- **Mobile "page shifted left"** (Builder report, real phone only; `app/globals.css`)
  - I couldn't reproduce it in Chromium either: an audit of 8 routes at 375 found no element past the screen edge without a clipping parent. So it's most likely WebKit.
  - Safety net: `html { overflow-x: hidden; overflow-x: clip }` and `body { overflow-x: clip }`. The page can no longer pan sideways.
  - `clip` creates no scroll container, so sticky navbar and switch still work (checked). The `hidden` fallback is on html only, because on body it would break sticky.
  - Missing rails in Why We Build / Building Toward on the phone are the same shift: both already use Band with rails at 8px, as the other sections do.
- **About Values, mobile** (`AboutSections.tsx`): the slider has `bg-page`, so the right rail now stops beside the cards (left rail full height, right rail beside heading and intro only). Tablet+ unchanged.
- `docs/design-system.md`: the switch row was rewritten and 5 rows added.

## Checked (localhost, placeholder images, by script)
- **Pill when stuck:** top 110 / 114 / 130px with navbar bottom 86 / 90 / 106 at 375 / 768 / 1280+, so the gap is 24px everywhere. Band background is transparent; pill shadow = nav shadow.
- **Portrait top inside the card:** 129 / 79 / 36 / 36px at 1280 / 1440 / 1680 / 1920. 768: 24px inside. 375: -24px (above the card).
- **MCP 768:** two mouse drags reach scrollLeft 513 (= max). Card 3 right = 654, panel padding line = 655.
- **TV 768:** paragraph right = content right (679), text-align right.
- **Footer mark:** 293 × 206 at 1280 and 294 at 1440; 400 × 280 at 1680 / 1920. No link wraps at 1280.
- No horizontal overflow, no page errors. Build + lint clean, all routes ○.
- The real portrait cut-out can only be judged on the live site.

## For Builder
```
Task: Drop 12 (Studio) — integrate + verify. Read docs/drops/drop-12.md only. (If Drop 11 is not integrated yet, do it first.)
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks ("Replace all").
2. npm run build && npm run lint (all routes ○).
3. Home at 375 / 768 / 1280 / 1920, both Startups and Investors:
   - Scroll into MCP. Only the switch pill stays sticky: no white/glass band and no hairline behind it.
   - The stuck pill has the navbar shadow. It sits 24px under the floating navbar's bottom edge at every width.
   - Content behind the band area stays clickable. It still lets go at the top of Spend Less Time.
   - Quote card: at 1280 / 1440 / 1680 / 1920 Dasha is fully inside the blue card (no part above the top edge). At 375 she breaks out above the card.
   - 768 MCP slider: drag with a real mouse (down/move/up) twice. It reaches card 3, whose right edge lines up with the panel's right padding. Also check a touch swipe if possible.
   - 768 TV teaser: "Cinema is the method…" is right-aligned at the right padding.
   - Footer 1280 / 1920: the 3D mark is 2x (≈294px / 400px wide). Company/Platform links on one line. Tablet/mobile wordmark unchanged.
   - /about values slider (375) still snaps and reaches the last card. No right rail beside the cards; it is visible beside the heading and intro.
   - All routes at 375: computed html overflow-x = clip; the navbar and switch pill still stick.
   - Ask the designer to re-check the "shifted left" phone issue on the live site after deploy (hard refresh). Report the phone model and browser if it persists.
4. Commit "Drop 12: home switch pill, quote portrait, MCP tablet, TV tablet, footer mark", push, add a docs/log.md entry (mind CRLF).
REPORT FOR STUDIO
Task: Drop 12  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
