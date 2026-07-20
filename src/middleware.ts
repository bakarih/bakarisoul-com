import { NextRequest, NextResponse } from "next/server";
import { SITE_HOST } from "@/lib/seo";

/**
 * Scoped to the actual third parties this site loads — Calendly (popup
 * widget + payment iframe), YouTube (click-to-load video), Bandcamp
 * (embedded players), and Substack (subscribe form target). Nothing else
 * is allowed to load or execute.
 *
 * script-src carries a fresh nonce every request. Next.js's App Router
 * renders its own inline bootstrap/RSC-streaming scripts
 * (`(self.__next_f=...).push(...)`) with no `src` attribute — `'self'`
 * only matches same-origin *fetched* scripts, not inline ones, so without
 * the nonce those tags are silently blocked and the page never hydrates
 * (confirmed: zero React fiber roots anywhere in the DOM under the
 * nonce-less policy). Next reads the nonce off this same header and
 * stamps it onto every script tag it renders — nothing else in the app
 * needed to change to pick it up.
 *
 * 'unsafe-inline' is scoped to styles only, never scripts. It covers a
 * couple of dynamic inline style attributes (the YouTube poster's
 * background-image, the Bandcamp iframe's fixed sizing) plus Calendly's
 * own widget.css. CSS injection is a materially lower-severity vector than
 * script injection — this is the standard, widely-accepted CSP tradeoff,
 * not a hole poked in the policy for convenience.
 *
 * `<script type="application/ld+json">` (the Person structured-data tag in
 * layout.tsx) is NOT subject to script-src at all — CSP only restricts
 * elements that would execute as code, and JSON-LD is inert data, so it
 * needed no nonce/hash allowlisting here.
 */
function buildCSP(nonce: string): string {
  // `next dev`'s Fast Refresh client calls eval() to apply hot updates —
  // blocked without 'unsafe-eval', which throws in the dev overlay itself.
  // Production (`next build` + `next start`, and the deployed Worker) has
  // no HMR client and never needs it, so this never ships.
  const isDevServer = process.env.NODE_ENV === "development";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${isDevServer ? " 'unsafe-eval'" : ""} https://assets.calendly.com`,
    "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
    "img-src 'self' data: https://i.ytimg.com",
    "font-src 'self'",
    "frame-src https://www.youtube.com https://bandcamp.com https://calendly.com",
    "connect-src 'self' https://calendly.com https://*.calendly.com",
    "form-action 'self' https://bakarisoul.substack.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function withSecurityHeaders(response: NextResponse, nonce: string): NextResponse {
  response.headers.set("Content-Security-Policy", buildCSP(nonce));
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Payment stays allowed for Calendly specifically, so its hosted
  // checkout can still use Apple Pay / Google Pay expedited-checkout
  // buttons if it ever does; everything else we don't use is blocked.
  response.headers.set(
    "Permissions-Policy",
    'camera=(), microphone=(), geolocation=(), usb=(), payment=(self "https://calendly.com")'
  );
  // Legacy equivalent of frame-ancestors, for older browsers.
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

/**
 * Canonicalizes www.bakarisoul.com -> bakarisoul.com (308, permanent).
 * Lesson from interviewrubric.com's 2026-07 SEO audit: serving both hosts
 * identically with no redirect gets both indexed as separate pages.
 *
 * Only fires on an exact match of the www host — local dev, preview
 * domains, and the apex domain itself all pass through untouched.
 *
 * Deliberately kept as `middleware.ts` (not the newer `proxy.ts`
 * convention) — `proxy.ts` only supports the nodejs runtime in this
 * Next.js version, but OpenNext's Cloudflare adapter requires
 * edge-runtime middleware to build.
 */
export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());

  if (request.headers.get("host") === `www.${SITE_HOST}`) {
    const url = new URL(request.url);
    url.host = SITE_HOST;
    return withSecurityHeaders(NextResponse.redirect(url, 308), nonce);
  }

  // Forwarded on the request (not just the response) so Next's App Router
  // can read it via `headers()` during this same request's render pass —
  // that's what lets it stamp the nonce onto its own inline/streaming
  // script tags without every route needing to do this by hand.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  return withSecurityHeaders(
    NextResponse.next({ request: { headers: requestHeaders } }),
    nonce
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
