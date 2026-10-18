# Drop 22 — Footer affiliate link in the same tab (Studio)

Fixes the Drop 21 Builder request: `SiteFooter.tsx` hard-coded `target="_blank"` on "Become an affiliate and earn
money", which is now the local `/affiliate-program`. It is now a `next/link` `Link`; `target` / `rel` are added only when
`footer.affiliate.external` is true.

## Files (Studio)
- src/components/layout/SiteFooter.tsx
- docs/drops/drop-22.md

## Studio QA
Build + lint clean, 20 routes ○. next start, Chromium 1280: the link has no target / rel; a click goes to
/affiliate-program in the same tab (1 page open).

## For Builder
```
Integrate Studio Drop 22 (footer affiliate link opens in the same tab). Read docs/drops/drop-22.md. Do not edit Studio files.

1. Check the drop was unzipped at the project root: src/components/layout/SiteFooter.tsx and docs/drops/drop-22.md changed.
2. npm run build and npm run lint (fix nothing in Studio files unless the build breaks; then smallest fix, logged).
3. QA on npm start at 375 / 768 / 1280 / 1920, on / and /pricing: footer "Become an affiliate and earn money" has no target and no rel attribute, a click opens /affiliate-program in the same tab; the button looks unchanged (dark-blue bar, hover colour). "Feature Requests" still opens /feature-request in the same tab; external footer links (Careers, Media Toolkit, LinkedIn, YouTube, Instagram, Facebook, app.raisetalks.com links) still open in a new tab. No page errors, no horizontal overflow.
4. Mark the Drop 21 request in docs/log.md "Requests for Studio" as [DONE in Drop 22, verified], add a Drop 22 entry (newest on top).
5. Commit "Drop 22: footer affiliate link same tab", push, check the Vercel deploy, then finish with REPORT FOR STUDIO.
```
