# B-04 — QA package for Studio   (after every Studio drop, when the designer asks)

1. Unzipped drop is in place → `npm run build` + `npm run lint`. Fix only build breakers
   (log each in docs/log.md per the CLAUDE.md exception).
2. Commit "Drop N merged", push (Vercel deploys).
3. `git archive -o D:\Claude_Dev\raisetalks-qa.zip HEAD` and tell the designer to upload it to Studio.
4. Optional if Playwright works: `npm start` + `node scripts/screens.mjs`, report any
   "HORIZONTAL OVERFLOW" or pageerror lines (don't attach screenshots).

REPORT FOR STUDIO (Vercel URL of this deploy, overflow/pageerror lines, anything odd).
