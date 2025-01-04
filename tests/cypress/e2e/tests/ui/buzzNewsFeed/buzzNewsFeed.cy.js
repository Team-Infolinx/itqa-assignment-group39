import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import BuzzPage from "../../../page-objects/buzzPage.cy";

const {default: LoginAsValidUser} = require('../hooks.cy');

Given("I am logged in", () => {
    LoginAsValidUser('', '');
});

When("I navigate to the Buzz page", () => {
    BuzzPage.navigateToBuzzPage();
});

When("I add a news feed with the text {string}", (feedText) => {
    BuzzPage.addNewsFeed(feedText);
});

Then("I should see the news feed with the text {string} on the Buzz feed", (expectedText) => {
    BuzzPage.verifyNewsFeed(expectedText);
});
