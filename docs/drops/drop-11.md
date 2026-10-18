# Drop 11 — About: Why We Build, photo rows, Building Toward text, mobile Values slider

## Changes
- **Why We Build** (`AboutSections.tsx` Manifesto)
  - The whole headline is `text-h2-alt` with the audience gradient. "Why" is underlined in brand dark blue.
  - The section is centred on tablet and up, and left-aligned on mobile (headline and text).
- **Photo rows** (new `sections/AboutPhotos.tsx`, replaces `PhotoMosaic`)
  - 2 endless Marquee rows: row 1 moves left, row 2 moves right.
  - Each row is A B C + a copy of B. The copy and the loop clone are aria-hidden and not focusable.
  - Pace is 32px/s, the same as the logo strip (26–35px/s). The rows never stop, can be dragged and have no hover lift. Edges have no fade.
  - Clicking a photo opens a lightbox; dragging never opens it.
  - Photo sizes: 220×120 / 224×163 / 400×227 / 560×318, with gaps of 16 / 24 / 24 / 32px.
  - The current photos remain as placeholders.
- **Lightbox** (new `ui/Lightbox.tsx`)
  - Uses a native modal `<dialog>` on an ink backdrop.
  - Closes on Esc, ✕ or any click. Focus returns to the photo that opened it.
- **Marquee**
  - New props: `speed` (px/s), `reverse` and `fade`.
  - It now drags only after 5px of movement and swallows the click that ends a drag. The logo strips are unchanged (no new props).
- **Building Toward:** the text next to the icons is now `text-muted` (#696969, nearest to Figma #666).
- **Values, mobile only** (ValuesGrid)
  - The cards are now a DragScroll slider that breaks the rails.
  - The first card starts at the content padding, the next card peeks and runs off the right screen edge, and scrolled cards are cut at the left rail line.
  - Card 260px with a hairline and a 48px gap (Figma 1936:604). Tablet and laptop grids are unchanged.
- Copy: `photosUi` and `values.sliderLabel` (screen-reader labels) added in `content/marketing/about.ts`.
- `docs/design-system.md`: 4 rows added.

## Not done (waiting for designer files)
- Hero tablet/mobile backgrounds.
- The 2 hand-drawn Building Toward icons (Lucide placeholders stay; the other icons are Lucide).
- 5/10-year vision images.
- Final About photos.

## Note
The mobile Figma frame 1936:66 has different copy: "Why We Build", the eyebrow "Our purpose", and "To democratize…". Live-site copy is kept; the designer decides.

## Checked (localhost, placeholder images, by script)
- **Speeds:** photo rows -41 / +41px/s before the change to 32; logo strip 26–35px/s.
- **Lightbox:** a 150px mouse drag does not open it; a click opens it; Esc closes it and focus returns to the photo. Checked at 375 / 768 / 1280 / 1920.
- **Values slider at 375:**
  - The slider starts at x=9 (the inner edge of the rail) and ends at 375.
  - The first card is at 17, and each next card is 308px further.
  - A 230px drag snaps to card 2 (scrollLeft 308).
  - No horizontal page overflow.
- **Values borders:** 768 = 2-col, 1280/1920 = 3-col, as before.
- Headline Georgia italic, 28 / 38 / 44px, underlined. Mobile left-aligned, others centred.
- Build + lint clean, all routes ○, no page errors.
- Georgia italic and the real photos can only be judged on the live site.

## For Builder
```
Task: Drop 11 (Studio) — integrate + verify. Read docs/drops/drop-11.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks ("Replace all").
2. npm run build && npm run lint (all routes ○).
3. /about at 375 / 768 / 1280 / 1920:
   - "Why we Build." is all Georgia italic, with "Why" underlined. It is left-aligned at 375 and centred at 768+.
   - Photo rows: row 1 moves left, row 2 moves right, at about the same pace as the backers logo strip. They keep moving on hover and can be dragged.
   - Each row shows A B C B, repeating. Frames alternate blue/yellow.
   - Click a photo: the lightbox opens. Esc, ✕ or a click closes it.
   - A mouse drag on a row must NOT open the lightbox. Use real mouse down/move/up, not locator.click().
   - Building Toward: the "Not just a…" texts are grey (#696969).
   - Values at 375: horizontal slider. Card 1 is lined up with the heading; card 2 peeks at the right screen edge.
   - Values at 375, dragged: cards are cut at the left grid line. No horizontal page overflow.
   - Values at 768 / 1280+: grid as before.
4. Commit "Drop 11: About photo rows, lightbox, mobile values slider", push, add a docs/log.md entry (mind CRLF).
REPORT FOR STUDIO
Task: Drop 11  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
