# Drop 2 — About, Pricing, Decoder Game, Pitch Competitions, Legal ×3, Sign-in, SEO, handover

Cumulative: contains everything from Drop 0/1 changes too (unzip Drop 1 first, then Drop 2 — or only Drop 2 on top of Drop 0).

## New pages
- `/about` (Figma 1244:742) — goal card, manifesto, photo mosaic, timeline, backers marquee, values grid.
- `/pricing` — not in Figma. Live-site copy; Studio design: annual/monthly switch + 3 plan cards
  (Startup Pro = founders accent, Investor Pro = blue, VC Platinum = dark card, "Coming soon" badges).
- `/decoder-game` (2601:7778) — desktop from Figma; tablet/mobile derived (stacked, mobile wheel image).
  Links from the live page (Luma, co-host mailto, Calendly). FAQ answers with lists/steps.
- `/pitch-competitions` — copy from the rough Figma page, rebuilt with current sections
  (hero + stats, 2×2 icon grid, blue 4-step process, tick grid, CTA).
- `/privacy-policy`, `/terms-of-service`, `/refund-policy` — full Figma text, regular H1, tables,
  info boxes, auto-linked emails. Content in `src/content/legal/*` (simple line format).
- `/sign-in` (+ `?mode=signup`) — the RaiseTalks TV card in light. Validates in the browser, then
  hands off to app.raisetalks.com (`src/content/auth.ts → handoff` is the swap point). Not indexed.
  Every "Login / Try it Free / Start now" on the site now opens this page.

## SEO
Per-page title/description/canonical · `sitemap.xml` · `robots.txt` (kit + sign-in disallowed) ·
generated Open Graph image (1200×630, brand gradient) · Twitter card · favicon from `/icons/mark-512.png`
(TV favicon removed).

## Content changes since Drop 1 (from your answers)
MCP accordion texts (Figma "MCP blocks") · Pre-Score dimension texts · Startups FAQ 20/20 (live) ·
Investors numbers from the live site (1M / 63 / < 1 min) · LinkedIn + YouTube.

## Flags
1. Startups MCP "Know your score" text = copy of "Build from a prompt" in Figma (used as is).
2. Refund Policy §1 + tip mention a "Free Tier/Free Plan" — FAQ says "There is no free plan". Legal text
   kept exactly as in Figma; please align the wording.
3. Pricing: no savings badge (no copy for it); "or $99/mo" helper line shows the other period.
4. Figma write incident: while extracting legal text I briefly wrote one hidden plugin-data key to the
   file (not visible on canvas) and removed it immediately. Verified clean. No other changes.

## Checked (placeholder images)
Build + lint + tsc clean. All 12 routes at 375 / 768 / 1920: no horizontal overflow, no page errors.

## For Builder
1. Unzip into `D:\Claude_Dev\raisetalks` → Replace all.
2. `Do docs/prompts/B-02-assets.md` (list now covers Drop 1 + 2, ~70 files).
3. `Do docs/prompts/B-03-forms-mock.md` if not done.
4. `Do docs/prompts/B-04-qa-archive.md` → send the zip to Studio for the QA round.
B-05 (sign-in) is no longer needed — Studio built it.
