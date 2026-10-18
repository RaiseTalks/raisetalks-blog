import {
  Ban, BarChart3, Bell, BrainCog, CalendarClock, Check, ClipboardCheck, FileCheck, FileStack, FileText, Film, FolderOpen,
  FolderTree, Gauge, Gift, Handshake, LayoutGrid, ListTodo, Lock, MessageCircle, MessageSquareLock, Rocket, Scale,
  Search, ShieldCheck, CalendarCheck, Headset, Notebook, UserStar, Timer, ListFilterPlus, TagX, Gavel, DollarSign,
  Landmark, Database, Columns3Cog, MessageSquarePlus, Workflow, ToggleRight, Lightbulb, BadgeCheck, Camera, Sparkles,
  BookOpen, Link, ListChecks, Send, Palette, Presentation, ChartLine, FilePenLine, Award, SquarePlay, Stethoscope, Target, TrendingUp, Users, Zap, type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/marketing/shared";
import { cn } from "@/lib/utils";

const map: Record<IconName, LucideIcon> = {
  gauge: Gauge, "message-square-lock": MessageSquareLock, "file-check": FileCheck, "folder-tree": FolderTree,
  "list-todo": ListTodo, "file-stack": FileStack, "shield-check": ShieldCheck, stethoscope: Stethoscope,
  "brain-cog": BrainCog, "square-play": SquarePlay, film: Film, check: Check, users: Users, target: Target,
  handshake: Handshake, sparkles: Sparkles, search: Search, "bar-chart-3": BarChart3, "layout-grid": LayoutGrid,
  "file-text": FileText, "message-circle": MessageCircle, bell: Bell, "trending-up": TrendingUp,
  "clipboard-check": ClipboardCheck, scale: Scale, "folder-open": FolderOpen, zap: Zap, gift: Gift, rocket: Rocket,
  lock: Lock, "calendar-clock": CalendarClock, ban: Ban,
  "calendar-check": CalendarCheck, headset: Headset, notebook: Notebook, "user-star": UserStar, timer: Timer,
  "list-filter-plus": ListFilterPlus, "tag-x": TagX, gavel: Gavel, "dollar-sign": DollarSign, landmark: Landmark,
  database: Database, "columns-3-cog": Columns3Cog, "message-square-plus": MessageSquarePlus, workflow: Workflow,
  "toggle-right": ToggleRight, lightbulb: Lightbulb, "badge-check": BadgeCheck, camera: Camera,
  "book-open": BookOpen, link: Link, "list-checks": ListChecks, send: Send, palette: Palette, presentation: Presentation,
  "chart-line": ChartLine, "file-pen-line": FilePenLine, award: Award,
};

/**
 * Content icons (lucide). One standard size for every content icon (Figma icon frame 3488:7675, Drop 15):
 * 32px mobile / 36px tablet / 42px laptop+, stroke 2.5 / 2.5 / 3px real pixels (`.icon-std`, components.css).
 * tone "audience" = gradient stroke that
 * follows data-audience (blue ↔ yellow→red); "blue" = solid light blue.
 * The gradient spans the whole 24px icon box (userSpaceOnUse): a per-shape box made straight
 * lines (e.g. list-todo, "AI Readiness Score") invisible, since a flat line has no box height.
 */
export function Icon({ name, tone = "audience", className }: { name: IconName; tone?: "audience" | "blue"; className?: string }) {
  const Cmp = map[name];
  if (tone === "blue") return <Cmp className={cn("icon-std text-brand-light-blue", className)} aria-hidden />;
  const id = `ig-${name}`;
  return (
    <span className={cn("relative inline-flex shrink-0", className)} aria-hidden>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="24" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--audience-from)" }} />
            <stop offset="100%" style={{ stopColor: "var(--audience-to)" }} />
          </linearGradient>
        </defs>
      </svg>
      <Cmp className="icon-std" stroke={`url(#${id})`} />
    </span>
  );
}
