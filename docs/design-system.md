# Design system — RaiseTalks (light)

Source of truth: `src/styles/tokens.css`. This page explains the rules; values live there.
Live preview: the `/kit` style guide was removed before handoff.

## Colour
| Role | Token | Value |
|---|---|---|
| Page | `page` | #FFFFFF |
| Grey section | `section-alt` | #F7F7F7 |
| Card on white / on grey | `card` / `card-on-alt` | #F7F7F7 / #FFFFFF |
| Card hover on white / on grey surfaces | `card-hover` / `card-alt-hover` | #FCFCFC / #F9F9F9 (500ms, `--duration-card-hover`) |
| Strokes & dividers on white / on grey (card borders, lines between cards, FAQ dividers — everything that is not a rail) | `border-1` / `border-2` | #E0E5EB / #EBEBEB (designer, Drop 15) |
| Rails on white / on grey (column lines, grid rows, hero column, stack lines) | `rail-1` / `rail-2` | #EBEBEB / #DEDEDE |
| Rails on the blue rounded bands | `rail-on-brand` | #258BFF (Figma 2601:7855) |
| Headline / subheadline / body / muted | `headline` `subheadline` `copy` `muted` | #000 / #1A1A1A / #333 / #696969 |
| Brand | `brand-dark-blue` `brand-light-blue` `brand-yellow` `brand-pink` | #003687 #0077FF #FFAB0E #EA2640 |
| Link hover | `accent-hover` | #0062D6 |
| Dark bands (CTA, TV) | `ink` `ink-raised` `ink-border` `ink-copy` `ink-muted` | #0C1B31 #0F223D #16315A #CCC #738AAA |
| Status | `good*` `moderate*` `bad*` | Figma "Grading System" (light) |

Gradients: `--gradient-brand` (blue), `--gradient-accent` (yellow→red), footer = brand.
**Audience accent:** `[data-audience="founders"]` swaps `--audience-*` to the accent gradient
(Home switch). Default = investors = blue. Utility: `.text-gradient-audience`.

**Rule: the style-guide frames win over Figma variables and over values drawn in frames.** So muted = #696969 (variable says #6D6D6D). Rails = `rail-1` #EBEBEB; strokes/dividers = `border-1` #E0E5EB (designer decision, Drop 15).

**Icons** (Figma icon frame 3488:7675): every content icon via `<Icon>` = 32 / 36 / 42px (mobile / tablet / laptop+),
stroke 2.5 / 2.5 / 3px real pixels (`.icon-std`). Lucide, except the 2 hand-drawn About icons (designer delivers SVG).

**Type:** card subheadlines (H4 headings) on mobile = Poppins Medium 500 (Figma "Type/M/H4 Bold"); H4 tablet/desktop 400. H3 mobile 24px per the style guide.

## Type (Poppins self-hosted + Georgia Italic system font)
| Utility | Mobile / Tablet / Desktop |
|---|---|
| `text-eyebrow` | Poppins 700 uppercase 13 / 14 / 16, lh 1.4 |
| `text-h1` / `text-h1-alt` | 32/48/60 · Georgia italic 34/50/62 |
| `text-h2` / `text-h2-alt` | 26/36/42 · 28/38/44 |
| `text-h3` / `text-h3-alt` | 24/28/30 · 26/30/32 |
| `text-h4` | 17/19/20 |
| `text-body` / `text-footnote` | 14.4 / 12 all widths (600 = "bold" variants) |
Headline pattern everywhere: Poppins line + Georgia-italic line in accent colour.

## Layout
- Content column 1480 (`max-w-content`), medium 1024, narrow 896.
- **Grid-line rhythm** (signature of this site): sections are full-width bands; the 1480
  column has 1px `border-1` lines left and right; sections are separated by an empty
  bordered row 64 / 48 / 32px (desktop / tablet / mobile). On dark bands lines are `ink-border`.
- Spacing scale 4 8 12 16 24 32 48 64 90 128. Radius 2 4 8 12 16 full.
- Small Figma slips (padding/radius off-scale) → snap to the nearest token, list in the drop.
- **1024 sections** (Drop 14): `<Band width="medium">` puts the rails at 1024 from laptop up, centred like
  the hero column. Used for the Investors/Startups banners, the Startups video, every FAQ.
- **Pinned heading + stacking cards** (Drop 14, `StackSection`, laptop+ only): the heading band sticks
  under the floating navbar with its vertical padding halved (64 → 32), and each subsection sticks under
  it while the next one slides over it. A subsection taller than the screen holds with its bottom at the
  screen bottom. The section is grey outside the rails, and the subsections can be white inside (Investors
  "What You Get", Startups "Everything you need"). Tablet and mobile keep the normal flow.
- **Mobile buttons:** inner-page heroes stack their buttons full width below 768 (Drop 14); the Home hero keeps
  its row. The dark CTA band keeps one row; on a phone too narrow for both they wrap to 2 rows, full width (Drop 15).
