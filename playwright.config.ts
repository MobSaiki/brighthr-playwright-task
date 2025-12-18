import { defineConfig } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },

  reporter: [["list"], ["html"], ["allure-playwright"]],

  use: {
    baseURL: process.env.BRIGHTHR_BASE_URL,
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    // {
    //   name: "webkit",
    //   use: { browserName: "webkit" },
    // },
    // These require the browser channels to be available on the machine.
    // {
    //   name: "chrome",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     channel: "chrome",
    //   },
    // },
    // {
    //   name: "edge",
    //   use: {
    //     ...devices["Desktop Edge"],
    //     channel: "msedge",
    //   },
    // },
  ],
});
