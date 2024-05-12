const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
   reporter: "cypress-mochawesome-reporter",
   requestTimeout: 10000,
   pageLoadTimeout: 10000,
   defaultCommandTimeout: 40000,
   watchForFileChanges: true,
   video: true,
   trashAssetsBeforeRuns: false,
   projectId: "nop451",
   env: {
    envName: "qa"
   },
  reporterOptions :{
    charts: true,
    reportPageTitle: "course-bay",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    //videoOnFailOnly: true,
  },
  //chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://www.nopcommerce.com/en/demo/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      allureWriter(on, config);
      //return config;
    },
  },
});
