import { test, expect } from "@playwright/test";

test.describe("Nav pill links", () => {
  test("Eng. Leadership jumps to the #c-eng section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "Eng. Leadership" }).click();
    await expect(page).toHaveURL(/#c-eng$/);
    await expect(page.locator("#c-eng")).toBeInViewport();
  });

  test("Building w/ AI jumps to the #c-ai section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "Building w/ AI" }).click();
    await expect(page).toHaveURL(/#c-ai$/);
    await expect(page.locator("#c-ai")).toBeInViewport();
  });

  test("Non-Linear Path jumps to the #c-path section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "Non-Linear Path" }).click();
    await expect(page).toHaveURL(/#c-path$/);
    await expect(page.locator("#c-path")).toBeInViewport();
  });
});
