import { test, expect } from "@playwright/test";

test.describe("Legal pages", () => {
  test("/privacy loads with the right heading and a canonical tag", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: "Privacy", level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://bakarisoul.com/privacy"
    );
  });

  test("/terms loads with the right heading, canonical tag, and the refund policy", async ({
    page,
  }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: "Terms", level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://bakarisoul.com/terms"
    );
    // "24 hours" appears in multiple paragraphs (the ≥24h and <24h cases) —
    // check the full policy is present rather than asserting a single match.
    await expect(page.getByText(/24 hours' notice: full refund/)).toBeVisible();
    await expect(page.getByText(/less than 24 hours' notice/)).toBeVisible();
    await expect(page.getByText(/No-show, no notice/)).toBeVisible();
  });

  test("footer links navigate to the legal pages from the homepage", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Privacy" }).click();
    await expect(page).toHaveURL(/\/privacy$/);

    await page.goto("/");
    await page.getByRole("link", { name: "Terms" }).click();
    await expect(page).toHaveURL(/\/terms$/);
  });

  test("← bakarisoul.com link returns home from a legal page", async ({ page }) => {
    await page.goto("/terms");
    await page.getByRole("link", { name: /bakarisoul\.com/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
