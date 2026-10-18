# Drop 8 — Home audience group (Startups + Investors)

Ships in one zip with Drops 7 + 9.

## Changes
- **Structure**: `AudienceSwitch` now takes `{ group, tail }` per audience.
  - `group` = MCP + cards + the grid gaps. The switch travels with it.
  - `tail` = Spend Less Time.
- **Sticky switch band**: header glass (`glass-strong` + blur), sticky 48px under the floating navbar.
  - `.audience-sticky` top is 134 / 138 / 154px. Derivation: 12+74 / 16+74 / 16+90 + 48.
  - It lets go exactly at the top of Spend Less Time, on the way down and up.
  - While stuck it gets the navbar hairline + nav shadow.
  - The band shape is unchanged. Pill left-aligned on tablet, centred on mobile and laptop.
- **MCP**:
  - No top padding.
  - Below 1280 the 3 steps are a draggable slider inside the grey panel (75% wide on mobile, 65% on tablet; the next step peeks; hairline dividers like desktop).
  - Panel top padding: 96px mobile, 128px tablet.
  - Mobile: icons centred and stretched across the panel with 64px each side.
- **Cards** ("Investors decide fast" / "IC decision"):
  - Investors now uses the grey tone + grey lines (`home.ts` tone "alt"), same as Startups.
  - Headline, text and buttons are left-aligned below 1280 (centred from laptop).
  - Full-width buttons on mobile.
- **AI Readiness Score icon**: Figma uses the same `list-todo` icon. Its straight lines were invisible because the audience gradient used each shape's own box, and a flat line has no height. `Icon` now spans the gradient over the 24px icon box (`userSpaceOnUse`), which fixes every icon with straight strokes.
- **Spend Less Time**, tablet + mobile: headline, text and button centred on top, image centred underneath. Laptop unchanged.

## Flag
On laptop the switch band keeps its 64px padding (174px tall). While stuck it covers about 330px of the screen. Designer to decide whether to compact it while stuck.

## Checked
- Sticky release at 1920 / 1280 / 768 / 375.
- Mouse drag on the MCP slider settles on a step.
- No horizontal overflow, no page errors.
