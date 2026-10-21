import type { ReactNode } from "react";
import type { Art, Cta, Heading } from "@/content/marketing/shared";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArtFill } from "@/components/ui/ArtImage";
import { Reveal } from "@/components/motion";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

/**
 * Centred page hero (Home 3257:1052, About 1285:943, Investors 1296:286 …):
 * soft background image (desktop / tablet / mobile files, Drop 18), bordered 948px column, eyebrow pill, H1 + italic accent, text, CTAs.
 * `after` renders below the column but still over the background (Home logo marquee).
 * `columnClassName` tweaks the bordered column (Home: 96px top/bottom on mobile).
 * Mobile: CTAs stacked full width on inner pages (`stackButtons`, Drop 14); Home keeps its row.
 * `headingFlow`: mobile heading runs on as one text and wraps naturally (Decoder).
 * `headingSize`: "h2" renders the H1 at H2 size (Pricing, Drop 21).
 * `imageFit`: "contain" shows the whole background centred instead of cropping it to fill (taller heroes: Decoder, Pitch Competitions).
 * `intro` (Drop 23 Home; every hero since Drop 24, default on): Linear-style load sequence in pure CSS (components.css `.hero-intro-*`), no JS, so it
 * starts at first paint: headline → text → buttons → background → eyebrow + `after`. Each fades in, un-blurs and rises 8px.
 */
function Step({ intro, step, delay = 0, className, children }: { intro: boolean; step: number; delay?: number; className?: string; children: ReactNode }) {
  if (intro) return <div className={cn(`hero-intro hero-intro-${step}`, className)}>{children}</div>;
  return <Reveal delay={delay} className={className}>{children}</Reveal>;
}

export function PageHero({
  eyebrow, eyebrowStyle = "pill", heading, text, primary, secondary, image, after, children, className, columnClassName, textWidth = "max-w-[360px]", headingWidth = "max-w-[678px]", stackButtons = true, headingFlow = false, headingSize = "h1", intro = true, imageFit = "cover",
}: {
  eyebrow?: string; eyebrowStyle?: "pill" | "orbit" | "plain"; heading: Heading; text?: string; primary?: Cta; secondary?: Cta; image?: Art;
  after?: ReactNode; children?: ReactNode; className?: string; columnClassName?: string; textWidth?: string; headingWidth?: string;
  stackButtons?: boolean; headingFlow?: boolean; headingSize?: "h1" | "h2"; intro?: boolean; imageFit?: "cover" | "contain";
}) {
  const badge = eyebrow && (eyebrowStyle !== "plain"
    ? <Badge variant={eyebrowStyle === "orbit" ? "eyebrow-orbit" : "eyebrow"}>{eyebrow}</Badge>
    : <p className="text-eyebrow text-brand-light-blue">{eyebrow}</p>);
  const headline = <Headline as="h1" size={headingSize} align="center" lead={heading.lead} accent={heading.accent} mobileFlow={headingFlow} className={headingWidth} />;
  const copy = text && <p className={cn("text-body text-copy", textWidth)}>{text}</p>;
  return (
    <section className={cn("relative isolate overflow-hidden bg-page", className)}>
      {image && (
        <ArtFill art={image} sizes="100vw" priority className={cn("-z-10", imageFit === "contain" ? "object-contain object-center" : "object-cover", intro && "hero-intro hero-intro-bg hero-intro-3")} />
      )}
      <div className="mx-2 tablet:mx-auto tablet:max-w-hero">
        <div className={cn("flex flex-col items-center gap-8 border-x border-rail-1 px-4 pb-14 pt-16 text-center tablet:gap-9 tablet:px-16 tablet:pb-16 tablet:pt-24 laptop:pb-20 laptop:pt-32", columnClassName)}>
          {intro ? (
            <div className="flex flex-col items-center gap-4">
              {badge && <div className="hero-intro hero-intro-4">{badge}</div>}
              <div className="hero-intro hero-intro-0">{headline}</div>
              {copy && <div className={cn("hero-intro hero-intro-1", textWidth)}>{copy}</div>}
            </div>
          ) : (
            <Reveal className="flex flex-col items-center gap-4">{badge}{headline}{copy}</Reveal>
          )}
          {(primary || secondary) && (
            <Step intro={intro} step={2} delay={0.1} className={stackButtons ? "flex w-full flex-col gap-4 tablet:w-auto tablet:flex-row tablet:flex-wrap tablet:items-center tablet:justify-center tablet:gap-6" : "flex flex-wrap items-center justify-center gap-4 tablet:gap-6"}>
              {primary && <Button variant="primary" size="lg" href={primary.href} external={primary.external} className={cn(stackButtons && "w-full tablet:w-auto")}>{primary.label}</Button>}
              {secondary && <Button variant="ghost" size="lg" href={secondary.href} external={secondary.external} className={cn(stackButtons && "w-full tablet:w-auto")}>{secondary.label}</Button>}
            </Step>
          )}
          {children && intro ? <div className="hero-intro hero-intro-4 flex w-full justify-center">{children}</div> : children}
        </div>
      </div>
      {after && intro ? <div className="hero-intro hero-intro-4">{after}</div> : after}
    </section>
  );
}
