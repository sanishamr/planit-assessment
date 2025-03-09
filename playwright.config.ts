import { defineConfig, devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

/*const config: PlaywrightTestConfig = {
  testMatch: ["tests/login.test.ts"],
  use: {
    headless:false,
    screenshot: "on",
    video : "on"}
};
*/

/*
projects: [
    {
      name: 'default',
      testMatch: 'tests/login.test.ts', // Runs all test cases normally
    },
    {
      name: 'repeat-testcase',
      testMatch: 'tests/validation.spec.ts', // Only applies to this file
      grep: /Contact Page validations testcase_02/, // Runs only this test
      repeatEach: 5, // Run this test 5 times
    },
  ],
});
*/

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  //testDir: './pomTest',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  //repeatEach: 5,  // Runs every test 5 times
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["dot"],["json", {outputFile :"jsonReports/jsonReport.json"}],["html", {open : "always"}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    screenshot: 'on',
    video: {
      mode: 'retain-on-failure',
      size: { width: 640, height: 480 }
    },
   // launchOptions:{slowMo:5000},

    
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: "https://jupiter.cloud.planittesting.com/#",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
