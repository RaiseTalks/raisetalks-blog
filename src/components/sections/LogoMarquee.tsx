import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { cn } from "@/lib/utils";

type Logo = { src: string; alt: string; width: number; height: number };

/**
 * Endless, slow logo strip with faded edges (Home 3257:1066). Never pauses; drag left/right (Marquee).
 * The list is rendered twice for a seamless loop; the copy is aria-hidden.
 */
export function LogoMarquee({ logos, label = "Our backers and partners", className }: { logos: Logo[]; label?: string; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12 tablet:gap-[70px] tablet:pr-[70px]" aria-hidden={hidden || undefined}>
      {logos.map((l, i) => (
        <li key={`${l.src}-${i}`} className="shrink-0">
          <Image src={l.src} alt={hidden ? "" : l.alt} width={l.width} height={l.height} draggable={false} className="h-7 w-auto tablet:h-[38px]" />
        </li>
      ))}
    </ul>
  );
  return (
    <Marquee label={label} className={cn("py-6 tablet:py-9", className)}>
      {row(false)}
      {row(true)}
    </Marquee>
  );
}