- **FAQ** (Drop 15): no background on closed questions, a divider line between them; only the open one is a soft card.
- **Blue rounded bands** (`BrandFrame`: Startups How It Works, Decoder What People Are Saying): 8px in from the screen
  edge on mobile, 12px from tablet; radius 12 / 32 / 48px (`rounded-md` / `rounded-2xl` / `rounded-3xl`); a blue grid
  row with `rail-on-brand` lines at top and bottom (Figma 2191:118); cards translucent dark blue with a 4px dark-blue
  bottom edge. No white grid rows around them.
- **Stacking** (`StackSection`): `pinLast` = the last subsection stops under the pinned heading and leaves with it;
  `outerLines={false}` = lines between subsections only between the rails (Startups, Drop 16).
- **FAQ** (Drop 16): questions in H4 with a brand-blue + / × icon; only the open answer sits in a soft card.

## Motion (slow and subtle)
| What | Spec |
|---|---|
| Entrance | opacity 0→1, y 16→0, 700ms `--ease-soft`, once, 20% visible |
| Groups | children staggered 150ms |
| Button hover | no movement (as RaiseTalks TV); gradient stops glide 450ms (`@property`), lip colour 300ms |
| Navbar scroll | after 24px: full-width bar → floating bar on the rails, 12/16px from top, `rounded-md`, `glass-strong` (78% white, 20px blur, nav shadow kept), TV padding 16 / 24px (72 / 88px tall); 500ms `--duration-header` |
| Nav link hover | text subheadline → headline + 1px light-blue line draws in from the left, exits right, 350ms |
| Mobile menu | rounded panel under the bar, clip "unfold" 280ms open / 180ms close (`motion/dropdown.ts`); closes on outside tap / Escape |
| Sliders (all) | never pause on hover; drag left/right with mouse or finger. Endless strips = `motion/Marquee` (JS, reduced motion = no auto-move); card sliders = `ui/DragScroll` (native scroll + snap + mouse drag, next card peeks) |
| Marquee options | `speed` px/s (default: one row per `duration` s), `reverse` moves right, `fade={false}` drops the edge mask. A drag >5px never fires a click inside; a tap/click does (About photo rows) |
| Lightbox | `ui/Lightbox`: native modal `<dialog>`, `backdrop:bg-ink/90`, photo `object-contain`. Closes on Esc, ✕ or any click; focus returns to the opener |
| About photo rows | 2 Marquee rows, row 1 left / row 2 right, each A B C + copy of B, 32px/s (logo-strip pace), no fade, no hover lift, click = lightbox. Photo 220×120 / 224×163 / 400×227 / 560×318, gap 16 / 24 / 24 / 32 |
| About values (mobile) | DragScroll from the left rail line to the right screen edge (`-ml-2 -mr-[17px]`), first card at the content padding. Card 260px (212 text + 48), hairline right, 48px gap (Figma 1936:604). Tablet/laptop grid unchanged. Slider `bg-page`: the right rail stops beside the cards |
| Home audience switch | transparent sticky band (no glass, no hairline): only the pill shows, 24px under the floating navbar (`.audience-sticky` top 86 / 82 / 66px = navbar bottom 86 / 90 / 106 + 24 − band padding 24 / 32 / 64). Lets go at the top of Spend Less Time. While stuck the pill gets `--shadow-nav`. Band ignores the pointer, pill doesn't. Drop 10 laptop compaction removed (Drop 12) |
| Home quote card portrait | laptop+: fills its column width, capped at the card height minus 36px top padding (container query), so it stays inside the blue card. Tablet: on top, inside. Mobile: breaks 24px out above the card |
| Footer 3D mark | 2x (Drop 12): 294px at laptop, 400px at desktop. Grid laptop `[auto_max-content_max-content_1fr]` (links on one line), desktop `[auto_1fr_1fr_2fr]`. Tablet/mobile wordmark unchanged (16px) |
| Card sliders: last card | DragScroll settles on min(card offset, max scroll), so the last card is always reachable. MCP tablet: 32px trailing spacer, card 3 ends at the panel's right padding. Mobile unchanged |
| TV teaser tablet | the lines ("Cinema is the method…") right-aligned, ending at the right padding. Laptop/mobile left |
| Page overflow | `html { overflow-x: hidden; overflow-x: clip }`, `body { overflow-x: clip }`: safety net against sideways panning on phones. Never `hidden` on body (breaks sticky) |
| Page change | always starts at the top (`data-scroll-behavior="smooth"` on `<html>` + `layout/ScrollToTop`); #links and Back/Forward excluded |
| Card hover | bg → `card-hover`, 300ms, no lift |
| Accordion | height + opacity 350ms, + rotates to × |
| Links / nav | colour 250ms |
| Reduced motion | all off (global) |

