# Drop 15 — Home, About, Decoder + sitewide fixes

## Changes
**Sitewide**
- **Tokens** (`styles/tokens.css`):
  - Strokes and dividers: `border-1` #E0E5EB on white, `border-2` #EBEBEB on grey.
  - Rails got their own tokens: `rail-1` #EBEBEB, `rail-2` #DEDEDE, `rail-on-brand` #258BFF. Band, GridGap, the hero/sign-in/legal columns and the stack lines use them.
  - Hover: new `card-alt-hover` #F9F9F9 for grey surfaces, and `--duration-card-hover` 500ms on every card/item hover.
- **Icons:** `<Icon>` has no `size` prop any more. Every content icon is 32 / 36 / 42px with a 2.5 / 2.5 / 3px stroke (Figma 3488:7675).
- **H4 headings** on mobile are Medium 500 (Figma "Type/M/H4 Bold"). H3 stays 24px on mobile, per the style guide 4050:1700.
- **CTA band:** buttons in one row; on a too-narrow phone they wrap to 2 full-width rows. The inner-page hero buttons stay stacked on mobile.
- **FAQ:** closed questions have no background and a divider between them; the open one is a soft card. Applies to Startups and Decoder.

**Home**
- The switch band opens on Startups (`?for=investors` still works).
- MCP "Know your score" has the new text.
- **Pitch Competitions:**
  - The 3 stats sit in one row on laptop+, 32px apart.
  - "Average / Response time" is on 2 lines.
  - Item titles are H4 (Medium on mobile), 8px above the text (was 12).

**About**
- Our Backers & Partners is an edge-to-edge strip like the Home hero logos: no rails, no grid row above. Its title stays.

**Decoder**
- "One Chip – One Bet" is on one line at every width.
- Founder / Investor / Operator are in the fact-value font (Georgia italic, dark blue).
- The photo strip has no edge fade.
- **What People Are Saying:**
  - Now a rounded blue rectangle, 8px in on mobile and 12px from tablet, with rails at the page rails in #258BFF.
  - Cards in the How It Works style, plus the 4px dark-blue bottom edge.
- Startups How It Works cards get the same 4px edge and the #258BFF rails.
- **Join us as Co-Host:** the heading and button align with the top of the cards. Icons are standard size.

## Not in this drop
- TV section video: the designer delivers it with the image assets. My sandbox can't download it, so Builder will compress it later.
- The 2 hand-drawn About icons: the designer delivers them as pre-coloured SVG.
- Startups and Investors fixes: the designer's next list.

## Checked (localhost, placeholders at real sizes, Chromium)
- Build + lint clean, all routes ○. No horizontal overflow and no page errors on Home, About, Decoder, Startups, Investors, Pricing, Pitch, Sign-in and Legal at 375 / 768 / 1280.
- **Home:**
  - 1280: the 3 stats sit in one row.
  - 375: the CTA band buttons fit in one row.
  - 375: the pitch titles are Medium with an 8px gap, and the card icons are 32px with Medium titles.
- **Decoder:**
  - 375: the chip heading is on one line.
  - 1280: the testimonials sit in the rounded rectangle with blue rails, and the co-host heading is top-aligned.
  - 1280: the FAQ shows straight dividers, with only the open item as a card.
- **About:** the backers strip runs edge to edge with no rails.

## For Builder
```
Task: Drop 15 (Studio) — integrate + verify. Read docs/drops/drop-15.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks (project ROOT, "Replace all").
2. npm run build && npm run lint (all routes ○).
3. Check in a browser at 375 / 768 / 1280 / 1920:
   - Home opens on the Startups view. /?for=investors opens Investors.
   - Content icons are 32 / 36 / 42px (375 / 768 / 1280+). DevTools: svg.icon-std width.
   - Mobile card titles (e.g. "Investor-Ready Data Room") have font-weight 500. At 768+ they are 400.
   - The dark CTA band above the footer shows its buttons in one row at 768+. At 375 they are either one row,
     or two full-width rows if they don't fit. Inner-page hero buttons are still stacked at 375.
   - Card borders and dividers are #E0E5EB (white) / #EBEBEB (grey). Rails are still #EBEBEB / #DEDEDE.
   - About: Our Backers & Partners strip runs edge to edge with no rails and no grid row above it.
   - Decoder: "What People Are Saying" is a rounded blue rectangle with #258BFF rails. Cards have a
     4px dark-blue bottom edge. The FAQ has dividers between closed questions and a card only for the open one.
   - No horizontal overflow on any route.
4. Commit "Drop 15: Home/About/Decoder fixes, divider + rail tokens, standard icons, FAQ, CTA row", push,
   add a docs/log.md entry (mind CRLF).
```
