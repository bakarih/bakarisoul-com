import { defineConfig, devices } from "@playwright/test";

// PLAYWRIGHT_BASE_URL lets the same suite run as a production smoke test:
//   PLAYWRIGHT_BASE_URL=https://bakarisoul.com npx playwright test
// against the live site (skips the local webServer in that case).
//
// Uses a dedicated port (3417), not Next's default 3000 — this machine runs
// other Next.js projects (e.g. interview-rubric-creator) on 3000, and
// `reuseExistingServer` would otherwise silently attach to whichever one
// happens to already be listening there and test the wrong app.
const LOCAL_PORT = 3417;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${LOCAL_PORT}`;
const isLocal = !process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./__tests__/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: isLocal
    ? {
        command: `npm run build && npx next start -p ${LOCAL_PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
});
