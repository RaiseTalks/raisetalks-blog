import { useSyncExternalStore } from "react";

/**
 * The visitor's cookie choice (components/consent, components/Analytics). Owner: Studio (A)
 * Opt-in: until the visitor accepts, only strictly necessary storage is used. The choice itself is necessary
 * storage (localStorage, in memory when storage is blocked). It lapses after six months and whenever
 * CONSENT_VERSION changes, and the banner asks again.
 */
export type Consent = { analytics: boolean; version: number; date: string };

const STORAGE_KEY = "rt-consent";
/** Bump when a category or cookie is added (src/content/consent.ts): everyone is asked again. */
const CONSENT_VERSION = 1;
const MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000; // six months
const OPEN_EVENT = "rt:cookie-preferences";
const DISMISS_KEY = "rt-consent-dismissed";

let memory: string | null = null;
let cache: { raw: string | null; value: Consent | null } | undefined;
const listeners = new Set<() => void>();

function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Partial<Consent>;
    if (c.version !== CONSENT_VERSION || typeof c.date !== "string") return null;
    if (!(Date.now() - Date.parse(c.date) < MAX_AGE_MS)) return null;
    return { analytics: c.analytics === true, version: c.version, date: c.date };
  } catch {
    return null;
  }
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return memory;
  }
}

/** Stable object while the stored value is unchanged (useSyncExternalStore needs that). */
function getConsent(): Consent | null {
  const raw = readRaw();
  if (cache?.raw !== raw) cache = { raw, value: parse(raw) };
  return cache.value;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener); // a choice made in another tab
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function saveConsent(analytics: boolean) {
  const raw = JSON.stringify({ analytics, version: CONSENT_VERSION, date: new Date().toISOString() } satisfies Consent);
  memory = raw;
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // not persisted; `memory` keeps it for this page view
  }
  listeners.forEach((l) => l());
}

/** undefined = not known yet (server render and hydration), null = no valid choice, else the choice. */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, getConsent, () => undefined);
}

/** Global Privacy Control (CCPA/CPRA and other US state laws): the browser already said no. Client only. */
export function hasGpc(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

/**
 * The banner's X: hides it for this browser session without recording a choice. Closing is not consent
 * (EU/UAE), so analytics stays off and the banner asks again on the next visit. Client only.
 */
export function dismissBanner() {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // not persisted; CookieConsent's state keeps the banner closed for this page view
  }
}

export function bannerDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/** Opens the Cookie preferences dialog from anywhere (footer "Cookie settings"). */
export function openCookiePreferences() {
  document.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookiePreferences(open: () => void) {
  document.addEventListener(OPEN_EVENT, open);
  return () => document.removeEventListener(OPEN_EVENT, open);
}
