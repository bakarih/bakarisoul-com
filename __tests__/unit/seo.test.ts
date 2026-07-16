import { SITE_URL, SITE_HOST } from "@/lib/seo";

describe("lib/seo", () => {
  it("derives SITE_URL from content/site.ts", () => {
    expect(SITE_URL).toBe("https://bakarisoul.com");
  });

  it("derives the bare host from SITE_URL", () => {
    expect(SITE_HOST).toBe("bakarisoul.com");
  });
});
