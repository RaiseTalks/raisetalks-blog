# Drop 0 — Skeleton, tokens, docs, Builder prompts

## What's in it
Full repo (first drop, so config files are included once). Built from the RaiseTalks TV
repo with members/auth/billing/proxy removed.
- Light tokens from Figma variables ("Website", "Primitives") + typography + Layer 0
- Audience accent theme (`data-audience="founders"`) for the Home switch
- Placeholder routes for all 10 pages + `/kit`; SEO metadata in `src/content/marketing/pages.ts`
- `site.ts`: live-site nav (Decoder Game in nav, Pitch Competitions in footer), Home footer
  everywhere incl. "Become an affiliate", links to app.raisetalks.com
- Forms contract `src/lib/forms/types.ts` (mock = Builder)
- Header / footer / kit are **skeletons** — rebuilt to Figma in Drop 1
- Build + lint pass in Studio's sandbox

## Decisions locked
Nav = live site · footer = Home footer on all pages · legal H1 regular · mobile 375 ·
Pitch Competitions rebuilt with current sections · Decoder T/M derived by Studio ·
Pricing designed by Studio from live copy (cards + monthly/annual toggle) ·
announcement text from Figma · Studio designs light badges · muted = #6D6D6D (variable).
Figma: stray dictation text 3334:1043 deleted by Studio (designer-approved one-off).

## For Builder
First drop: unzip into an EMPTY folder `D:\Claude_Dev\raisetalks`, then run in order
(`/clear` between each):
1. `Do docs/prompts/B-01-setup.md`
2. `Do docs/prompts/B-02-assets.md`
3. `Do docs/prompts/B-03-forms-mock.md`
Paste each REPORT FOR STUDIO to Studio. Logo shows as a broken image until B-02 — expected.
