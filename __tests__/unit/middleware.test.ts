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
