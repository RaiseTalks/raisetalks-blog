"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Read-only value with a copy button (Home MCP step 1 on both views: the connector URL). The button is a 44 x 44 px
 * tap target; the wrapper's 2px padding keeps the field 50px tall, as it was with a 32px button.
 */
export function CopyField({ value, copiedLabel }: { value: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked — the text stays selectable */ }
  }
  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-sm border border-border-2 bg-page py-0.5 pr-2 pl-4 tablet:max-w-[376px]">
      <span className="truncate text-body text-copy select-all">{value}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? copiedLabel : `Copy ${value}`}
        className="flex h-11 min-w-11 shrink-0 items-center gap-1.5 rounded-xs px-2 text-footnote text-[var(--audience-accent)] transition-colors duration-[250ms] hover:bg-section-alt"
      >
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        <span aria-live="polite">{copied ? copiedLabel : ""}</span>
      </button>
    </div>
  );
}
