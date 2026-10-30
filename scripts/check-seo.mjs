// Structured data and llms.txt check for a static build (story 065.03). Run by hand before a push; not wired
// into deploy.yml, so a failure here never stops the weekday rebuild that publishes scheduled posts.
//
// Usage: NEXT_PUBLIC_SITE_URL=https://raisetalks.com npm run build
//        node scripts/check-seo.mjs out [<baseline-out>]
//
// <baseline-out> is a copy of `out/` built from `main` before the change, on the same day (posts go live by date).
// With it, the script also proves that nothing else moved: BlogPosting/FAQPage, the rest of llms.txt, the 2025
// stub, robots.txt, sitemap.xml, the feeds and the Support/Trust JSON-LD.
//
// The build only checks structure (src/app/(marketing)/page.tsx, src/app/(feeds)/llms.txt/route.ts), so a copy
// edit never breaks it. Today's exact values live here: when the published copy changes on purpose (a new field
// count, a fifth Community profile, a price), update the expectation below in the same commit.
//
// Node built-ins only. Exit 1 on the first failed group, after printing every failure in that group.
import fs from "node:fs";
import path from "node:path";
import util from "node:util";

const ORIGIN = "https://raisetalks.com";
const BUILD_HINT = "run `NEXT_PUBLIC_SITE_URL=https://raisetalks.com npm run build` first";

/** AC 1: the home page's one JSON-LD block, exactly. */
const HOME_EXPECTED = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${ORIGIN}/#organization`,
      name: "RaiseTalks",
      url: `${ORIGIN}/`,
      logo: `${ORIGIN}/favicon/android-chrome-512x512.png`,
      description: "One workspace for founders and investors: data rooms, readiness scoring, diligence-ready deal flow.",
      founder: { "@type": "Person", name: "Dr. Dariia Vasylieva", jobTitle: "Founder & CEO" },
      sameAs: [
        "https://linkedin.com/company/raisetalks",
        "https://youtube.com/@raisetalks",
        "https://instagram.com/raisetalks",
        "https://facebook.com/raisetalks",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      name: "RaiseTalks",
      url: `${ORIGIN}/`,
      publisher: { "@id": `${ORIGIN}/#organization` },
    },
  ],
};

/** AC 3: the block between the summary and `## Pages` (today's content; the build finds these lines by pattern). */
const KEY_FACTS_EXPECTED = [
  "Key facts:",
  "",
  "- App: https://app.raisetalks.com",
  "- Data room: 22 structured sections and 143 fields, purpose-built for investor evaluation",
  "- Access: Four access tiers - Public, Basic, Due Diligence, Owner - with field-level control",
  "- Plans:",
  "  - Startup Pro (For Founders): $99/mo or $699/yr",
  "  - Investor Pro (For Investors): $199/mo or $1,428/yr",
  "  - VC Platinum (For Venture Funds): Contact us",
  "- Founder: Dr. Dariia Vasylieva, Founder & CEO, RaiseTalks (€3B+ in closed deals; 10k+ startups reviewed; 17 years on the investment side)",
  "- App llms.txt: https://app.raisetalks.com/llms.txt",
  "",
];

/** AC 4: the 2025 stub keeps its canonical, refresh and body link; only the noindex line is gone. */
const STUB = "blog/data-room-checklist-pre-seed-startups-2025/index.html";
const STUB_NOINDEX = '<meta name="robots" content="noindex">';
const STUB_KEEP = [
  '<link rel="canonical" href="https://raisetalks.com/blog/data-room-checklist-pre-seed-seed-startups/">',
  '<meta http-equiv="refresh" content="0; url=/blog/data-room-checklist-pre-seed-seed-startups/">',
  '<a href="/blog/data-room-checklist-pre-seed-seed-startups/">',
];

/** SC8: the home `logo` file, under the legacy /favicon/** path. Google needs at least 112 x 112. */
const LOGO = "favicon/android-chrome-512x512.png";
const LOGO_MIN = 112;

/** AC 8: files this story must not change. */
const UNCHANGED_FILES = ["robots.txt", "sitemap.xml", "blog/rss.xml", "blog/atom.xml"];
const UNCHANGED_JSONLD = ["support/index.html", "trust/index.html"];

// ---------------------------------------------------------------------------------------------------------------

