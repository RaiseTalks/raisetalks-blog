// QA flows (Playwright). One command, server + tests together:
//   npm start > /tmp/qa-server.log 2>&1 & sleep 8 && QA_SERVER_LOG=/tmp/qa-server.log node scripts/qa-flows.mjs; kill %1
// Or against a deploy: node scripts/qa-flows.mjs https://raisetalks.vercel.app   (server-log check is skipped)
import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const serverLog = process.env.QA_SERVER_LOG;
const routes = [
  "/", "/?for=startups", "/about", "/startups", "/investors", "/decoder-game", "/pitch-competitions", "/pricing",
  "/privacy-policy", "/terms-of-service", "/refund-policy", "/sign-in", "/sign-in?mode=signup",
];
const widths = [375, 768, 1280, 1920];

let pass = 0;
const fails = [];
const check = (name, ok, detail = "") => {
  if (ok) pass++; else fails.push(`${name}${detail ? " — " + detail : ""}`);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${!ok && detail ? "  → " + detail : ""}`);
};
const skip = (name, why) => console.log(`SKIP  ${name}  (${why})`);

const browser = await chromium.launch();
const ctx = await browser.newContext();

async function open(path, width = 1280) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(base + path, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
  return page;
}
async function scrollThrough(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto"; // html has smooth scroll
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(800);
}

// ── 1. every route × width: overflow, errors, failed requests, broken images ─────────────────────
const internal = new Set();
for (const path of routes) {
  for (const w of widths) {
    const page = await ctx.newPage();
    const errors = [], failed = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text().slice(0, 160)}`); });
    page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().slice(0, 120)}`); });
    // aborted Next.js <Link> prefetches (_rsc) when the page closes are noise, not failures
    page.on("requestfailed", (r) => { if (!(r.url().includes("_rsc=") && /ABORTED/.test(r.failure()?.errorText ?? ""))) failed.push(`failed ${r.url().slice(0, 120)} ${r.failure()?.errorText ?? ""}`); });
    await page.setViewportSize({ width: w, height: 1000 });
    await page.goto(base + path, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    await scrollThrough(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
    const tag = `${path} @${w}`;
    check(`no horizontal overflow  ${tag}`, overflow <= 0, `${overflow}px wider than viewport`);
    check(`no page/console errors  ${tag}`, errors.length === 0, errors.join(" | "));
    check(`no failed requests      ${tag}`, failed.length === 0, failed.join(" | "));
    check(`no broken images        ${tag}`, broken.length === 0, broken.join(" | "));
    if (w === 1280) {
      for (const h of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")))) {
        if (!h.startsWith("//") && !h.startsWith("/_next")) internal.add(h.split("#")[0] || "/");
      }
    }
    await page.close();
  }
}

// ── 2. Home audience switch ─────────────────────────────────────────────────────────────────────
{
  const page = await open("/");
  const wrap = page.locator("[data-audience]", { has: page.locator("[role=tablist]") }).first();
  const before = await wrap.getAttribute("data-audience");
  await page.locator("[role=tab][aria-selected=false]").first().click();
  await page.waitForTimeout(400);
  const after = await wrap.getAttribute("data-audience");
  check("audience switch toggles data-audience", !!before && !!after && before !== after, `${before} → ${after}`);
  await page.locator("[role=tab][aria-selected=false]").first().click();
  await page.waitForTimeout(400);
  check("audience switch toggles back", (await wrap.getAttribute("data-audience")) === before);
  await page.close();

  const p2 = await open("/?for=startups");
  await p2.waitForTimeout(600);
  const w2 = p2.locator("[data-audience]", { has: p2.locator("[role=tablist]") }).first();
  check("/?for=startups opens the Startups view", (await w2.getAttribute("data-audience")) === "founders", `data-audience=${await w2.getAttribute("data-audience")}`);
  await p2.close();
}

// ── 3. Accordions + FAQ: open, close, aria-expanded ─────────────────────────────────────────────
for (const path of ["/startups", "/investors", "/decoder-game", "/pricing", "/pitch-competitions"]) {
  const page = await open(path);
  const btns = page.locator("main button[aria-expanded], section button[aria-expanded]").filter({ hasNot: page.locator("[aria-label*=menu i]") });
  const n = await btns.count();
  if (n === 0) { skip(`accordion ${path}`, "none on page"); await page.close(); continue; }
  const b = btns.first();
  await b.scrollIntoViewIfNeeded();
  const s0 = await b.getAttribute("aria-expanded");
  await b.click(); await page.waitForTimeout(500);
  const s1 = await b.getAttribute("aria-expanded");
  await b.click(); await page.waitForTimeout(500);
  const s2 = await b.getAttribute("aria-expanded");
  check(`accordion opens/closes + aria-expanded  ${path} (${n} items)`, s1 !== s0 && s2 === s0, `${s0} → ${s1} → ${s2}`);
  await page.close();
}

// ── 4. Pricing toggle ───────────────────────────────────────────────────────────────────────────
{
  const page = await open("/pricing");
  const list = page.locator("main ul, section ul").filter({ has: page.locator("h2") }).first();
  const radios = page.locator("[role=radio]");
  const text0 = await list.innerText();
  await page.locator("[role=radio][aria-checked=false]").first().click();
  await page.waitForTimeout(700);
  const text1 = await list.innerText();
  check("pricing toggle changes displayed prices", text0 !== text1 && (await radios.count()) >= 2);
  check("pricing toggle updates aria-checked", (await page.locator("[role=radio][aria-checked=true]").count()) === 1);
  await page.close();
}

// ── 5. Mobile menu @375 ─────────────────────────────────────────────────────────────────────────
{
  const page = await open("/", 375);
  const openBtn = page.locator("button[aria-label='Open menu']");
  await openBtn.click(); await page.waitForTimeout(600);
  const panelLinks = page.locator("button[aria-label='Close menu'] ~ div a");
  check("mobile menu opens (aria-expanded=true)", (await page.locator("button[aria-label='Close menu']").getAttribute("aria-expanded")) === "true");
  check("mobile menu links visible", (await panelLinks.count()) > 0 && (await panelLinks.first().isVisible()));
  await page.locator("button[aria-label='Close menu']").click(); await page.waitForTimeout(600);
  check("mobile menu closes via button", (await page.locator("button[aria-label='Open menu']").getAttribute("aria-expanded")) === "false");
  await page.locator("button[aria-label='Open menu']").click(); await page.waitForTimeout(600);
  await page.keyboard.press("Escape"); await page.waitForTimeout(600);
  check("mobile menu closes via Escape", (await page.locator("button[aria-expanded]").first().getAttribute("aria-expanded")) === "false", "Escape does nothing (no key handler in MobileMenu.tsx)");
  if ((await page.locator("button[aria-label='Close menu']").count()) > 0) await page.locator("button[aria-label='Close menu']").click();
  await page.waitForTimeout(500);
  check("body scroll restored after menu closes", await page.evaluate(() => getComputedStyle(document.body).overflow !== "hidden" && getComputedStyle(document.documentElement).overflow !== "hidden"));
  await page.close();
}

// ── 6. Sign-in / sign-up ────────────────────────────────────────────────────────────────────────
for (const mode of ["signin", "signup"]) {
  const path = mode === "signup" ? "/sign-in?mode=signup" : "/sign-in";
  const page = await open(path);
  const hits = [];
  await page.route(/app\.raisetalks\.com/, (route) => { hits.push(route.request().url()); route.fulfill({ status: 200, contentType: "text/html", body: "<title>app (intercepted)</title>" }); });
  await page.locator("form button.btn-primary[type=submit]").click();
  await page.waitForTimeout(300);
  const invalid = await page.locator("[aria-invalid=true]").count();
  check(`sign-in ${mode}: empty submit shows errors`, invalid >= (mode === "signup" ? 3 : 2), `${invalid} invalid fields`);
  if (mode === "signup") await page.fill("input[name=name]", "QA Tester");
  await page.fill("input[name=email]", "qa@example.com");
  await page.fill("input[name=password]", "correct-horse-battery");
  await page.locator("form button.btn-primary[type=submit]").click();
  await page.waitForTimeout(1500);
  check(`sign-in ${mode}: valid submit goes to app.raisetalks.com`, hits.some((u) => u.includes("email=qa%40example.com")), hits.join(", ") || "no request to app.raisetalks.com");
  await page.close();
}

// ── 7. Newsletter ───────────────────────────────────────────────────────────────────────────────
{
  const page = await open("/");
  await page.locator("#newsletter-email").scrollIntoViewIfNeeded();
  await page.fill("#newsletter-email", "not-an-email");
  await page.locator("#newsletter-email").locator("xpath=ancestor::form").locator("button[type=submit]").click();
  await page.waitForTimeout(300);
  check("newsletter: invalid email shows error", await page.locator("#newsletter-error").isVisible());
  await page.fill("#newsletter-email", "qa-newsletter@example.com");
  await page.locator("#newsletter-email").locator("xpath=ancestor::form").locator("button[type=submit]").click();
  await page.waitForTimeout(1800);
  check("newsletter: valid email shows thank-you", await page.locator("footer [role=status]").isVisible().catch(() => false));
  if (serverLog && existsSync(serverLog)) {
    check("newsletter: server log shows the mock call", readFileSync(serverLog, "utf8").includes("[forms:mock] subscribe") && readFileSync(serverLog, "utf8").includes("qa-newsletter@example.com"));
  } else skip("newsletter: server log", "QA_SERVER_LOG not set / remote deploy");
  await page.close();
}

// ── 8. Every internal link returns 200 ──────────────────────────────────────────────────────────
for (const href of [...internal].sort()) {
  const res = await ctx.request.get(base + href, { maxRedirects: 5 }).catch(() => null);
  check(`internal link ${href} → 200`, !!res && res.status() === 200, `status ${res?.status()}`);
}

await browser.close();
console.log(`\nQA: ${pass + fails.length} checks, ${pass} pass, ${fails.length} fail`);
for (const f of fails) console.log("  FAIL:", f);
process.exit(fails.length ? 1 : 0);