## Buttons (identical to RaiseTalks TV, Figma 4042:648)
`variant`: primary (blue gradient) · alternative (yellow→red gradient) · secondary · ghost (outline; text inherits → dark on white, white on ink) · danger.
`size`: sm · md · lg (navbar = sm + `text-body`). 3px darker bottom lip. Disabled 50%. No lift on hover.
(`outline` variant and `nav` size removed in Drop 3: navbar + sign-in now use ghost, as on TV.)

## Badges (Studio design — none in Figma for RaiseTalks)
All pills (rounded-full), like the Figma "AI NATIVE" and "Coming soon" chips:
`eyebrow` (blue outline, eyebrow type) · `neutral` (white, border-1, footnote; optional live dot) ·
`eyebrow-orbit` (Home hero "AI NATIVE" only: faint track + blue patch orbiting at an even speed, 4s lap,
Figma 3997:519; reduced motion = static Figma gradient) · `accent` (blue-pill fill, dark-blue semibold) · `highlighted` (white + yellow→red stroke that slowly
travels round the pill) · `good` / `moderate` / `bad` (Grading System) · `website` (**the RaiseTalks Website Badge,
Figma 4152:2642**: `ink-border` #16315A fill, `ink-badge-border` #162B4A border, white Body text, 12/6px — use it for
tags/labels, e.g. Investors DD). "Coming soon" = `neutral` + `dot` (Home Pitch, Pricing features). (The /kit style guide was removed before handoff.)

**Banner rows rule** (Drop 17): on inner pages the grid rows directly above and below the blue banner/goal card take
the banner's width (`GridGap width="medium"` with `Band width="medium"`): rails at 1024 on laptop+ (Figma 2187:82).

**Investors memo** (`MemoDoc` + `MemoWindow`): platform look, not website tokens — `--m-*` vars on `.memo`
(components.css), light = Figma 876:5759, dark = 4154:3946; fixed 794px sheet, zoomed down to fit, never reflows.

## Images (Drop 18)
- **Art direction:** `ui/ArtImage` → `ArtFill` (backgrounds, like `<Image fill>`) and `ArtSized` (in-flow image whose shape
  changes per breakpoint). One file per breakpoint: desktop = laptop+, tablet = 768–1279, mobile = <768; a missing tablet
  file falls back to desktop, a missing mobile file to tablet. Built on `getImageProps`, so everything stays optimized.
- **Shared backgrounds** live in `content/marketing/shared.ts → art`: `heroAlt` (every hero except Home), `bandWide` /
  `band` (blue band under the hero on the 1480 / 1024 column), `panel` (blue panels), `cta` (dark CTA band). Components
  default to them; pages don't pass their own background any more.
- Declared width/height = the real file (docs/assets.md). SVGs are served as-is (no optimizer).

## Drop 23 rules (designer)
- **Card dividers on white** = `divider-1` (#F0F2F5): hairlines BETWEEN the cells of a divider grid (no card box), lighter
  than the rail (#EBEBEB), like `border-2` vs `rail-2` on grey. Card outlines keep `border-1`; on grey keep `border-2`.
- **Mobile inner line** (< 768) = band padding + `--spacing-inner` (20px, the mobile card padding). Loose text
  (headings, paragraphs, buttons, FAQ, divider-grid cells) uses `max-tablet:px-inner` (cells `px-inner`); a slider's first
  card starts there too (`px-7 scroll-px-7` = 8 + 20 on a `-ml-2` slider). Cards with a box stay at the band padding.
  Tablet sliders on blue frames: band padding + tablet card padding (32 + 24 = `px-14`).
- **H4 Alt** = H4 + 2px at every breakpoint (19 / 21 / 22), like h1–h3 alt.
- **Grid rows (double lines) always run edge to edge** (Drop 24, designer); only the vertical rails follow the
  column width (`GridGap width="medium"` = rails at 1024). The Drop 23 `lines="column"` option is gone.
- **Hero column = 1024** on every page (`--container-hero`, Drop 24).
- **Hero intro** (every PageHero, default on since Drop 24; legal heroes too): `PageHero intro` — CSS-only sequence (`.hero-intro-*` in components.css): headline, text, buttons,
  background, eyebrow + logo strip, 120ms apart, fade + 8px blur + 8px rise, 700ms. Off with reduced motion.
- **Images are served as supplied** (no Next re-compression, `images.unoptimized` in next.config, Builder).

## Snapped values (Figma slips → nearest token)
Large panel radius 24 → 16 (`rounded-lg`) · hero column line 1.5px → 1px · pill switch bg #F6F7F9 →
`section-alt` · text #222 → `subheadline` · capability cards border #F7F7F7 kept as `section-alt`.
Home H1 "Global Fundraising / & Due Diligence" keeps Figma's line break (content uses \n).
