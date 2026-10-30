"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { VideoPoster } from "./VideoEmbed";

/**
 * YouTube video with a chapter list (Support founders guide). Until the visitor presses play or picks a
 * chapter it is VideoEmbed's poster facade, so YouTube stores nothing in the browser before that (cookie
 * consent). Then the privacy-friendly player loads at that second and starts; the active chapter is in brand blue.
 */
export function ChapterVideo({ youtubeId, title, chapters }: { youtubeId: string; title: string; chapters: { time: string; start: number; title: string }[] }) {
  const [start, setStart] = useState<number | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const params = `rel=0&modestbranding=1&playsinline=1&start=${start}&autoplay=1`;

  function play(seconds: number) {
    setStart(seconds);
    frame.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div ref={frame} className="overflow-hidden rounded-lg border border-border-2 bg-ink">
        {start === null ? (
          <VideoPoster title={title} poster={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} onPlay={() => setStart(0)} />
        ) : (
          <iframe
            key={start}
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <ol className="grid gap-2 tablet:grid-cols-2">
        {chapters.map((c) => {
          const on = start === c.start;
          return (
            <li key={c.start}>
              <button
                type="button"
                onClick={() => play(c.start)}
                aria-label={`Play from ${c.time}: ${c.title}`}
                aria-pressed={on}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-body transition-colors duration-[var(--duration-hover)]",
                  on ? "border-brand-light-blue bg-card-on-alt text-headline" : "border-border-2 bg-card-on-alt text-copy hover:border-brand-light-blue hover:text-headline",
                )}
              >
                <span className="shrink-0 font-semibold tabular-nums text-brand-light-blue">{c.time}</span>
                <span>{c.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
