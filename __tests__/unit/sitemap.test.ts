import sitemap from "@/app/sitemap";

const EXPECTED_URLS = [
  "https://bakarisoul.com/",
  "https://bakarisoul.com/privacy",
  "https://bakarisoul.com/terms",
];

describe("sitemap.xml", () => {
  it("lists exactly the real, indexable pages — no more, no less", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual(EXPECTED_URLS);
  });

  it("every entry has a lastModified date", () => {
    for (const entry of sitemap()) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });
});
