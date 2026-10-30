@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

raisetalks.com: the RaiseTalks marketing site and blog, about AI-powered fundraising for founders and investors.
Next.js 16 (App Router), exported as a static site and deployed to GitHub Pages. The design comes from the
designer-led rebuild in BGDNDIGITAL/raisetalks (Figma file `1W1rixbMP0ysQFMNbuG6Ao`); the blog, forms, feeds and
old-URL redirects were merged in from the previous Docusaurus site.

## Commands

- `npm run dev`: dev server on http://localhost:3000 (shows every blog post, including scheduled ones)
- `npm run build`: static export to `out/` (must pass before every push)
- `npm run lint`
- `npx serve out`: preview the exported site
- `BLOG_BUILD_DATE=YYYY-MM-DD npm run build`: build the site as it will look on that day
- `node scripts/screens.mjs` (after `npm start`): screenshots of every route at 375/768/1280/1920

## Architecture

- `src/app/(marketing)/*`: one folder per page; pages only compose sections. Blog: `blog/`, `blog/[slug]`,
  `blog/tags`, `blog/tags/[tag]`, `blog/authors/[id]`
- `src/app/(redirects)/*`: old URLs that now live elsewhere (`/about-us` → `/about/`, `/funds-2026`, old blog
  pagination and archive). Static host, so these are meta-refresh pages (`src/components/Redirect.tsx`)
- `src/app/(feeds)/*`: `/blog/rss.xml`, `/blog/atom.xml`, `/llms.txt`; `src/app/sitemap.ts`, `robots.ts`
- `src/components/{ui,layout,sections,motion}`: design system; `src/components/blog`: blog pages and article renderer
- `src/content/**`: all page copy as typed objects (edit text here, never in components); `src/content/blog.ts`
- `src/styles/tokens.css`: colours, type scale, spacing, radius, breakpoints (the only place for raw values)
- `src/lib/blog`: post loading and scheduling (`posts.ts`), Markdown → page parts (`markdown.ts`), feeds
- `src/lib/forms`: newsletter, lead magnets and feature requests → Supabase Edge Functions (`supabase.ts`).
  Functions live in `/supabase/functions` (deployed with the Supabase CLI, CORS allows raisetalks.com only)
- `public/`: images per page (`public/images/<page>/<figma-node>.webp`, see `docs/assets.md`), old-site files kept
  at their URLs (`/img/**`, `/downloads/**`, `/favicon/**`, Google verification, `CNAME`)
- `.github/workflows/deploy.yml`: builds and deploys on push to `main` and every working-day morning (05:00 UTC)
- Design docs from the rebuild: `docs/handover.md`, `docs/design-system.md`, `docs/architecture.md`, `docs/figma-map.md`

Login and sign-up are on app.raisetalks.com: `/sign-in` validates and hands off to it. Google Analytics
(`src/components/Analytics.tsx`) loads in production builds only.

## Design Rules

- **No raw hex/px colours in components.** Only tokens (`bg-card`, `text-copy`, `border-border-1`, `text-h2`,
  `max-w-content` …). A missing value goes into `tokens.css` first.
