// Screenshot all routes at 4 widths into screens/. Usage: npm run build && npm start, then node scripts/screens.mjs [baseUrl]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const routes = [
  ["home", "/"], ["about", "/about"], ["startups", "/startups"], ["investors", "/investors"],
  ["decoder-game", "/decoder-game"], ["pitch-competitions", "/pitch-competitions"], ["pricing", "/pricing"],
  ["feature-request", "/feature-request"], ["affiliate-program", "/affiliate-program"],
  ["privacy-policy", "/privacy-policy"], ["terms-of-service", "/terms-of-service"], ["refund-policy", "/refund-policy"],
  ["sign-in", "/sign-in"], ["sign-in-signup", "/sign-in?mode=signup"], ["home-startups", "/?for=startups"],
];
const widths = [375, 768, 1280, 1920];
mkdirSync("screens", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext();
for (const [name, path] of routes) {
  for (const w of widths) {
    const page = await ctx.newPage();
    page.on("pageerror", (e) => console.log("  pageerror:", e.message));
    await page.setViewportSize({ width: w, height: 1000 });
    await page.goto(base + path, { waitUntil: "domcontentloaded" });
    // scroll through so reveal animations fire, then back to top
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto"; // html has smooth scroll; it leaves fullPage shots ~200px down
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `screens/${name}-${w}.png`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`${name} @${w}${overflow ? "  HORIZONTAL OVERFLOW" : ""}`);
    await page.close();
  }
}
await browser.close();
