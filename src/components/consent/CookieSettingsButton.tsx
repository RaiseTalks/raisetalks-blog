"use client";

import { openCookiePreferences } from "@/lib/consent";

/** Footer legal row: reopens Cookie preferences (CookieConsent), so a choice can be changed or withdrawn at any time. */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {label}
    </button>
  );
}
