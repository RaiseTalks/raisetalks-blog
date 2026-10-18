import Image, { getImageProps } from "next/image";
import type { Art, ArtImg, Img } from "@/content/marketing/shared";

/**
 * Art direction (Drop 18): a different file per breakpoint, built on `getImageProps` (Next docs, "Art Direction"),
 * each source is served as the supplied file (images.unoptimized since Drop 23: no re-compression). desktop = laptop+ (>=1280), tablet = 768-1279, mobile = <768.
 * Missing tablet -> desktop is used there; missing mobile -> tablet, else desktop.
 * Media queries match --breakpoint-tablet / --breakpoint-laptop in tokens.css; keep them in sync.
 */
const MOBILE = "(max-width: 767.98px)";
const TABLET = "(max-width: 1279.98px)";

type Props = ReturnType<typeof getImageProps>["props"];
/** SVGs are served unoptimized, so they have no srcSet: fall back to the plain src. */
const srcSetOf = (p: Props) => p.srcSet ?? p.src;

/** Background image that fills its positioned parent (like `<Image fill>`). A plain string = one file for every width. */
export function ArtFill({ art, alt = "", sizes, className, priority = false }: { art: Art; alt?: string; sizes: string; className?: string; priority?: boolean }) {
  if (typeof art === "string") return <Image src={art} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  // getImageProps must not get `priority` (it would preload only one file): eager + high fetch priority instead
  const props = (src: string) =>
    getImageProps({ src, alt, fill: true, sizes, ...(priority && { loading: "eager" as const, fetchPriority: "high" as const }) }).props;
  return (
    <picture>
      {art.mobile && <source media={MOBILE} srcSet={srcSetOf(props(art.mobile))} sizes={sizes} />}
      {art.tablet && <source media={TABLET} srcSet={srcSetOf(props(art.tablet))} sizes={sizes} />}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- getImageProps output, alt included */}
      <img {...props(art.desktop)} className={className} />
    </picture>
  );
}

/** In-flow image whose shape can change per breakpoint: each source declares its own width/height (no layout shift). */
export function ArtSized({ art, sizes, className }: { art: ArtImg; sizes: string; className?: string }) {
  const props = (i: Img) => getImageProps({ src: i.src, width: i.width, height: i.height, alt: art.alt, sizes }).props;
  const source = (i: Img | undefined, media: string) =>
    i && <source media={media} srcSet={srcSetOf(props(i))} sizes={sizes} width={i.width} height={i.height} />;
  return (
    <picture>
      {source(art.mobile, MOBILE)}
      {source(art.tablet, TABLET)}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- getImageProps output, alt included */}
      <img {...props(art.desktop)} className={className} />
    </picture>
  );
}
