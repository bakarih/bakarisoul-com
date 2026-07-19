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

  it("every booking option's Calendly URL points at calendly.com", () => {
    for (const group of [
      site.hire.consulting,
      site.hire.interviewCoaching,
      site.hire.resumeLinkedInMakeover,
      site.hire.creative,
    ]) {
      for (const option of group.options) {
        expect(new URL(option.calendlyUrl).hostname).toBe("calendly.com");
      }
    }
  });

  it("interview coaching offers exactly a 1-hour and a 2-hour option", () => {
    expect(site.hire.interviewCoaching.options).toHaveLength(2);
    expect(site.hire.interviewCoaching.options[0].label).toContain("1 Hour");
    expect(site.hire.interviewCoaching.options[1].label).toContain("2 Hours");
  });

  it("resume & LinkedIn makeover offers exactly three block tiers, priced consistently at $85/block", () => {
    const options = site.hire.resumeLinkedInMakeover.options;
    expect(options).toHaveLength(3);
    expect(options[0].label).toContain("$85");
    expect(options[1].label).toContain("$170");
    expect(options[2].label).toContain("$255");
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
