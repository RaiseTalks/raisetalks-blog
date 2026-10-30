import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/motion";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/consent/CookieConsent";
import "./globals.css";

// Poppins is self-hosted (src/fonts) — no Google request, faster, GDPR-friendly.
const poppins = localFont({
  src: [
    { path: "../fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", site: "@raisetalks" },
  // Favicon follows the browser theme: blue mark on light UI, white mark on dark UI (designer files, Oct 2026).
  // app/favicon.ico (light mark) covers browsers without SVG favicons; apple-touch-icon.png is the home-screen icon.
  icons: {
    icon: [
      { url: "/icons/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/icons/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* banner first, so keyboard and screen-reader users reach it before the page */}
        <MotionProvider>
          <CookieConsent />
          {children}
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
