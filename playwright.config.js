const { defineConfig } = require('@playwright/test');
const fs = require('fs');
// Read settings.json
const settings = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));
const isParallel = settings.executionMode === "parallel";
module.exports = defineConfig({
  timeout: 30* 1000, // 30 seconds per test
  retries: 2, 
  use: {
    headless: !settings.browserMode,
    baseURL: settings.baseURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  fullyParallel: isParallel,
  workers: isParallel ? 4 : 1
  
});
