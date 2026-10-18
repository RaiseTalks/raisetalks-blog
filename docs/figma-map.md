# Figma map

- **File (both accounts):** `1W1rixbMP0ysQFMNbuG6Ao` — https://www.figma.com/design/1W1rixbMP0ysQFMNbuG6Ao/Website
- **Page:** "RaiseTalks" `1244:2`
- **Builder access:** Builder: own Figma file eXCYaeB8cQrRXmXRawMZSM (Extra section) + designer's image folder (B-02b)

Everyone uses these IDs in code, filenames and docs. Layer names are generic
("Frame 1321315…"), so section titles below come from the first visible text.

## Pages
| Route | Page | Desktop 1920 | Tablet 768 | Mobile 375 | Notes |
|---|---|---|---|---|---|
| `/` | Home | 3257:1024 (Investors view) · 2601:8349 (Startups view) | 1387:2 | 1387:3 | Audience switch, see below |
| `/about` | About us | 1244:742 | 1429:53 | 1936:2 | |
| `/startups` | Startups | 1316:2864 (misnamed "Statups") | 1496:2 | 1967:3529 (370 wide) | |
| `/investors` | Investors | 1244:1355 | 1433:1253 | 1947:651 (390 wide) | |
| `/decoder-game` | Decoder Game | 2601:7778 | — | — | Studio derives T/M from other pages |
| `/pitch-competitions` | Pitch Competitions | 1244:1062 | 1508:4134 (misnamed) | 2158:36 (misnamed) | ROUGH — content + intent only; rebuild with sections from other pages |
| `/pricing` | Pricing | — | — | — | Not in Figma. Copy from raisetalks.com/pricing; Studio designs from the system |
| `/privacy-policy` | Privacy Policy | 2450:469 | 2302:1636 | 2302:2716 | H1 regular (bold in Figma = mistake) |
| `/terms-of-service` | Terms of Service | 2302:2 | 2302:1002 | 2302:2078 | same |
| `/refund-policy` | Refund Policy | 2302:718 | 2302:1324 | 2302:2404 | same |

Mobile frames are 370/375/390 wide → we build to 375.

## Shared (every page, taken from Home desktop 3257:1024)
- Announcement bar 3257:1025 (30px) · Navbar 3257:1030 (60px) — nav items follow the live site
- CTA band (dark) 3257:1384 · **Footer 3257:1403** (with "Become an affiliate") — use on every page
- Grid rhythm: every section sits in a full-width band with a 1480 column bordered left/right;
  between sections an empty "grid row" 64px (tablet 48, mobile 32) — the h64/h48/h32 frames.

## Sections (desktop, top → bottom; spacer rows omitted)
**Home 3257:1024:** hero 3257:1052 · logos 3257:1081 · "One Workspace. Zero chaos." + testimonial 3257:1087 · audience switch 3257:1610 · switch group 3257:1609 (MCP "Right inside Claude" + feature cards + isometric screen) · RaiseTalks TV teaser 3257:1289 · "Attend our Pitch Competitions" 3257:1340 · CTA 3257:1384 · footer 3257:1403
  - Tablet 1387:2: hero 1387:4 · logos 1387:71 · workspace 3259:1630 · switch + MCP 1405:144 · cards 2794:6451 · isometric 1405:718 · TV 1405:421 · pitch 1405:553 · CTA 2375:248 · footer 1415:797
  - Mobile 1387:3: hero 1398:2 · logos 1405:104 · workspace 2823:6813 · switch + MCP 1405:292 · cards 2802:6621 · isometric 1415:761 · TV 1405:472 · pitch 1405:677 · CTA 2375:411 · footer 1415:880
**About 1244:742:** hero 1285:943 · 10-year goal 1285:964 · "Why we Build." 1285:1007 · photo grid 1285:984 · "What we're Building Toward" 1285:1074 · backers & partners 1285:1154 · "We Believe in our Values" 2279:257 · CTA 2368:195 · footer 2375:83
  - Tablet 1429:53: 1429:71 · 1429:99 · 1429:105 · 1433:1065 · 1433:1083 · 1433:1114 · 1433:1172 · 2375:287
  - Mobile 1936:2: 1936:18 · 1936:46 · 1936:66 · 1936:357 · 1936:171 · 1936:407 · 1936:496 · 2375:450
