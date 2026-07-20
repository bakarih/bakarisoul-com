import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

function makeRequest(url: string): NextRequest {
  // NextRequest doesn't auto-derive a `host` header from the URL the way a
  // real incoming request does at the edge — set it explicitly.
  return new NextRequest(url, { headers: { host: new URL(url).host } });
}

describe("middleware — www canonicalization", () => {
  it("redirects www.bakarisoul.com to the apex domain, preserving path and query", () => {
    const res = middleware(makeRequest("https://www.bakarisoul.com/terms?ref=ad"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://bakarisoul.com/terms?ref=ad");
  });

  it("redirects the www root path too", () => {
    const res = middleware(makeRequest("https://www.bakarisoul.com/"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://bakarisoul.com/");
  });

  it("does not redirect the apex domain", () => {
    const res = middleware(makeRequest("https://bakarisoul.com/"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("does not redirect other hosts (local dev, preview domains)", () => {
    const res = middleware(makeRequest("http://localhost:3000/"));
    expect(res.headers.get("location")).toBeNull();
  });
});

describe("middleware — security headers", () => {
  it("sets a Content-Security-Policy allowing exactly the third parties this site uses", () => {
    const res = middleware(makeRequest("https://bakarisoul.com/"));
    const csp = res.headers.get("Content-Security-Policy");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toMatch(/script-src 'self' 'nonce-[^']+' https:\/\/assets\.calendly\.com/);
    expect(csp).toContain("frame-src https://www.youtube.com https://bandcamp.com https://calendly.com");
    expect(csp).toContain("form-action 'self' https://bakarisoul.substack.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  it("does not allow 'unsafe-inline' or 'unsafe-eval' in script-src outside of dev (nonce only, besides styles)", () => {
    const res = middleware(makeRequest("https://bakarisoul.com/"));
    const csp = res.headers.get("Content-Security-Policy") ?? "";
    const scriptSrc = csp.split(";").find((d) => d.trim().startsWith("script-src"));
    expect(scriptSrc).not.toContain("unsafe-inline");
    expect(scriptSrc).not.toContain("unsafe-eval");
  });

  it("allows 'unsafe-eval' only under `next dev` (NODE_ENV=development), for Fast Refresh", () => {
    const original = process.env.NODE_ENV;
    // @ts-expect-error -- NODE_ENV is readonly in the type, writable at runtime
    process.env.NODE_ENV = "development";
    try {
      const res = middleware(makeRequest("https://bakarisoul.com/"));
      const csp = res.headers.get("Content-Security-Policy") ?? "";
      const scriptSrc = csp.split(";").find((d) => d.trim().startsWith("script-src"));
      expect(scriptSrc).toContain("unsafe-eval");
    } finally {
      // @ts-expect-error -- see above
      process.env.NODE_ENV = original;
    }
  });

  it("generates a fresh nonce on every request", () => {
    const csp1 = middleware(makeRequest("https://bakarisoul.com/")).headers.get(
      "Content-Security-Policy"
    );
    const csp2 = middleware(makeRequest("https://bakarisoul.com/")).headers.get(
      "Content-Security-Policy"
    );
    const nonce1 = csp1?.match(/'nonce-([^']+)'/)?.[1];
    const nonce2 = csp2?.match(/'nonce-([^']+)'/)?.[1];
    expect(nonce1).toBeTruthy();
    expect(nonce1).not.toBe(nonce2);
  });

  it("forwards the nonce on the request headers so Next can read it via headers()", () => {
    const res = middleware(makeRequest("https://bakarisoul.com/"));
    const csp = res.headers.get("Content-Security-Policy") ?? "";
    const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
    expect(res.headers.get("x-middleware-request-x-nonce")).toBe(nonce);
  });

  it("sets the standard companion hardening headers", () => {
    const res = middleware(makeRequest("https://bakarisoul.com/"));
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(res.headers.get("X-Frame-Options")).toBe("DENY");
    expect(res.headers.get("Permissions-Policy")).toContain("geolocation=()");
  });

  it("still sets security headers on the www redirect response", () => {
    const res = middleware(makeRequest("https://www.bakarisoul.com/"));
    expect(res.headers.get("Content-Security-Policy")).toBeTruthy();
  });
});
