const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  env: { ...process.env },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reporterDir: "report/mocha",
    charts: true,
    reportPageTitle: "custom-title",
    inlineAssets: true,
    video: false,
    json: false, // Avoid generating JSON report
    screenshotOnRunFailure: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      // Add a custom task to generate the report
      on("after:run", () => {
        console.log("Generating Mocha Awesome report...");
        require("cypress-mochawesome-reporter/lib/generateReport")();
      });
    },
  },
  // retries: {
  //   runMode: 2, // Number of times to retry the entire test run
  //   openMode: 2  // Number of times to retry the commands when running in interactive mode
  // }
});