const [outArg, baseArg] = process.argv.slice(2);
if (!outArg) {
  console.error("usage: node scripts/check-seo.mjs <out> [<baseline-out>]");
  process.exit(2);
}
const out = path.resolve(outArg);
const baseline = baseArg ? path.resolve(baseArg) : null;

let checks = 0;
function group(name, run) {
  const failures = [];
  const before = checks;
  const fail = (msg) => failures.push(msg);
  const check = (ok, msg) => {
    checks += 1;
    if (!ok) fail(typeof msg === "function" ? msg() : msg);
    return ok;
  };
  run(check, fail);
  if (failures.length) {
    console.log(`FAIL ${name}`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log(`ok   ${name} (${checks - before} checks)`);
}

const read = (dir, rel) => fs.readFileSync(path.join(dir, rel), "utf8");
const exists = (dir, rel) => fs.existsSync(path.join(dir, rel));
const show = (v) => util.inspect(v, { depth: null, breakLength: 120 });

/** Bodies of every <script type="application/ld+json"> in an HTML file. */
function jsonLdBodies(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
}

/** Paths (from the root of the value) of every null, "", [] or {} inside a parsed JSON-LD value (AC 6). */
function emptyValues(value, at = "$") {
  if (value === null || value === "") return [at];
  if (Array.isArray(value)) return value.length ? value.flatMap((v, i) => emptyValues(v, `${at}[${i}]`)) : [at];
  if (typeof value === "object") {
    const keys = Object.keys(value);
    return keys.length ? keys.flatMap((k) => emptyValues(value[k], `${at}.${k}`)) : [at];
  }
  return [];
}

/** Post pages: blog/<slug>/index.html whose JSON-LD holds a BlogPosting. */
function postPages(dir) {
  const blogDir = path.join(dir, "blog");
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(blogDir, d.name, "index.html")))
    .map((d) => d.name)
    .filter((slug) => jsonLdBodies(read(dir, `blog/${slug}/index.html`)).some((b) => b.includes('"@type":"BlogPosting"')))
    .sort();
}

const lines = (text) => text.split("\n");

// --- inputs: never skip, fail with the fix ----------------------------------------------------------------------

let posts = [];
group("inputs", (check) => {
  check(fs.existsSync(out), `no build output at ${out}: ${BUILD_HINT}`);
  for (const rel of ["index.html", "llms.txt", STUB]) check(exists(out, rel), `${rel} missing in ${out}: ${BUILD_HINT}`);
  if (baseline) {
    check(
      fs.existsSync(path.join(baseline, "index.html")),
      `no baseline build at ${baseline}: build \`main\` the same way and copy \`out/\` there (\`cp -r out ${baseline}\`)`,
    );
  }
  posts = fs.existsSync(out) ? postPages(out) : [];
  check(posts.length > 0, `no post page (blog/<slug>/index.html with a BlogPosting) in ${out}: ${BUILD_HINT}`);
});

// --- AC 5 + 6: every block parses, carries no raw "<", holds no empty value --------------------------------------

const pages = { home: "index.html", ...Object.fromEntries(posts.map((s) => [s, `blog/${s}/index.html`])) };
const parsed = {};
group(`AC 5 + 6: JSON-LD parses, "<" escaped, no empty value (home + ${posts.length} post pages)`, (check) => {
  for (const [name, rel] of Object.entries(pages)) {
    parsed[name] = jsonLdBodies(read(out, rel)).map((body, i) => {
      check(!body.includes("<"), `${rel} block ${i}: raw "<" in the JSON-LD (write it with .replace(/</g, "\\\\u003c"))`);
      let value;
      try {
        value = JSON.parse(body);
      } catch (e) {
        check(false, `${rel} block ${i}: JSON.parse failed: ${e.message}`);
        return undefined;
      }
      const empties = emptyValues(value);
      check(empties.length === 0, `${rel} block ${i}: empty value at ${empties.join(", ")}`);
      return value;
    });
  }
});

// --- AC 1: home @graph ------------------------------------------------------------------------------------------

