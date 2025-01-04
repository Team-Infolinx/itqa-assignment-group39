import {Then, When} from "@badeball/cypress-cucumber-preprocessor";
import PerformanceTrackerView from "../../../page-objects/performanceTrackerViewPage.cy";

const {default: LoginAsValidUser} = require('../hooks.cy');

When("I navigate to the {string} page", () => {
    PerformanceTrackerView.navigateToPerformancePage();
});

When("I click on {string} tab", (tabName) => {
    PerformanceTrackerView.clickTab(tabName);
});

When("I click the {string} button for a tracker", () => {
    PerformanceTrackerView.clickViewButton();
});

Then("I should see the tracker page with the title {string}", (title) => {
    PerformanceTrackerView.verifyTrackerPage(title);
});
