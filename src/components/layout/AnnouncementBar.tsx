"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { announcement } from "@/content/site";

/** Yellow→red strip above the navbar (Figma 3257:1025). Dismiss hides it for this visit. */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative flex min-h-[30px] items-center justify-center px-10 py-1.5 text-body text-on-brand" style={{ backgroundImage: "var(--gradient-announcement)" }}>
      <Link href={announcement.href} className="text-center underline-offset-4 hover:underline">
        {announcement.text}
      </Link>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label={announcement.dismissLabel}
        className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-xs transition-opacity duration-[250ms] hover:opacity-70"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
