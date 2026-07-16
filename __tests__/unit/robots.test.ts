import robots from "@/app/robots";

describe("robots.txt", () => {
  it("allows crawling everything", () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("points at the production sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://bakarisoul.com/sitemap.xml");
  });
});
