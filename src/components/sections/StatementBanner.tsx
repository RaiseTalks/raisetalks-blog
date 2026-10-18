import type { Art } from "@/content/marketing/shared";
import { art } from "@/content/marketing/shared";
import { ArtFill } from "@/components/ui/ArtImage";
import { Band } from "@/components/layout/Band";
import { Reveal } from "@/components/motion";

/**
 * Full-width blue statement card with soft texture (Home 3257:1081, Investors 1430:769 …).
 * Background (Drop 18): wide SVG pattern on the 1480 column (Home, legal), narrow one on the 1024 column; own tablet/mobile files.
 * width "medium" = rails at 1024 on laptop+ (Investors, Startups). mobileLeft = left-aligned below tablet (Investors).
 */
export function StatementBanner({ text, image, size = "h3", width = "content", mobileLeft = false }: { text: string; image?: Art; size?: "h3" | "body"; width?: "content" | "medium"; mobileLeft?: boolean }) {
  const align = mobileLeft ? "text-left tablet:text-center" : "text-center";
  return (
    <Band pad={false} width={width}>
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-lg border border-brand-light-blue bg-brand-light-blue px-5 py-8 tablet:p-10 laptop:p-12">
          <ArtFill art={image ?? (width === "medium" ? art.band : art.bandWide)} sizes={width === "medium" ? "(min-width: 1280px) 1024px, 100vw" : "(min-width: 1680px) 1480px, 100vw"} className="-z-10 object-cover" />
          <p className={`whitespace-pre-line text-on-brand ${align} ${size === "h3" ? "text-h4 tablet:text-h3" : "text-body tablet:text-h4"}`}>{text}</p>
        </div>
      </Reveal>
    </Band>
  );
}
