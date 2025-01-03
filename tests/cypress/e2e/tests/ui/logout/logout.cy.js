import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import LoginAsValidUser from "../hooks";
import LogoutPage from "../../../page-objects/logoutPage.cy";

Given("I am logged into the application", () => {
    LoginAsValidUser('', '');
});

When("I click on the logout button", () => {
    LogoutPage.clickLogoutButton();
});

Then("I should see the login page", () => {
    LogoutPage.seeLoginPage();
});

Cypress.on("uncaught:exception", (err, runnable) => {
    // Ignore specific errors that are not critical for test flow
    if (err.message.includes("Cannot read properties of undefined")) {
        return false; // Prevent test failure
    }
    throw err; // Let other errors fail the test
});
