# Drop 10 — compact sticky switch band (laptop)

## Change
- While the Home audience switch band is stuck (laptop and up), its vertical padding eases 64 → 32px over 500ms. The band goes from 174px to 110px tall.
- To keep the page still, the subsection group below gains the same 64px on top while stuck. Content does not move and the band still lets go exactly at the top of Spend Less Time.
- Mobile (24px) and tablet (32px) are already at or under 32px, so they are unchanged.
- File: `src/components/sections/AudienceSwitch.tsx`; design-system.md row updated.

## Checked
At 1920 and 1280: 174 → 110px when stuck, MCP content shift 0px. At 375: unchanged (94px). Build + lint clean, all routes ○.

## For Builder
```
Task: Drop 10 (Studio) — integrate + verify. Read docs/drops/drop-10.md only. (If Drops 7-9 are not integrated yet, do them first.)
1. The designer has unzipped the drop into D:\Claude_Dev\raisetalks ("Replace all").
2. npm run build && npm run lint (all routes ○).
3. Home at 1280/1920, both Startups and Investors:
   - Scroll into MCP: the switch band shrinks smoothly to 110px tall (32px top/bottom).
   - The content under it must not jump.
   - Scroll back up: it grows back to 174px.
   - 375/768 unchanged.
4. Commit "Drop 10: compact sticky switch band", push, add a docs/log.md entry (mind CRLF).
REPORT FOR STUDIO
Task: Drop 10  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
```
