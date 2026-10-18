# Developer handover — RaiseTalks marketing site

## What this is
Static marketing site (Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, motion).
No backend, no database, no auth. All pages prerender (static), incl. `/sign-in` (`?mode` is read client-side).

## Run
`npm install` · `npm run dev` · `npm run build` · `npm run lint`. Env: `NEXT_PUBLIC_SITE_URL`
(canonical URLs, sitemap, OG). Production on Vercel: https://raisetalks.vercel.app

## Map
| Where | What |
|---|---|
| `src/app/(marketing)/*` | One folder per route; pages only compose sections |
| `src/components/sections` | Page sections (each documents its Figma node) |
| `src/components/layout` | Header, footer, `Band` / `GridGap` (the grid-line rhythm), mobile menu |
| `src/components/ui` | Button, Badge, Icon, form controls, accordion |
| `src/components/legal`, `auth` | Legal renderer, sign-in card |
| `src/content/**` | **All copy** (typed). Change text here only |
| `src/styles/tokens.css` | Colours, type scale, spacing, radius, breakpoints — the only place for raw values |
| `public/images/<page>/<figma-node>.webp` | Images named after their Figma node |

## Swap points (mocks → real)
| Mock | File | Replace with |
|---|---|---|
| Newsletter form | `src/lib/forms/index.ts` (+ `mock.ts`, `actions.ts`) | Your email/CRM provider. `NewsletterForm.tsx` already calls `subscribeAction`; only the service behind it is mocked |
| Feature-request form | `src/lib/forms/index.ts` → `featureRequest`, `actions.ts → featureRequestAction`, `FeatureRequestForm.tsx` | Your ticket/CRM/email provider. Currently validates, waits and logs to the console |
| Sign in / sign up | `src/content/auth.ts → platformUrl`, `AuthCard.tsx → onSubmit` | Real auth call or keep the redirect to the platform |
| Demo / co-host / early access | `src/content/marketing/shared.ts → links`, page content files | Final Calendly / mail / Luma URLs |
| Domain migration | `src/content/auth.ts → platformUrl`, RaiseTalks TV link (`raisetalks-tv.vercel.app` in `shared.ts` + `site.ts`), sign-up / Calendly / Luma / mailto links, `NEXT_PUBLIC_SITE_URL` | Update all of these in one pass when the final domains exist |

## Conventions
- Tokens only; the exceptions are brand marks (Google "G", LinkedIn blue) and the OG image (`opengraph-image.tsx`, CSS vars unsupported there).
- Style-guide frames win over Figma variables (e.g. muted #696969, hairlines #EBEBEB).
- `data-audience="founders" | "investors"` switches accent colour, gradients, icon strokes and CTAs.
- Server components by default; client only for interactive leaves (audience switch, FAQ accordions, forms, `Marquee`).
- Motion: `Reveal` / `RevealGroup` (scroll-in fade-up, `motion` library), reduced-motion respected globally. Hero load intro: pure CSS `.hero-intro*` in `components.css`, applied by `PageHero` (fade + un-blur + 8px rise, no JS). `Marquee`: JS-driven endless strip with an edge-fade mask, draggable.

## Known open items
- Pricing: prices as on the live site; under review.
- Free version: the site offers a limited free version but no Pricing card; FAQ ("no free plan") and refund policy ("Free Tier") wording to be aligned. Copy pending.
- Legal pages: up-to-date Privacy / Terms / Refund texts pending.
- MCP card "Know your score": final copy pending.
- Two Calendly links (`site.ts` and `investors.ts`) are intentional, matching the live site.
- Contact emails use @raisetalks.ai, matching the live site.
- Forms are mocked (see swap table). `contactAction` exists but is not wired; co-host / early access use mailto.
- The `/kit` style guide was removed before handoff.
