const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler();
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "http://localhost:3000",
  },
});
