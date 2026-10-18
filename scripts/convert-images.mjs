// Converts raw PNG/JPG exports to WebP (quality 80, max width 2400px, never upscaled).
// Usage: node scripts/convert-images.mjs <inputDir>
// <inputDir> layout: <inputDir>/<page>/<name>.png  ->  public/images/<page>/<name>.webp
// Naming rule: see docs/assets.md
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/convert-images.mjs <inputDir>");
  process.exit(1);
}
const outRoot = path.resolve("public/images");
const rows = [];

for (const page of await readdir(input)) {
  const dir = path.join(input, page);
  if (!(await stat(dir)).isDirectory()) continue;
  await mkdir(path.join(outRoot, page), { recursive: true });
  for (const file of await readdir(dir)) {
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
    const out = path.join(outRoot, page, file.replace(/\.[^.]+$/, ".webp"));
    const info = await sharp(path.join(dir, file))
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    rows.push(`${page}/${path.basename(out)}\t${info.width}x${info.height}\t${info.size}`);
  }
}
console.log(rows.join("\n"));
