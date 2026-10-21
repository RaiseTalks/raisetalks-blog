import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal/privacy";
import { pages } from "@/content/marketing/pages";

export const metadata: Metadata = { title: pages.privacy.title, description: pages.privacy.description, alternates: { canonical: pages.privacy.path } };

export default function Page() {
  return <LegalPage doc={privacy} headingScale="policy" />;
}