group("AC 1: home Organization + WebSite", (check) => {
  const blocks = parsed.home;
  check(blocks.length === 1, `index.html has ${blocks.length} ld+json blocks, expected exactly 1`);
  const actual = blocks[0];
  check(util.isDeepStrictEqual(actual, HOME_EXPECTED), () => `index.html JSON-LD differs.\n    expected: ${show(HOME_EXPECTED)}\n    actual:   ${show(actual)}`);
  const text = JSON.stringify(actual ?? {});
  for (const absent of ["potentialAction", "SearchAction", "address", "legalName", "contactPoint", "twitter.com", "x.com/"]) {
    check(!text.includes(absent), `index.html JSON-LD must not contain ${absent}`);
  }
});

// --- SC8: the logo file the home `logo` points at -----------------------------------------------------------------

group(`SC8: ${LOGO} is a PNG of at least ${LOGO_MIN} x ${LOGO_MIN}`, (check) => {
  const fix = "restore `public/favicon/android-chrome-512x512.png` or change the home `logo` (src/app/(marketing)/page.tsx)";
  if (!check(exists(out, LOGO), `${LOGO} missing in ${out}: ${fix}`)) return;
  const buf = fs.readFileSync(path.join(out, LOGO));
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!check(buf.length >= 24 && buf.subarray(0, 8).equals(signature) && buf.toString("ascii", 12, 16) === "IHDR", `${LOGO} is not a PNG: ${fix}`)) return;
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  check(width >= LOGO_MIN && height >= LOGO_MIN, `${LOGO} is ${width} x ${height}, below ${LOGO_MIN} x ${LOGO_MIN}: ${fix}`);
  console.log(`     ${LOGO}: PNG ${width} x ${height}`);
});

// --- AC 2: BreadcrumbList on every post page; BlogPosting and FAQPage unchanged -----------------------------------

const basePosts = baseline ? postPages(baseline) : [];
group(`AC 2: BreadcrumbList on ${posts.length} post pages${baseline ? ", BlogPosting + FAQPage equal to the baseline" : ""}`, (check) => {
  if (baseline) {
    check(util.isDeepStrictEqual(posts, basePosts), `post pages differ from the baseline: ${posts.length} here, ${basePosts.length} there (build both on the same day, or pin BLOG_BUILD_DATE)`);
  }
  for (const slug of posts) {
    const rel = `blog/${slug}/index.html`;
    const blocks = parsed[slug];
    if (!check(blocks.length === 1 && Array.isArray(blocks[0]), `${rel}: expected one ld+json block holding an array, found ${blocks.length}`)) continue;
    const arr = blocks[0];
    const posting = arr.find((x) => x?.["@type"] === "BlogPosting");
    const crumbs = arr[arr.length - 1];
    const expected = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${ORIGIN}/blog/` },
        { "@type": "ListItem", position: 2, name: posting?.headline, item: `${ORIGIN}/blog/${slug}/` },
      ],
    };
    check(util.isDeepStrictEqual(crumbs, expected), () => `${rel}: last entry is not the expected BreadcrumbList.\n    expected: ${show(expected)}\n    actual:   ${show(crumbs)}`);
    check(posting?.mainEntityOfPage === `${ORIGIN}/blog/${slug}/`, `${rel}: BreadcrumbList item 2 must equal BlogPosting.mainEntityOfPage (${posting?.mainEntityOfPage})`);
    check(arr.filter((x) => x?.["@type"] === "BreadcrumbList").length === 1, `${rel}: more than one BreadcrumbList`);
    if (baseline) {
      if (!check(exists(baseline, rel), `${rel} missing in the baseline ${baseline}`)) continue;
      const baseBlocks = jsonLdBodies(read(baseline, rel)).map((b) => JSON.parse(b));
      check(
        baseBlocks.length === 1 && util.isDeepStrictEqual(arr.slice(0, -1), baseBlocks[0]),
        () => `${rel}: the entries before the BreadcrumbList (BlogPosting, FAQPage) differ from the baseline's`,
      );
    }
  }
  const third = posts.filter((s) => parsed[s][0]?.length === 3 && parsed[s][0][1]?.["@type"] === "FAQPage").length;
  console.log(`     BreadcrumbList is the third entry, after BlogPosting and FAQPage, on ${third} of ${posts.length} post pages`);
});

// --- AC 3: llms.txt key facts -----------------------------------------------------------------------------------

