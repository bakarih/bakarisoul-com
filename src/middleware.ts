import { NextRequest, NextResponse } from "next/server";
import { SITE_HOST } from "@/lib/seo";

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
  if (request.headers.get("host") === `www.${SITE_HOST}`) {
    const url = new URL(request.url);
    url.host = SITE_HOST;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
