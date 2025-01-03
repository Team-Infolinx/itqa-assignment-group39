import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../page-objects/loginPage.cy";
import LoginAsValidUser from "../hooks.cy";

Given("I am on the login page", () => {
    LoginPage.visit();
});

Given("I am a valid user", () => {
    LoginAsValidUser('', ''); // Implement user login logic here
});

When("I enter username with {string}", (username) => {
    LoginPage.enterUserName(username);
});

When("I enter password with {string}", (password) => {
    LoginPage.enterPassword(password);
});

When("I click on submit button", () => {
    LoginPage.submit();
});

Then("I should see the home page", () => {
    LoginPage.seeHomePage();
});

Then("I should see error message with {string}", (error) => {
    LoginPage.getErrorMessage(error);
});