group(`AC 3: llms.txt key facts${baseline ? ", the rest equal to the baseline" : ""}`, (check) => {
  const text = read(out, "llms.txt");
  const l = lines(text);
  const pagesAt = l.indexOf("## Pages");
  if (!check(pagesAt > 4, "llms.txt: no `## Pages` heading after the summary")) return;
  check(l[0].startsWith("# ") && l[1] === "" && l[2].startsWith("> ") && l[3] === "", "llms.txt: lines 1-4 must be the H1, a blank line, the `>` summary and a blank line");
  const facts = l.slice(4, pagesAt);
  const n = Math.max(facts.length, KEY_FACTS_EXPECTED.length);
  for (let i = 0; i < n; i += 1) {
    check(facts[i] === KEY_FACTS_EXPECTED[i], `llms.txt line ${i + 5}:\n    expected: ${JSON.stringify(KEY_FACTS_EXPECTED[i])}\n    actual:   ${JSON.stringify(facts[i])}`);
  }
  check(!/mcp/i.test(facts.join("\n")), "llms.txt key facts: no MCP URL belongs in this block (065.04 adds the MCP lines)");
  const postLines = l.filter((x) => new RegExp(`^- \\[.+\\]\\(${ORIGIN.replace(/\./g, "\\.")}/blog/[^/)]+/\\)`).test(x));
  check(postLines.length === posts.length, `llms.txt lists ${postLines.length} posts, the build has ${posts.length} post pages`);
  if (baseline) {
    const b = lines(read(baseline, "llms.txt"));
    const bPagesAt = b.indexOf("## Pages");
    check(util.isDeepStrictEqual(l.slice(0, 4), b.slice(0, 4)), "llms.txt: the H1 and summary differ from the baseline's");
    check(bPagesAt === 4, "baseline llms.txt: expected `## Pages` right after the summary (is the baseline built from `main`?)");
    check(l.slice(pagesAt).join("\n") === b.slice(bPagesAt).join("\n"), "llms.txt: from `## Pages` to the end differs from the baseline");
  }
});

// --- AC 4: the 2025 stub ----------------------------------------------------------------------------------------

group("AC 4: 2025 stub without noindex", (check) => {
  const html = read(out, STUB);
  check(!html.includes("noindex"), `${STUB}: still has a noindex`);
  for (const keep of STUB_KEEP) check(html.includes(keep), `${STUB}: missing ${keep}`);
  if (baseline) {
    const before = read(baseline, STUB);
    check(before.includes(`${STUB_NOINDEX}\n`), `baseline ${STUB}: no noindex line to compare with (is the baseline built from \`main\`?)`);
    check(before.replace(`${STUB_NOINDEX}\n`, "") === html, `${STUB}: differs from the baseline by more than the noindex line`);
  }
});

// --- AC 8: everything else unchanged ----------------------------------------------------------------------------

if (baseline) {
  group("AC 8: robots.txt, sitemap.xml, feeds, Support and Trust JSON-LD equal to the baseline", (check) => {
    for (const rel of UNCHANGED_FILES) {
      if (!check(exists(out, rel) && exists(baseline, rel), `${rel} missing in ${out} or ${baseline}: ${BUILD_HINT}`)) continue;
      check(read(out, rel) === read(baseline, rel), `${rel}: differs from the baseline`);
    }
    for (const rel of UNCHANGED_JSONLD) {
      if (!check(exists(out, rel) && exists(baseline, rel), `${rel} missing in ${out} or ${baseline}: ${BUILD_HINT}`)) continue;
      const now = jsonLdBodies(read(out, rel));
      check(now.length > 0 && util.isDeepStrictEqual(now, jsonLdBodies(read(baseline, rel))), `${rel}: JSON-LD differs from the baseline`);
    }
    check(!read(out, "sitemap.xml").includes("data-room-checklist-pre-seed-startups-2025"), "sitemap.xml: the 2025 stub must stay out of the sitemap");
  });
  console.log(`PASS: ${checks} checks, ${posts.length} post pages, compared with the baseline ${baseline}`);
} else {
  // Not a skip that reports green: the line says which comparisons need a baseline and did not run.
  console.log(`PASS: ${checks} checks, ${posts.length} post pages. NOT compared (no baseline passed): AC 2 BlogPosting/FAQPage, AC 3 rest of llms.txt, AC 4 stub diff, AC 8`);
}
