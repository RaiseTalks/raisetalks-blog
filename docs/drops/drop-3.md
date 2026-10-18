# Drop 3 — shared basics from RaiseTalks TV (buttons, navbar, motion)

Style reference: the RaiseTalks TV repo (Oct 2026). .com keeps its own rails, badges, colours, content and images.

## Changes
- **Buttons**: no lift on hover. The gradient glides, the lip/border changes colour, and nothing moves (TV rule).
  - `outline` variant and `nav` size removed: the navbar Login + sign-in social buttons now use `ghost`, as on TV.
  - The `external` / auto-`<a>` link handling is kept.
- **Navbar**: at the top of the page it is unchanged (announcement bar + full-width glass bar, bottom hairline, shadow).
  - After 24px of scroll it morphs smoothly (500ms, new token `--duration-header`) into the TV floating bar.
  - The floating bar lines up with the grid rails (8 / 48 / 32px, centred 1480 from 1680) and sits 12px from the top (16px from tablet up).
  - It gets `rounded-md`, `glass-strong` and a compact 52px height.
  - The sticky box keeps its height, so content never jumps.
  - The rules live in `components.css → .site-header`, and `HeaderShell` sets `data-scrolled`.
- **Nav links**: TV hover. Text goes subheadline → headline, and a 1px light-blue line draws in from the left and exits right (350ms). The current page stays SemiBold.
- **Nav buttons**: Login = ghost sm, Try it Free = primary sm (both `text-body`), as on TV.
- **MobileMenu**: TV rounded panel under the bar with the clip "unfold" (`motion/dropdown.ts`).
  - It closes on an outside tap, on Escape (focus returns to the button) and on a link click.
  - The toggle has a 44×44 hit area.
  - The panel lines up with the rails (top of page) or with the floating bar (scrolled).
- **Reveal**: `immediate` prop ported from TV (unused for now).
- **Motion tokens**: already identical to TV. Only `--duration-header` was added.
- **Footer link hover**: already the TV pattern (chip + colour, 250ms), so no change.
- `/kit` button group updated.

## Flags
1. The floating bar keeps .com's `--shadow-nav` (TV has none). On a white page it disappears without it. Say if you want it off.
2. On mobile, "Try it Free" stays in the bar (current .com). On TV, both actions are inside the menu.

## Checked
Build + lint clean. Header at 375 / 768 / 1280 / 1920, top + scrolled, menu open at top + scrolled, Escape focus. No page errors.
