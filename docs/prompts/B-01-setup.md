# B-01 — Setup, GitHub, Vercel, Figma check   (no dependencies)

Read `CLAUDE.md` and `docs/figma-map.md` only.

1. `npm install`, then `npm run build` and `npm run lint`. Both must pass.
2. `git init -b main`, commit "Drop 0: skeleton". Remote: if `gh auth status` works, run
   `gh repo create raisetalks --private --source=. --push`. Otherwise ask the designer for the
   empty GitHub repo URL (one question), add it as `origin`, push.
3. Figma check (read-only) in file `1W1rixbMP0ysQFMNbuG6Ao`: call get_metadata on
   `3257:1024` and `1244:742`. Expected names "Homepage Desktop v2" / "About us Desktop".
   Write the result on the "Builder access" line of `docs/figma-map.md` (this one line only):
   `Access: YES · IDs match: YES` — or `Access: NO` + the error. If NO, stop and report (blocked).
4. Commit "B-01", push.
5. Print for the designer exactly:
   "Vercel: vercel.com → Add New → Project → import `raisetalks` → Project name `raisetalks` →
   Environment Variable NEXT_PUBLIC_SITE_URL = https://raisetalks.vercel.app → Deploy."
6. Finish with the REPORT FOR STUDIO block.