**Investors 1244:1355:** hero 1296:286 · intro banner 1430:769 · "Frustration Patterns" 1296:319 · "What You Get" 1296:339 · Pre-Score Engine 1300:1265 · Scoring & Committee 1316:736 · Due Diligence & IC Pack 1316:1577 · testimonial + stats 1296:1107 · CTA 2368:215 · footer 2375:164
  - Tablet 1433:1253: 1433:1271 · 1433:1286 · 1433:1557 · 1433:1584 · 1433:1807 · 1438:2175 · 1438:2230 · 1438:2460 · 2375:268
  - Mobile 1947:651: 1947:667 · 1947:695 · 1947:820 · 1947:1049 · 1947:2591 · 1947:2960 · 1968:4 · 2375:431
**Startups 1316:2864:** hero 1316:2892 · intro banner 1430:1007 · The Problem 1316:4739 · How RaiseTalks Works 1338:4839 · "Everything you need" features 3420:16657 · AI Advisor 1347:4908 · Founder Perks 1347:5202 · video 2715:19300 · FAQ 1347:4959 · CTA 2368:235 · footer 2375:2
  - Tablet 1496:2: 1496:20 · 1496:832 · 1496:841 · 1500:869 · 1500:911 · 1500:919 · 1500:1064 · 1508:3961 · 1508:4025 · 2375:306
  - Mobile 1967:3529: 1967:3545 · 1967:4376 · 1967:3581 · 1967:4448 · 1975:47 · 1975:54 · 1979:198 · 1984:276 · 1984:358 · 2375:469
**Decoder Game 2601:7778:** hero 2601:7806 · "One Chip – One Bet" + wheel 2601:7829 · photo strip 2601:9424 · "What People are Saying" 2601:7855 · "Join us as Co-Host" 2601:8100 · FAQ 2601:8141 · CTA with QR 2601:8249 · footer 2601:8268
  - Game assets: board desktop 2601:9300 · board mobile 2677:16853 · QR code 2677:16971 · 12 question cards 2601:9498…2601:9509 ("CNST-…")
**Pitch Competitions 1244:1062 (rough):** hero + stats 1244:1090/1244:1103 · "Why Join" 1285:1752 · The Process 1285:1824 · "What You Get" 1285:1955 · CTA 2368:255
**Legal (all three):** hero with "Last updated" · blue intro banner · numbered sections with info boxes · footer
  - Privacy 2450:469: 2450:497 · 2450:510 · body 2450:523 · Terms 2302:2: 2302:30 · 2302:43 · body 2302:56 · Refund 2302:718: 2302:746 · 2302:759 · body 2302:768

## Home audience switch ("For Startups / For Investors")
One switch 3257:1610 swaps three sections underneath (3257:1609 group):
1. MCP block ("Your deal flow, Right inside Claude" ↔ "Your data room, Right inside Claude")
2. Feature cards ("IC decision. 4x faster" ↔ "Investors Decide Fast. Be Ready Faster.")
3. Isometric screen ("Searching Startups" ↔ "Searching Investors")
Investors view = blue accent (3257:1024). Startups view = yellow→red accent (2601:8349).
Everything else on the page is identical.

## Design system sources
- Colors 4050:1869 · Typography 4050:1700 · Layer 0 foundations 4050:1991
- Figma variable collections: "Website" (surfaces/text), "Primitives", "Scales", "Spacing"
- Buttons, inputs, controls: RaiseTalks TV atoms 4042:648 (inside "archive", dark theme — same buttons)
- Badges: none for RaiseTalks yet → Studio designs light versions of the TV badges
  (check first: loose frames 3986:651, 3986:655, "Badge – border animation" 3997:519 next to Home)

## IGNORE
Section "archive" 4050:2244 (except 4042:648 as reference) · page "(old draft)" · all
"screencapture-…" images · loose frames
2286:523, 1316:370, 1405:127, 2541:8184, lucide icon 2704:19044 · text 4051:2245 (pasted chat).
