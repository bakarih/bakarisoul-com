import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with the correct title and hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Bakari Holmes/);
    await expect(
      page.getByRole("heading", { name: /Six versions of the same job/i })
    ).toBeVisible();
  });

  test("renders all six identity-strip facets, including speaker", async ({ page }) => {
    await page.goto("/");
    for (const label of [
      "musician",
      "vocalist",
      "teacher",
      "engineer",
      "speaker",
      "human",
    ]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test("renders all three pillar sections with their primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Engineering Leadership" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Building with AI" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Try it →" })).toBeVisible();

    // Accessible name inserts a space at the <br> line-break boundary.
    await expect(page.getByRole("heading", { name: "The Non- Linear Path" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Watch on YouTube →" })).toBeVisible();
  });

  test("renders all three booking CTAs — speaking/consulting, paid interview coaching, and creative", async ({
    page,
  }) => {
    await page.goto("/");
    // Free-intro-call CTAs (speaking/consulting + creative) share this exact label.
    await expect(
      page.getByRole("link", { name: "Book on Calendly →", exact: true })
    ).toHaveCount(2);
    // The paid interview coaching CTA has its own distinct, price-labeled button.
    await expect(
      page.getByRole("link", { name: "Book on Calendly → ($85/hr)" })
    ).toBeVisible();
  });

  test("footer has social links and legal page links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
    await expect(page.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy"
    );
    await expect(page.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
  });
});
