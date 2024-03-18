const { defineConfig, devices } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./",
  fullyParallel: true,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:8080",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:8080",
  },
});
