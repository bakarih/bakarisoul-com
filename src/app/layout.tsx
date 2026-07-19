import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/content/site";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: site.seo.url },
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.seo.url,
    siteName: site.footer.domain,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.seo.twitterCreator,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.seo.url,
  sameAs: [
    site.socials.x.url,
    site.socials.linkedin.url,
    site.socials.github.url,
    site.socials.substack.url,
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading a per-request header here is what opts this route out of static
  // prerendering. That's required, not incidental: middleware sets a fresh
  // CSP nonce on every request, but a statically prerendered page is built
  // once — there'd be no per-request nonce to stamp onto Next's own inline
  // scripts without this route being rendered dynamically. The nonce itself
  // isn't used below (JSON-LD is exempt from script-src, and the Calendly
  // <Script> is covered by its own host allowlist) — just reading the
  // header is what triggers the opt-out.
  await headers();

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/portrait.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-bg text-text">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
