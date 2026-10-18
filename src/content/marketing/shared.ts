// Content types + blocks shared by several pages. Owner: Studio (A)
import { site } from "@/content/site";

export type Cta = { label: string; href: string; external?: boolean };
export type Heading = { lead: string; accent?: string };
export type IconName =
  | "gauge" | "message-square-lock" | "file-check" | "folder-tree" | "list-todo" | "file-stack" | "shield-check"
  | "stethoscope" | "brain-cog" | "square-play" | "film" | "check" | "users" | "target" | "handshake"
  | "sparkles" | "search" | "bar-chart-3" | "layout-grid" | "file-text" | "message-circle" | "bell" | "trending-up"
  | "clipboard-check" | "scale" | "folder-open" | "zap" | "gift" | "rocket" | "lock" | "calendar-clock" | "ban"
  | "calendar-check" | "headset" | "notebook" | "user-star" | "timer" | "list-filter-plus" | "tag-x" | "gavel"
  | "dollar-sign" | "landmark" | "database" | "columns-3-cog" | "message-square-plus" | "workflow" | "toggle-right"
  | "lightbulb" | "badge-check" | "camera"
  // Affiliate Pro Toolkit (Drop 21)
  | "book-open" | "link" | "list-checks" | "send" | "palette" | "presentation" | "chart-line" | "file-pen-line" | "award";

/**
 * Art direction (Drop 18, see ui/ArtImage): one file per breakpoint. desktop = laptop+ (>=1280), tablet = 768-1279,
 * mobile = <768. Missing tablet -> desktop; missing mobile -> tablet, else desktop. A plain string = one file everywhere.
 */
export type ArtSet = { desktop: string; tablet?: string; mobile?: string };
export type Art = string | ArtSet;
export type Img = { src: string; width: number; height: number };
/** In-flow image with its own shape per breakpoint (declared sizes = the real files, docs/assets.md). */
export type ArtImg = { desktop: Img; tablet?: Img; mobile?: Img; alt: string };

/** Shared backgrounds, final designer files (B-06). */
export const art = {
  /** Every hero except Home. */
  heroAlt: { desktop: "/images/shared/hero-alt-desktop.webp", tablet: "/images/shared/hero-alt-tablet.webp", mobile: "/images/shared/hero-alt-mobile.webp" },
  /** Blue band under the hero: wide (Home, legal pages, 1480 column) and narrow (inner pages, 1024 column). */
  bandWide: { desktop: "/images/home/hero-band-desktop-wide.svg", tablet: "/images/shared/hero-band-tablet.svg", mobile: "/images/shared/hero-band-mobile.svg" },
  band: { desktop: "/images/shared/hero-band-desktop.svg", tablet: "/images/shared/hero-band-tablet.svg", mobile: "/images/shared/hero-band-mobile.svg" },
  /** Blue rounded / full-width panels (How It Works, Pitch steps, Decoder testimonials). */
  panel: { desktop: "/images/shared/blue-panel-pattern-desktop.webp", tablet: "/images/shared/blue-panel-pattern-tablet.webp", mobile: "/images/shared/blue-panel-pattern-mobile.webp" },
  /** Dark CTA band before the footer (every page). */
  cta: { desktop: "/images/shared/cta-desktop.webp", tablet: "/images/shared/cta-tablet.webp", mobile: "/images/shared/cta-mobile.webp" },
} satisfies Record<string, ArtSet>;

/** Founder portrait cut-out, used on Home (quote card) and Investors (quote). */
export const dariiaPortrait: Img = { src: "/images/shared/dariia-portrait.webp", width: 888, height: 900 };

export type CtaBandContent = { heading: Heading; text: string; primary: Cta; secondary?: Cta };

export const links = {
  // All sign-up / sign-in CTAs go to the local page, which hands off to app.raisetalks.com.
  signUp: { href: "/sign-in?mode=signup", external: false },
  signIn: { href: "/sign-in", external: false },
  demo: { href: site.links.demo, external: true },
  tv: { href: "https://tv.raisetalks.com", external: true }, // live domain, as on the old site
};

/** Home CTA 3257:1384 — default for pages without their own. */
export const defaultCta: CtaBandContent = {
  heading: { lead: "Fundraising isn't guesswork.", accent: "It's an investment process." },
  text: "RaiseTalks helps you run it like a pro — automated data rooms, real investor insights, and deal-ready files.",
  primary: { label: "Try it Free", ...links.signUp },
  secondary: { label: "Book a Demo", ...links.demo },
};

/**
 * Partner / backer logos (Home 3257:1068, About 1285:1154). Final files (B-06): 360x120, Step + Founders to Founders 240x120,
 * each with its own padding baked in. Figma order, then the 3 new ones (Drop 18).
 */
const logo = (file: string, alt: string, width = 360) => ({ src: `/images/home/logos/${file}.webp`, alt, width, height: 120 });
export const partnerLogos = [
  logo("grechka-media", "Grechka Media"),
  logo("global-ai-show", "Global AI Show"),
  logo("nvidia", "NVIDIA"),
  logo("step", "Step", 240),
  logo("dubai-ai-festival", "Dubai AI Festival"),
  logo("microsoft-for-startups", "Microsoft for Startups"),
  logo("web-summit", "Web Summit"),
  logo("founder-institute", "Founder Institute"),
  logo("nlsql", "NLSQL"),
  logo("getvision", "GetVision"),
  logo("al-liwan", "Al Liwan Labs"),
  logo("aws", "AWS"),
  logo("founders-to-founders", "Founders to Founders", 240),
];
