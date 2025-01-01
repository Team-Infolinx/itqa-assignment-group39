import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.visit("/login");
});

When("I enter {string} and {string}", (email, password) => {
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get('button[type="submit"]').click();
});

Then("I should see the dashboard", () => {
  cy.url().should("include", "/dashboard");
});
