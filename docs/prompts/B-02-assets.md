# B-02 — Export images + logos   (after B-01)

Read `CLAUDE.md`, `docs/assets.md`, `docs/drops/images-needed.md`.

1. Export **exactly** the files listed in `docs/drops/images-needed.md` (node → path). The code
   already references these paths; nothing else needs renaming. Use get_design_context /
   download_assets per node. Convert with `sharp` (`scripts/convert-images.mjs`).
2. Each later drop adds its own list to that file — re-run this task when the designer asks.
3. Fill the manifest table in `docs/assets.md` (file, node, page, size) and report: the real
   width/height of `logo-raisetalks.svg`, the brand name of each partner logo, and any node you
   could not export.
4. Figma is read-only. Skip everything under IGNORE in figma-map.md.

`npm run build`. Commit "B-02", push. REPORT FOR STUDIO.
