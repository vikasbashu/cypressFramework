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
   env: {
    envName: "qa"
   },
  reporterOptions :{
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    //videoOnFailOnly: true,
  },
  //chromeWebSecurity: false,
  e2e: {
    baseUrl: "",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      allureWriter(on, config);
      //return config;
    },
  },
});
