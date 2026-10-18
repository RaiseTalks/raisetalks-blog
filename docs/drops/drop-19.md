# Drop 19 — RaiseTalks TV background video (Home)

Studio files only. Apply AFTER Drop 18. Unzip at the project ROOT → "Replace all".

## What changed
- **New `ui/LoopVideo.tsx`** (client): muted, looping, inline. Downloads only when the section comes within 400px of
  the screen, plays while visible, pauses off-screen (never on hover). Reduced motion = poster only, video never loaded.
  Decorative (aria-hidden, not focusable).
- **TvTeaser** (Home 3257:1289): the background image is replaced by the video (`/video/tv-loop.mp4`, poster
  `/video/tv-loop-poster.webp`), `object-cover` centred at every width — on a phone you see the middle of the video.
- **Dark overlay** (designer): new token `--overlay-tv` in tokens.css = ink vignette. Centre `--overlay-tv-center: 75%`
  ink (lower % = more video visible), fading to 100% ink at all four edges of the panel. To tune, change only
  `--overlay-tv-center`.
- `home.ts → tv.background` replaced by `tv.video { src, poster }`.

## Studio QA (localhost, Chromium, test poster; the real MP4 wasn't available here)
Build + lint clean. 1920 / 375: video has no src on load, gets `/video/tv-loop.mp4` once scrolled into view; muted,
loop, playsinline, object-fit cover, position 50% 50%. Reduced motion (1280): src stays empty, poster only.
Overlay: solid ink at the panel edges, video visible in the middle. Not judged: the real video's look, loop seam,
playback on real phones (iOS autoplay needs muted + playsinline, both set).

## For Builder
```
TASK: Integrate Studio Drop 19 (RaiseTalks TV background video on Home).
The designer has unzipped drop-19.zip at the project root (after Drop 18). Read docs/drops/drop-19.md. Do NOT edit Studio files.

1. VIDEO FILES. If public/video/tv-loop.mp4 and public/video/tv-loop-poster.webp already exist from the video import task,
   skip to step 2. Otherwise import them now from D:\Claude_Dev\raisetalks-assets\ (root or video\):
   - Install ffmpeg/ffprobe system-wide if missing (e.g. winget install Gyan.FFmpeg), not as a project dependency.
   - Web file must be H.264, yuv420p, NO audio, 24–30 fps, max 1920 wide (never upscale), faststart, ≤ 3 MB (hard max 5 MB).
     Copy as-is if the source already meets all of that; otherwise:
     ffmpeg -i tv-loop.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -vf "scale='min(1920,iw)':-2,fps=25" -movflags +faststart public/video/tv-loop.mp4
     (over 3 MB → crf 28, then 30).
   - Poster = first frame of the FINAL web file, same resolution, WebP q80. Regenerate it if the delivered one doesn't match.
   - docs/assets.md: both files with W×H, duration, KB.

2. npm run build + npm run lint must pass. All routes static.

3. QA on a production build (Chromium), Home at 375 / 768 / 1280 / 1920:
   - On load the <video> has no src; after scrolling the TV section into view it has src /video/tv-loop.mp4 and plays
     (paused === false, currentTime advancing). Scrolled far away → paused.
   - muted, loop, playsInline true; object-fit cover, object-position 50% 50%.
   - With prefers-reduced-motion: reduce → src stays empty, poster visible.
   - Network: tv-loop.mp4 is NOT requested before the section is near the screen.
   - Screenshot the TV panel at 375 and 1920 (video playing) for the designer.
   - No page errors, no horizontal overflow.

4. Delete public/images/home/3257-1291.webp (old TV background) after `grep -r` over src/ confirms no reference;
   remove its row in docs/assets.md. docs/log.md: Drop 19 entry.

5. Commit + push.

REPORT FOR STUDIO
Task: Drop 19  Status: done | blocked
Changed: <folders>
Requests for Studio: <none | list>
Plus: final video specs (W×H, fps, duration, MB), the QA results above, screenshot paths.
```
