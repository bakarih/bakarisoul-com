import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const ROUTES = ["/", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
