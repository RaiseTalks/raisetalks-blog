import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { refund } from "@/content/legal/refund";
import { pages } from "@/content/marketing/pages";

export const metadata: Metadata = { title: pages.refund.title, description: pages.refund.description, alternates: { canonical: pages.refund.path } };

export default function Page() {
  return <LegalPage doc={refund} headingScale="policy" />;
}
