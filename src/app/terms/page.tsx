import type { Metadata } from "next";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: `${site.legal.terms.title} — ${site.name}`,
  description: "The terms governing use of bakarisoul.com and booked services.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return <LegalPage content={site.legal.terms} />;
}
