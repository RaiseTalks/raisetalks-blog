"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";

/**
 * Google Analytics 4 (same property as the old site), production builds only, and only once the visitor has
 * accepted analytics cookies (components/consent). Analytics only: ad storage denied (Consent Mode), Google
 * signals and ad personalisation off. Withdrawing consent stops the tag and deletes its cookies; cookies set
 * before there was a banner are deleted too until the visitor accepts.
 */
const GA_ID = "G-FEVK46NNED";

type GaWindow = { gtag?: (...args: unknown[]) => void; [flag: string]: unknown };

/** _ga and _ga_<id>, on this host and every parent domain (GA sets them on raisetalks.com). */
function clearGaCookies() {
  const names = document.cookie.split("; ").map((c) => c.split("=")[0]).filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const parts = location.hostname.split(".");
  const domains = parts.slice(0, -1).map((_, i) => parts.slice(i).join("."));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${d}`;
  }
}

export function Analytics() {
  const consent = useConsent();
  const known = consent !== undefined; // not known while hydrating: don't delete a consenting visitor's cookies
  const granted = consent?.analytics === true;

  useEffect(() => {
    if (!known) return;
    const w = window as unknown as GaWindow;
    w[`ga-disable-${GA_ID}`] = !granted;
    w.gtag?.("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
    if (!granted) clearGaCookies();
  }, [known, granted]);

  if (process.env.NODE_ENV !== "production" || !granted) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
