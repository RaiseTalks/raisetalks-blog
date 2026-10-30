"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * YouTube facade: poster + red play button; loads the privacy-friendly iframe only on click.
 * Without a video id it opens the fallback link (channel) in a new tab.
 */
export function VideoEmbed({ youtubeId, title, poster, fallbackHref }: { youtubeId: string; title: string; poster: string; fallbackHref: string }) {
  const [play, setPlay] = useState(false);
  if (play && youtubeId) {
    return (
      <iframe
        className="aspect-video w-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return youtubeId
    ? <VideoPoster title={title} poster={poster} onPlay={() => setPlay(true)} />
    : <VideoPoster title={title} poster={poster} href={fallbackHref} />;
}

/** The facade itself (also ChapterVideo): a play button, or a link to `href` in a new tab. */
export function VideoPoster({ title, poster, onPlay, href }: { title: string; poster: string; onPlay?: () => void; href?: string }) {
  const Cmp = onPlay ? "button" : "a";
  return (
    <Cmp
      {...(onPlay ? { type: "button" as const, onClick: onPlay } : { href, target: "_blank", rel: "noopener noreferrer" })}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-ink"
      aria-label={`Play video: ${title}`}
    >
      <Image src={poster} alt="" fill sizes="(min-width: 1280px) 912px, 90vw" className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.02]" />
      <span className="absolute left-1/2 top-1/2 flex h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-bad transition-transform duration-[var(--duration-hover)] group-hover:scale-110" aria-hidden>
        <span className="ml-1 size-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-on-brand" />
      </span>
    </Cmp>
  );
}
