"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { consent as copy, cookieTypes } from "@/content/consent";
import { site } from "@/content/site";
import { hasGpc, onOpenCookiePreferences, saveConsent, useConsent } from "@/lib/consent";
import { Badge, Button, Switch } from "@/components/ui";
import { InlineLinks } from "@/components/ui/InlineLinks";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cookie banner + Cookie settings dialog, on every page (root layout). Owner: Studio (A)
 * Patterns checked against PitchBook and Preqin (both OneTrust, Oct 2026): corner card, Reject all and Accept all
 * as the same button side by side (refusing is as easy as accepting), the banner says where to change the choice
 * later, one name ("Cookie settings") for the banner button, the dialog and the footer link, a branded dialog that
 * lists the types of cookies (switch, "Always active" or "Not used"), and a direct link to the Cookie Policy.
 * High level only, here and in the policy: types of cookies, not individual cookies.
 * Stricter than both: nothing optional loads before a choice, and Global Privacy Control hides the banner
 * (analytics stays off) and is named in the dialog.
 * Dialog: native modal <dialog> (focus stays inside, Esc closes), nothing switched on by default.
 * The footer "Cookie settings" button reopens it at any time, so consent is as easy to withdraw as to give.
 */
export function CookieConsent() {
  const consent = useConsent();
  const [prefs, setPrefs] = useState(false);
  useEffect(() => onOpenCookiePreferences(() => setPrefs(true)), []);

  // consent is undefined on the server and during hydration, so hasGpc() only runs in the browser
  const ask = consent === null && !hasGpc();
  const b = copy.banner;

  return (
    <>
      <AnimatePresence>
        {ask && (
          <motion.section
            aria-label={b.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.4 } }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.2, ease: EASE } }}
            className="fixed inset-x-2 bottom-2 z-60 mb-[env(safe-area-inset-bottom)] flex flex-col gap-4 rounded-md border border-border-1 bg-page p-5 shadow-[var(--shadow-nav)] tablet:inset-x-auto tablet:bottom-6 tablet:left-12 tablet:w-[480px] tablet:p-6 laptop:left-8"
          >
            <p className="text-h4 text-headline">
              {b.title.lead} <span className="text-h4-alt text-gradient-brand">{b.title.accent}</span>
            </p>
            <p className="text-body text-copy"><InlineLinks text={b.text} /></p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" fullWidth onClick={() => saveConsent(false)}>{b.reject}</Button>
              <Button variant="secondary" fullWidth onClick={() => saveConsent(true)}>{b.accept}</Button>
              <Button variant="ghost" fullWidth onClick={() => setPrefs(true)} className="col-span-2">{copy.settings}</Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      {prefs && <Preferences analytics={consent?.analytics ?? false} gpc={hasGpc()} onClose={() => setPrefs(false)} />}
    </>
  );
}

/** Mounted while open, so the switches always start from the saved choice. */
function Preferences({ analytics: saved, gpc, onClose }: { analytics: boolean; gpc: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(saved);
  const titleId = useId();
  const p = copy.preferences;

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  function choose(value: boolean) {
    saveConsent(value);
    ref.current?.close();
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      className="m-auto max-h-[calc(100dvh-16px)] w-[calc(100%-16px)] max-w-[600px] overflow-y-auto overscroll-contain rounded-lg border border-border-1 bg-page p-0 text-copy transition-[opacity,translate] duration-[var(--duration-hover)] ease-[var(--ease-soft)] backdrop:bg-ink/60 starting:open:translate-y-2 starting:open:opacity-0"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border-1 py-3 pl-5 pr-4 tablet:pl-8 tablet:pr-6">
        <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-3 w-auto tablet:h-4" />
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={p.close}
          className="-m-1 flex size-11 shrink-0 items-center justify-center rounded-sm text-headline transition-colors duration-[250ms] hover:text-brand-light-blue"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="flex flex-col gap-6 p-5 tablet:p-8">
        <div className="flex flex-col gap-3">
          <h2 id={titleId} className="text-h3">{p.title}</h2>
          <p className="text-body"><InlineLinks text={p.text} /></p>
        </div>
        {gpc && <p className="rounded-md border border-border-1 bg-card px-4 py-3 text-body">{p.gpc}</p>}
        <ul className="flex flex-col border-y border-border-1">
          <CookieType {...cookieTypes.necessary}>
            {() => <Badge variant="accent">{p.alwaysOn}</Badge>}
          </CookieType>
          <CookieType {...cookieTypes.analytics}>
            {(titleId, textId) => <Switch checked={analytics} onChange={setAnalytics} aria-labelledby={titleId} aria-describedby={textId} />}
          </CookieType>
          <CookieType {...cookieTypes.marketing}>
            {() => <Badge variant="neutral" className="px-3 font-semibold text-muted">{p.notUsed}</Badge>}
          </CookieType>
        </ul>
        <div className="grid gap-2 tablet:grid-cols-3">
          <Button variant="ghost" fullWidth onClick={() => choose(false)}>{p.reject}</Button>
          <Button variant="ghost" fullWidth onClick={() => choose(true)}>{p.accept}</Button>
          <Button variant="primary" fullWidth onClick={() => choose(analytics)}>{p.save}</Button>
        </div>
      </div>
    </dialog>
  );
}

/** One type of cookie: its name, its status on the right (switch, "Always active" or "Not used") and what it does. */
function CookieType({
  title, text, children,
}: { title: string; text: string; children: (titleId: string, textId: string) => ReactNode }) {
  const titleId = useId();
  const textId = useId();
  return (
    <li className="flex flex-col gap-2 border-b border-border-1 py-5 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <h3 id={titleId} className="text-h4">{title}</h3>
        {children(titleId, textId)}
      </div>
      <p id={textId} className="text-body">{text}</p>
    </li>
  );
}
