import { SiteFooter, SiteHeader } from "@/components/layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

// Public pages: sticky navbar + footer; every page change starts at the top (ScrollToTop). Owner: Studio (A). All pages are static.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
