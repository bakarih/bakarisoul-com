import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Single-page site — one indexable route.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date() }];
}
