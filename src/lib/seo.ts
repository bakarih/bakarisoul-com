// Single source of truth for the production origin, derived from
// content/site.ts. Used by page metadata (canonical URLs), robots.ts,
// sitemap.ts, and the www-canonicalization middleware, so the domain
// string is never duplicated.
import { site } from "@/content/site";

export const SITE_URL = site.seo.url;

/** The bare hostname (no scheme), for host-header comparisons in middleware. */
export const SITE_HOST = new URL(site.seo.url).host;
