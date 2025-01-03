import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-xpath';
import DeleteUserPageCy from "../../../page-objects/deleteUserPage.cy";

const {default: LoginAsValidUser} = require('../hooks.cy');

Given('I am logged in as an admin', () => {
    LoginAsValidUser('', '');
});

When('I Click on Admin item in Dashboard', () => {
    // cy.xpath(`//li[contains(@class, 'oxd-main-menu-item-wrapper')]//a[span[text()='Admin']]`)
    // .should('be.visible')
    // .click();
    DeleteUserPageCy.clickOnAdminItem();
})

When('I search for the row with username {string}', (username) => {
    // cy.get('.oxd-table-row')
    //   .contains('div[data-v-6c07a142]', username)
    //   .parents('.oxd-table-row')
    //   .as('targetRow')
    DeleteUserPageCy.searchForUserName(username);
});

When('I Click on Delete button of corresponding row', () => {
    // cy.get('@targetRow') // Access the previously saved alias
    // .within(() => {
    //   cy.get('.oxd-icon-button.oxd-table-cell-action-space')
    //     .eq(0) // Select the delete button
    //     .click();
    // });
    DeleteUserPageCy.clickDelete();
});

When('I click on Confirmation button', () => {
    //cy.xpath('/html/body/div/div[3]/div/div/div/div[3]/button[2]').click();
    DeleteUserPageCy.clickDeleteOnConfirmation();
});

Then('I should be able to see toast with {string}', (message) => {
    // cy.get('[class*="toast"]')
    // .should('be.visible')
    // .and('contain', message);
    DeleteUserPageCy.seeToast(message);
});
