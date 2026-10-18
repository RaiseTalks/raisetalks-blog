# B-05 — QA round + fixes (all in one go)

Read CLAUDE.md first. Do everything below in order, then stop with the REPORT block.

## One-time ownership exception (approved by the designer)
For THIS task only, Builder may edit these Studio files. Change only what's listed.
Log every Studio-file edit in `docs/log.md` with file, what changed, and why.
- `src/content/marketing/investors.ts`, `startups.ts`, `shared.ts`
- `src/components/sections/InvestorTools.tsx`
- `src/components/layout/NewsletterForm.tsx`
- any Studio file, ONLY for an objective bug found in Part 2 (broken image, horizontal overflow,
  page/console error, clipped or overlapping text, dead link). Everything else is a list item, not a fix.
Rules still apply: tokens only (no raw hex/px colours), copy stays in `src/content/**`, no new libraries,
Figma read-only.

## Part 1 — Known fixes
1. **Investment Memo (Investors → Pre-Score).**
   - The file is `/images/investors/2539-7813.svg`, but `investors.ts` points to `.webp` (broken).
   - Set `src` to the `.svg`, with `width: 812, height: 3098`.
   - In `PreScoreSection` (`InvestorTools.tsx`), render it inside a blue brand frame:
     - Outer frame: the existing brand-blue token or brand-gradient utility from `tokens.css`/`components.css`,
       `rounded-lg`, padding from the spacing scale (24 mobile / 32 tablet / 48 desktop).
     - Inner sheet: small radius token, `overflow-hidden`, fixed aspect `860/678`.
     - `<Image … fill unoptimized className="object-cover object-top">`, so only the top of the A4 sheet shows.
       `unoptimized` is needed because next/image does not optimise SVG.
2. **Video poster (Startups).** In `startups.ts`, set
   `poster: "https://i.ytimg.com/vi/8WOwPsQE158/maxresdefault.jpg"`. `remotePatterns` already allows it.
   Delete `public/images/startups/2715-19300.webp` if nothing else uses it.
3. **Partner logos** (`shared.ts → partnerLogos`, used on Home + About).
   - Alt texts must match `docs/assets.md`:
     1069 Global AI Show · 1070 NVIDIA · 1071 Step · 1072 Dubai AI Festival · 1073 Microsoft for Startups ·
     1074 Web Summit · 1075 Founder Institute · 1076 NLSQL · 1077 AWS · 1078 GetVision.
   - Slot 1077: copy `public/images/shared/logos-extra/aws.webp` → `public/images/shared/3257-1077.webp`.
   - Keep each slot's height. Set width = height × the real file's aspect ratio (read it with sharp), so no logo is stretched.
   - Look at each logo file and make sure the alt text matches what the image shows.
   - Update `docs/assets.md` (1077 filled, confidence notes).
4. **Newsletter** (`NewsletterForm.tsx`).
   - Keep the client-side email check.
   - Replace the `setTimeout` with `useActionState(subscribeAction, undefined)` from `@/lib/forms/actions`.
   - The form uses `action={formAction}`. Show the pending state from `isPending`, the thank-you on `{ ok: true }`,
     and `result.error` on `{ ok: false }`.
   - Remove the `TODO(builder B-03)` comment.
5. **`scripts/screens.mjs`.**
   - Add `/sign-in`, `/sign-in?mode=signup` and `/?for=startups`.
   - Before the full-page shot, use `window.scrollTo({ top: 0, behavior: "instant" })`, because html has smooth scroll.

## Part 2 — QA
1. `npm run build`, `npm run lint`, `npx tsc --noEmit`: all clean.
2. Start the server and run the screenshots in ONE shell command (the background server dies between calls), e.g.
   `npm start & sleep 8 && node scripts/screens.mjs; kill %1`.
   Cover every route × 375/768/1280/1920.
3. Write `scripts/qa-flows.mjs` (Playwright, same one-command pattern) and run it. For each check print PASS/FAIL:
   - Every route × 4 widths:
     - no horizontal overflow
     - no `pageerror` / console error
     - no failed request (4xx/5xx)
     - no broken image (`img.complete && naturalWidth === 0`)
   - Home: the audience switch toggles `data-audience`. `/?for=startups` opens the Startups view.
   - Accordions + FAQ: click opens, second click closes, `aria-expanded` updates.
   - Pricing: the annual/monthly toggle changes the displayed prices.
   - Mobile menu @375: opens, links visible, closes via button and via Escape, body scroll restored.
   - Sign-in (both modes):
     - Empty submit shows errors.
     - A valid submit tries to go to app.raisetalks.com. Intercept it with `page.route`; don't actually leave.
   - Newsletter:
     - An invalid email shows the error.
     - A valid email shows the thank-you, and the server log shows the mock call.
   - Every internal `<a href="/…">` returns 200.
4. Look at the screenshots yourself.
   - Compare the copy with the live site https://raisetalks.com.
   - Compare the build with the deploy https://raisetalks.vercel.app, as a before/after check.
   - Fix only objective bugs (see exception). List everything else (spacing, alignment, visual doubts) for Studio.
   - Include the page, width, and what you see.
5. Re-run steps 1–3 until everything passes.

## Part 3 — Ship
Commit with the message `B-05: QA fixes (memo frame, poster, logos, newsletter action, screens)` and push.
Confirm the Vercel deploy is green, then re-run `qa-flows.mjs` against https://raisetalks.vercel.app.
Make a new QA zip (`git archive`, like B-04) plus `screens/` zipped separately, for Studio.

Do NOT touch designer questions: sign-up CTA targets, the Refund "Free Plan" wording, and the MCP duplicate text.

```
REPORT FOR STUDIO
Task: B-05  Status: done | blocked
Commit: <hash>  Vercel: <url, green?>
Changed: <folders>
Studio files edited (also in log.md): <file — change>
QA: <n checks, n pass / fail list>
Issues for Studio (not fixed): <page @width — issue>
Requests for Studio: <none | list>
```
