// Sanity checks on content/site.ts — catches the kind of silent breakage that
// doesn't fail a build (a typo'd URL, a swapped track ID) but breaks a real
// integration in production.
import { site } from "@/content/site";

function collectUrls(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    if (/^(https?:|mailto:)/.test(value)) out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectUrls(v, out));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectUrls(v, out));
  }
  return out;
}

describe("site.ts content sanity", () => {
  it("every URL-shaped string is a well-formed URL", () => {
    const urls = collectUrls(site);
    expect(urls.length).toBeGreaterThan(10);
    for (const url of urls) {
      expect(() => new URL(url)).not.toThrow();
    }
  });

  it("no URL uses plain http (everything should be https or mailto)", () => {
    const urls = collectUrls(site);
    for (const url of urls) {
      expect(url.startsWith("http://")).toBe(false);
    }
  });

  it("Bandcamp track IDs are purely numeric (copy-paste from the embed URL is the usual failure mode)", () => {
    for (const track of site.music.bandcampTracks) {
      expect(track.trackId).toMatch(/^\d+$/);
    }
  });

  it("the featured YouTube ID matches the one embedded in youtubeUrl", () => {
    expect(site.music.youtubeUrl).toContain(site.music.youtubeId);
  });

  it("Calendly URL points at calendly.com", () => {
    expect(new URL(site.hire.calendlyUrl).hostname).toBe("calendly.com");
  });

  it("Substack URLs all point at the same subdomain", () => {
    const substackHost = new URL(site.substack.url).hostname;
    expect(new URL(site.substack.embedUrl).hostname).toBe(substackHost);
    expect(new URL(site.substack.subscribeApiUrl).hostname).toBe(substackHost);
    expect(new URL(site.socials.substack.url).hostname).toBe(substackHost);
  });

  it("every social entry has a non-empty url", () => {
    for (const entry of Object.values(site.socials)) {
      if (typeof entry === "string") continue; // kicker
      expect((entry as { url: string }).url.length).toBeGreaterThan(0);
    }
  });

  it("hire service lists are non-empty", () => {
    expect(site.hire.consulting.services.length).toBeGreaterThan(0);
    expect(site.hire.creative.services.length).toBeGreaterThan(0);
  });

  it("the identity strip has exactly six panels, one per glyph asset", () => {
    expect(site.identityStrip).toHaveLength(6);
    const glyphs = site.identityStrip.map((p) => p.glyph);
    expect(new Set(glyphs).size).toBe(6);
  });
});
