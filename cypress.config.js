const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    defaultCommandTimeout: 8000,

    pageLoadTimeout: 120000, 
  },
});