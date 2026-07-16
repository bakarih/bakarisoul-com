import { test, expect } from "@playwright/test";

test.describe("SEO routes", () => {
  test("robots.txt allows crawling and points at the production sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBe(true);
    const body = await res.text();
    expect(body).toContain("Allow: /");
    // Always the real production URL — robots.ts is generated from the
    // hardcoded SITE_URL, not the host that happened to serve this request.
    expect(body).toContain("Sitemap: https://bakarisoul.com/sitemap.xml");
  });

  test("sitemap.xml lists the real pages", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBe(true);
    const body = await res.text();
    expect(body).toContain("/privacy</loc>");
    expect(body).toContain("/terms</loc>");
  });

  test("homepage has a canonical tag and Person JSON-LD", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://bakarisoul.com"
    );
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(jsonLd ?? "{}")).toMatchObject({ "@type": "Person", name: "Bakari Holmes" });
  });
});

// This one always hits the real production domain directly, regardless of
// PLAYWRIGHT_BASE_URL — the www redirect only exists at the Cloudflare edge,
// not in local dev/build, so it can't be verified any other way.
test.describe("production www redirect (live domain, not the test build)", () => {
  test("www.bakarisoul.com redirects to the apex domain", async ({ request }) => {
    const res = await request.get("https://www.bakarisoul.com/", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe("https://bakarisoul.com/");
  });
});
