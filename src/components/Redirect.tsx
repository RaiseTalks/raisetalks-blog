import type { Metadata } from "next";

/**
 * Old URL → new URL on a static host (no server redirects on GitHub Pages): an instant meta refresh,
 * `location.replace` for browsers, a canonical to the target for search engines, and a plain link as fallback.
 * Used for addresses the old site served that now live elsewhere (src/app/(redirects)).
 */
export function redirectMetadata(to: string): Metadata {
  return { robots: { index: false, follow: true }, alternates: { canonical: to } };
}

export function Redirect({ to }: { to: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(to)} + location.hash)` }} />
      <p className="p-8 text-body text-copy">
        This page has moved to <a href={to} className="text-brand-light-blue underline">{to}</a>.
      </p>
    </>
  );
}
