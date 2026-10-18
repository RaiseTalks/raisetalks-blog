# RaiseTalks — raisetalks.com

The RaiseTalks marketing site and blog: Next.js 16, exported as a static site and deployed to GitHub Pages.

## Run it
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to out/ — must pass before every push
npm run lint
```

## Where things live
- Pages: `src/app/(marketing)/*` · old-URL redirects: `src/app/(redirects)/*` · feeds and llms.txt: `src/app/(feeds)/*`
- Copy: `src/content/**` (typed objects — edit text here, never in components)
- Blog posts: `blog/*.md` (one Markdown file per post; see CLAUDE.md for the format and scheduling)
- Tokens (colours, type, spacing): `src/styles/tokens.css`
- Components: `src/components/{ui,layout,sections,motion,blog}`
- Forms: `src/lib/forms` → Supabase Edge Functions in `supabase/functions`
- Images: `public/images/<page>/<figma-node-id>.webp` (see `docs/assets.md`); blog images in `public/img/blog/`

Deploys on every push to `main` and every working-day morning at 05:00 UTC, so scheduled posts go live on their day
(`.github/workflows/deploy.yml`). Login / sign-up are on **app.raisetalks.com** (separate platform).
Design docs: `docs/handover.md`, `docs/design-system.md`, `docs/architecture.md`, `docs/figma-map.md`.
