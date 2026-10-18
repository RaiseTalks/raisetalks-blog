# Drop 4 — Sign-in (TV copy, mock, static)

Ships in the same zip as Drop 3.

## Changes
- **AuthCard**: copy of the TV card. It has the same layout, fields and spacing (separator + social `mt-6`), and keeps typed values on an error.
  - It shows field errors, and the button is disabled while redirecting.
  - Ghost social buttons, `max-w-120`, p-6.
  - .com colours: `card-on-alt` + `border-2` on the grey band, subheadline text, link hover → headline.
- **Mock**: validates in the browser, then `window.location.assign(authContent.platformUrl)`.
  - `platformUrl` is a **placeholder** (`https://app.raisetalks.com`) marked `TODO(designer)` in `src/content/auth.ts`.
  - Social and "Forgot password?" links go there too.
  - The email is no longer put in the URL.
- **/sign-in is static (○)**: the page has no `searchParams`. `components/auth/SignInView.tsx` (client) reads `?mode` inside `<Suspense>`, and the server HTML shows the sign-in card.
- One page title, "Sign in" (static page), noindex as before.
- No TV demo-credentials hint (no demo accounts on .com).
- docs: architecture + handover updated (all routes static).

Ownership: all Studio files on .com (`(marketing)/sign-in`, `components/auth`, `content/auth.ts`).

## Checked
`npm run build` → `○ /sign-in`. Sign-in + `?mode=signup` render. Empty submit shows 3 field errors, values kept.

## For Builder (Drops 3 + 4)
Paste this prompt:

```
Task: Drops 3+4 (Studio) — integrate + verify. Read docs/drops/drop-3.md and drop-4.md only.
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks ("Replace all").
2. npm run build && npm run lint. Confirm the route table shows ○ /sign-in (static) and every route is ○.
3. npm start, then node scripts/screens.mjs. Check:
   a) navbar at the top of the page = full-width bar;
   b) after scrolling = floating rounded bar lined up with the grid rails (375/768/1280/1920);
   c) mobile menu opens/closes (outside tap, Escape);
   d) /sign-in and /sign-in?mode=signup.
4. On the live preview (vercel), scroll slowly on Home and one inner page: the morph must be smooth, with no content jump.
5. Commit "Drops 3+4: TV buttons/nav/motion, static sign-in" and push. Add a docs/log.md entry.
REPORT FOR STUDIO
Task: Drops 3+4  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
