# Drop 7 — Home: hero, quote card, sliders, scroll-to-top

Ships in one zip with Drops 8 + 9.

## Changes
- **Every page change starts at the top.**
  - Cause of the bug: html smooth scrolling made Next.js's own navigation scroll animate and land 470–725px down.
  - Fix: `data-scroll-behavior="smooth"` on `<html>` (`src/app/layout.tsx`), so Next turns smoothing off during page changes.
  - Plus `components/layout/ScrollToTop.tsx` in the marketing layout.
  - Links to `#section` and browser Back/Forward keep their normal behaviour.
- **Home hero, mobile**: the eyebrow → buttons group has 96px top/bottom padding (`PageHero columnClassName`).
- **Daria quote card** (`Testimonial`):
  - Laptop+: a 2-column grid (portrait | panel ≤ 866px / 64%). The portrait sits flush bottom-left, fits its column and overlaps the panel by exactly 24px. This fixes the 1280 break.
  - Mobile: portrait 280px wide, starting 24px above the card. The background moved into its own clipped layer so the portrait can break out.
  - Tablet: unchanged.
- **Slider rule (all sliders)**: never pause on hover, drag left/right with mouse or finger.
  - New `components/motion/Marquee.tsx` (JS-driven endless strip; reduced motion = no auto-move, drag still works). Used by the Home/About logo strip and the Decoder photo strip.
  - The old CSS `.marquee` animation is removed.
  - New `components/ui/DragScroll.tsx` for card sliders (used in Drop 8).

## Checked
- About/Pricing/Startups (also from mid-page) → logo → Home: scrollY 0 at 1920 and 375. Back restores the old position.
- Portrait overlap 24px / flush bottom-left at 1920; at 375 the portrait top is 24px above the card.
- Marquee keeps moving while hovered; a +300px mouse drag moves it.
