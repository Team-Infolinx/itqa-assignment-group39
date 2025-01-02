import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../page-objects/loginPage.cy";

// Navigate to the login page
Given("I am on the login page", () => {
  LoginPage.visit();
});

// Enter username in the login form
When("I enter username with {string}", (username) => {
  LoginPage.enterUserName(username);
});

// Enter password in the login form
When("I enter password with {string}", (password) => {
  LoginPage.enterPassword(password);
});

When("I click on submit button", () => {
  LoginPage.submit();
});

Then("I should see the home page", () => {
  LoginPage.seeHomePage();
});

// Validate the presence of an error message
Then("I should see error message with {string}", (error) => {
  LoginPage.getErrorMessage(error);
});
