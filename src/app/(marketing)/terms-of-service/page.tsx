import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { terms } from "@/content/legal/terms";
import { pages } from "@/content/marketing/pages";

export const metadata: Metadata = { title: pages.terms.title, description: pages.terms.description, alternates: { canonical: pages.terms.path } };

export default function Page() {
  return <LegalPage doc={terms} />;
}