- Light theme. Surfaces: `page` (white) · `section-alt` (#F7F7F7) · cards `card` on white / `card-on-alt` on grey ·
  hover `card-hover`. Dark bands use `ink*` tokens. Brand: `brand-dark-blue` #003687, `brand-light-blue` #0077FF.
- One shadow only: `--shadow-nav` (navbar). No other drop shadows.
- Body text COLOUR is `text-copy` (#333). `text-body` is the body type SIZE only.
- Type utilities: `text-eyebrow text-h1 text-h1-alt text-h2 text-h2-alt text-h3 text-h3-alt text-h4 text-body
  text-footnote` (already responsive). Headlines pair a Poppins line with a Georgia-italic accent (`Headline`).
- Page rhythm: every section is a `Band` (1480 column with rails) separated by `GridGap` rows.
- Motion: slow and subtle. Use `<Reveal>` / `<RevealGroup>` from `@/components/motion`.
- Server Components by default. `"use client"` only for interactive leaves.
- Every image: `next/image`, meaningful `alt`.
- Responsive, mobile-first. Breakpoints: base <768 · `tablet:` ≥768 · `laptop:` ≥1280 · `desktop:` ≥1680.
  Navbar collapses to a menu button below `laptop`. Minimum width 375.
- Navigation: Blog is in the footer (Community column), not the navbar.
- Static export: no server actions, middleware, or request-time APIs. Route handlers need
  `export const dynamic = "force-static"`. URLs end in a slash (`trailingSlash: true`).

# Important Content Guidelines

## Tone & Style Requirements

- NEVER use emojis in blog posts or any content
- Maintain professional B2B tone for fundraising audience
- Use bullet points (•) or dashes (-) instead of emoji checkmarks
- Focus on value-driven, conversion-oriented marketing copy
- Keep paragraphs short (2-3 sentences) for better readability
- Never use emojis in forms or professional components; use letter abbreviations (DR, AI, RT) instead of emoji icons

## Content Best Practices

- Blog posts should be 1,500-2,500 words for optimal SEO
- Include FAQ sections for long-tail keyword capture
- Add social proof and specific metrics in marketing copy
- Use professional subheadings without decorative elements
- Focus on lead generation with strategic CTA placement
- Descriptive, keyword-rich titles (50-60 chars), meta descriptions of 150-160 chars, alt text on every image,
  internal links to related posts

## Blog Posts

- One Markdown file per post in `/blog/`, named `YYYY-MM-DD-slug.md`; copy `blog/_template.md` to start. Front matter:
  `title`, optional `title_meta` (shorter browser/search title), `description`, `slug`, `date`, `authors` (ids from
  `blog/authors.yml`), `tags` (ids from `blog/tags.yml`), `keywords`, `image` (1200×630 OG image under
  `/public/img/blog/<slug>/`). Post images go in `/public/img/blog/`.
- Articles follow the house format in the DVOS blog programme (`~/Documents/DVOS/raisetalks/blog/articles/`): opening
  paragraphs, `<!-- truncate -->`, "Key takeaways", body sections, an FAQ, "Read next", then one product CTA line at
  the end. After the CTA line comes one blank line and one MCP connect line for the post's audience (founders,
  investors, or both); copy it from an existing post with the same audience. No "Quick Summary" block.
- The whole blog keeps the pre-redesign look (QA's preference, Oct 2026), colours `--color-article-*` in tokens.css.
  Article pages: plain white page, 768px reading column, "All articles" / "In this article" sidebar
  (`src/components/blog/Article*.tsx`). Blog home, topic and author pages (`BlogIndex.tsx`): the original centred
  "RaiseTalks Blog" hero (topic and author pages add chips), horizontal post cards with uncropped 1200x630 covers
  (the blog home's first post as a wide lead card), and the "Browse by topic" list (`ArticleList.tsx`) in a right
  column.
- `src/lib/blog/markdown.ts` turns that plain Markdown into the page, keeping every section where the author put it:
  the opening paragraphs become the deck, the list under "Key takeaways" a soft blue card, tables scroll sideways on
  phones.
- FAQ: plain Markdown under `## Frequently Asked Questions`, each item a bold question line followed by its answer.
  It becomes an accordion in place, and FAQPage structured data. Do not hand-build FAQ markup.
- "Read next": a `## Read next` list of `[title](/blog/slug)` links; each becomes a card with that post's title and image.
- `<BlogCTA title="…" description="…" buttonText="…" buttonLink="…" disclaimer="…" />` is the only component a post
  may use: a blue CTA panel. With `magnet="<id>"` it shows an email form for that lead magnet (ids defined in
  `supabase/functions/newsletter-subscribe`) and the download buttons after signup.
- Scheduling: every post's front matter `date` is its publish day, and the filename starts with the same date. The
  first 31 posts all went live together on 2026-09-23 (a minute apart, to keep their order); a post dated in the
  future waits for its day. Production builds only include posts whose date has arrived (`src/lib/blog/posts.ts`);
  the deploy workflow rebuilds Mon-Fri at 05:00 UTC so each day's post goes live on its own. Links to
  not-yet-live posts lose their link until then. Dates are never shown on the page. `npm run dev` shows all posts.
