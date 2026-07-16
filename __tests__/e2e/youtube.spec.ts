import { test, expect } from "@playwright/test";

test.describe("YouTube click-to-load", () => {
  test("no YouTube iframe on first load", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('iframe[src*="youtube.com"]')).toHaveCount(0);
  });

  test("clicking the poster loads the iframe and starts playback", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Play video/i }).click();

    const iframe = page.locator('iframe[src*="youtube.com/embed"]');
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute("src", /autoplay=1/);
  });
});
