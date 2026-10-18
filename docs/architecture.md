# Architecture

## Routes (group `(marketing)`, owner A)
`/sign-in` · `/` · `/about` · `/startups` · `/investors` · `/decoder-game` · `/pitch-competitions` · `/pricing` ·
`/privacy-policy` · `/terms-of-service` · `/refund-policy`

No auth, no members area, no proxy. `/sign-in` (+ `?mode=signup`) = the RaiseTalks TV card in .com
tokens, **static**: `?mode` is read in the browser by `components/auth/SignInView` (client). Mock only: a valid
submit redirects to `src/content/auth.ts → platformUrl` (placeholder until confirmed). External destinations (in `src/content/site.ts → site.links`):
- Login / Try it Free / Start now → local `/sign-in` → app.raisetalks.com
- Book a Demo / Contact us → Calendly `iamdariiava/30min`
- RaiseTalks TV → `https://tv.raisetalks.com`

## Forms (mock — swappable)
- Contract: `src/lib/forms/types.ts` (A) — `FormService { subscribe, contact }`.
- Mock: `src/lib/forms/mock.ts` (B) — validates, waits ~600ms, returns `{ ok: true }`, logs on server.
- `src/lib/forms/index.ts` (B) exports the active service. Real developer replaces ONLY this file.
- Server Actions: `src/lib/forms/actions.ts` (B) — `subscribeAction`, `contactAction`
  (`useActionState` compatible, return `FormResult`). Studio's form components call these.
- Used by: footer newsletter (every page), Decoder "Join us as Co-Host", Pitch Competitions.

## Home audience switch
`AudienceSwitch` (client) holds `"investors" | "founders"` (default investors) and sets `data-audience`
on its wrapper → `--audience-*` tokens swap accent, gradients, icon strokes and buttons.
Both views are server-rendered and passed in as props; content in `src/content/marketing/home.ts`.
Deep link: `/?for=startups` or `/?for=investors`.

## Content
`src/content/site.ts` (nav, footer, links) · `src/content/marketing/<page>.ts` · `pages.ts` (SEO).

## SEO (final round)
Per-page `metadata` from `pages.ts`, canonical URLs, `sitemap.ts`, `robots.ts`, OG image.
Base URL from `NEXT_PUBLIC_SITE_URL` (Vercel: `https://raisetalks.vercel.app`).
