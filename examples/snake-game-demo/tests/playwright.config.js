import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  timeout: 30_000,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "python3 -m http.server 4173 -d src",
    cwd: "..",
    port: 4173,
    reuseExistingServer: true,
  },
});
