"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted background loop (Drop 19). Downloads only when it comes within 400px of the screen, plays while visible,
 * pauses off-screen (never on hover). Reduced motion = the poster only, the video is never loaded.
 * Decorative: hidden from screen readers. Fills its positioned parent, always centred (object-cover).
 */
export function LoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          v.play().catch(() => {}); // no src yet on the first call: autoPlay starts it once the src is set
        } else v.pause();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      autoPlay={load}
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden
      tabIndex={-1}
      className={className}
    />
  );
}
