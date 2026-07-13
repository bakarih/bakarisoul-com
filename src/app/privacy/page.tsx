import type { Metadata } from "next";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: `${site.legal.privacy.title} — ${site.name}`,
  description: "What happens to your information when you use bakarisoul.com.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return <LegalPage content={site.legal.privacy} />;
}
