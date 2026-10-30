import { getPosts } from "@/lib/blog/posts";
import { site } from "@/content/site";
import { home } from "@/content/marketing/home";
import { pricing, type Plan } from "@/content/marketing/pricing";
import { startups } from "@/content/marketing/startups";

/**
 * /llms.txt: a plain-text index of the site and every live blog post, the format AI assistants and answer
 * engines read to find a site's canonical content. New posts appear on their publish day, without edits here.
 */
export const dynamic = "force-static";

const PAGES: [string, string, string][] = [
  ["About RaiseTalks", "/about/", "Who we are and why we build RaiseTalks."],
  ["For startups", "/startups/", "Structured data room, readiness score and investor pipeline for founders."],
  ["For investors", "/investors/", "Dealflow, scoring and diligence tools for angels, micro-funds and VCs."],
  ["Pricing", "/pricing/", "Plans and the 30-day trial."],
  ["Support", "/support/", "Video guide, how-tos, answers on trials, billing and your data, and email help from the team."],
  ["Trust Center", "/trust/", "Security controls, AI transparency and the EU AI Act assessment."],
  ["Blog", "/blog/", "How investors evaluate early-stage startups: data rooms, diligence, benchmarks and dealflow."],
];

/**
 * "Key facts:" block, after the summary and before the first H2 (the llms.txt format allows plain, non-heading
 * sections there). Every value is read from the page copy in src/content, so the file says what the pages say.
 * The data-room and access lines are found by pattern, not by their text: a copy edit (a new field count) reaches
 * this file with no code change, and the build fails only when the fact is gone from the page. Today's exact text
 * is asserted by scripts/check-seo.mjs, run by hand before a push.
 */
function keyFacts(): string[] {
  const checks = startups.features.rows.flatMap((r) => r.checks);
  const pick = (pattern: RegExp, what: string) => {
    const hit = checks.find((c) => pattern.test(c));
    if (!hit) {
      throw new Error(`llms.txt key facts: no ${what} line in startups.features.rows[*].checks (src/content/marketing/startups.ts) matches ${pattern}.`);
    }
    return hit;
  };
  const dataRoom = pick(/structured sections.*\bfields\b/i, "data-room");
  const access = pick(/\baccess tiers\b/i, "access-tier");

  // Typed as Plan[] so `price` and `priceNote` read as optional: one of them is each plan's published terms.
  const plans: Plan[] = pricing.plans;
  const per = pricing.billing.per;
  const planLines = plans.map((p) => {
    const terms = p.price ? `${p.price.monthly}${per.monthly} or ${p.price.annual}${per.annual}` : p.priceNote;
    if (!terms) {
      throw new Error(`llms.txt key facts: plan "${p.id}" in src/content/marketing/pricing.ts has neither a price nor a priceNote.`);
    }
    return `  - ${p.name} (${p.audience}): ${terms}`;
  });

  // Stats as the Testimonial section shows them: a space only before a unit longer than one character.
  const founder = home.workspace.testimonial;
  const stats = founder.stats.map((s) => `${s.value}${s.unit ? (s.unit.length > 1 ? " " : "") + s.unit : ""} ${s.label}`);

  return [
    "Key facts:",
    "",
    `- App: ${site.links.app}`,
    `- Data room: ${dataRoom}`,
    `- Access: ${access}`,
    "- Plans:",
    ...planLines,
    `- Founder: ${founder.name}, ${founder.role} (${stats.join("; ")})`,
    `- App llms.txt: ${site.links.app}/llms.txt`,
  ];
}

/**
 * The two MCP servers, one line each, and a pointer to the app's llms.txt for the connection steps (story 065.04).
 * Absolute URLs, so not built with line(), which prefixes this site's origin.
 */
function mcpSection(): string[] {
  return [
    "## Connect an AI assistant (MCP)",
    "",
    `- [RaiseTalks MCP server](${site.mcp.url}): For founders and investors. Founders with a subscription or trial build and update their data room; investors browse startups and manage their dealflow pipeline. Users sign in with their RaiseTalks account.`,
    `- [RaiseTalks Pitch Deck Importer](${site.mcp.importerUrl}): For investors. Creates unclaimed startup profiles from pitch decks the investor holds. Needs an investor subscription or trial.`,
    `- [Connection steps](${site.links.app}/llms.txt): Setup for Claude, ChatGPT and Claude Code, and what each server's tools do.`,
  ];
}

export function GET() {
  const base = site.url.replace(/\/$/, "");
  const line = (name: string, href: string, description?: string) => `- [${name}](${base}${href})${description ? `: ${description}` : ""}`;
  const posts = [...getPosts()].sort((a, b) => a.slug.localeCompare(b.slug));
  const text = [
    `# ${site.name}`,
    "",
    "> AI-Powered Fundraising for Startups and Investors. RaiseTalks is a fundraising workspace for early-stage startups and investors: a structured 143-field data room with tiered access, an AI readiness score, and pipelines for both sides.",
    "",
    ...keyFacts(),
    "",
    "## Pages",
    "",
    ...PAGES.map(([n, h, d]) => line(n, h, d)),
    "",
    ...mcpSection(),
    "",
    "## Blog",
    "",
    ...posts.map((p) => line(p.title, `/blog/${p.slug}/`, p.description)),
    "",
  ].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
