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

  test("renders all four booking CTAs — speaking/consulting, paid interview coaching, resume/LinkedIn, and creative", async ({
    page,
  }) => {
    await page.goto("/");
    // Free-intro-call CTA (speaking/consulting) + creative CTA + the
    // resume/LinkedIn dropdown's "Book" button all share this exact label.
    await expect(
      page.getByRole("link", { name: "Book on Calendly →", exact: true })
    ).toHaveCount(3);
    // Interview coaching offers two distinct, price-labeled options.
    await expect(page.getByRole("link", { name: "Book 1 Hour — $170 →" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Book 2 Hours — $255 →" })).toBeVisible();
  });

  test("both paid hire cards show a decision helper note and a risk-reversal note", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByText("Not sure? Start with 1 hour — we can always book a follow-up.")
    ).toBeVisible();
    await expect(
      page.getByText("Not sure which to pick? Start with a 1-hour resume or LinkedIn review", {
        exact: false,
      })
    ).toBeVisible();
    await expect(page.getByText("Free reschedule with 24h notice.", { exact: false })).toHaveCount(
      2
    );
  });

  test("resume & LinkedIn review offers a package dropdown with all five tiers, each with its own description", async ({
    page,
  }) => {
    await page.goto("/");
    const select = page.getByLabel("Choose a package");
    await expect(select).toBeVisible();

    for (const tier of [
      "Resume — 1 Hour — $170",
      "Resume — 2 Hours — $255",
      "LinkedIn — 1 Hour — $170",
      "LinkedIn — 2 Hours — $255",
      "Resume + LinkedIn Makeover — 3 Hours — $340",
    ]) {
      await expect(select.getByRole("option", { name: tier })).toBeAttached();
    }

    // Selecting a different tier updates the description and the booking button stays usable.
    await select.selectOption({ label: "LinkedIn — 2 Hours — $255" });
    await expect(select).toHaveValue("3"); // zero-indexed: 4th option
    await expect(
      page.getByText("The deeper pass on your LinkedIn profile", { exact: false })
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
