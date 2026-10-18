import { getPosts } from "@/lib/blog/posts";
import { site } from "@/content/site";

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
  ["Blog", "/blog/", "How investors evaluate early-stage startups: data rooms, diligence, benchmarks and dealflow."],
];

export function GET() {
  const base = site.url.replace(/\/$/, "");
  const line = (name: string, href: string, description?: string) => `- [${name}](${base}${href})${description ? `: ${description}` : ""}`;
  const posts = [...getPosts()].sort((a, b) => a.slug.localeCompare(b.slug));
  const text = [
    `# ${site.name}`,
    "",
    "> AI-Powered Fundraising for Startups and Investors. RaiseTalks is a fundraising workspace for early-stage startups and investors: a structured 143-field data room with tiered access, an AI readiness score, and pipelines for both sides.",
    "",
    "## Pages",
    "",
    ...PAGES.map(([n, h, d]) => line(n, h, d)),
    "",
    "## Blog",
    "",
    ...posts.map((p) => line(p.title, `/blog/${p.slug}/`, p.description)),
    "",
  ].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
