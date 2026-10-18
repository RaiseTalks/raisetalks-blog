"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export type LightboxPhoto = { src: string; alt: string };

/**
 * Full-screen photo viewer on a native modal <dialog> (focus stays inside, Esc closes).
 * Closes on Esc, the close button or a click anywhere on it. On close, focus goes
 * back to the element that opened it (`returnFocus`).
 */
export function Lightbox({
  photo, onClose, closeLabel, returnFocus,
}: { photo: LightboxPhoto | null; onClose: () => void; closeLabel: string; returnFocus?: HTMLElement | null }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (photo && !d.open) d.showModal();
    if (!photo && d.open) d.close();
  }, [photo]);

  return (
    <dialog
      ref={ref}
      aria-label={photo?.alt}
      onClose={() => { onClose(); returnFocus?.focus({ preventScroll: true }); }}
      onClick={() => ref.current?.close()}
      className="fixed cursor-zoom-out inset-0 m-0 size-full max-h-none max-w-none bg-transparent p-4 backdrop:bg-ink/90 tablet:p-12"
    >
      {photo && (
        <div className="relative mx-auto size-full max-w-[1600px]">
          <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
        </div>
      )}
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-ink-raised text-on-brand transition-colors duration-[var(--duration-hover)] hover:bg-ink-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand"
      >
        <X className="size-5" strokeWidth={1.5} aria-hidden />
      </button>
    </dialog>
  );
}
