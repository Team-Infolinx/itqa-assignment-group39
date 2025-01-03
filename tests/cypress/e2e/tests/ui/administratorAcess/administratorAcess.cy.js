import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import AdminAccessPage from '../../../page-objects/administarorAcessPage.cy';


When("I navigate to the Administrator access page", () => {
    AdminAccessPage.visit();
    AdminAccessPage.verifyAdminPageLoaded();
});

When("the Username is automatically filled", () => {
    AdminAccessPage.verifyUsernameIsAutofilled();
});

When("I enter admin access password with {string}", (password) => {
    AdminAccessPage.enterPassword(password);
    AdminAccessPage.submit();
});

When('I leave the password field empty', function () {
    AdminAccessPage.clearPassword();
    AdminAccessPage.submit();  // Clears the password field
});

Then("I should see an error message saying {string}", (errorMessage) => {
    AdminAccessPage.verifyErrorMessage(errorMessage);
});

Then("I should see Maintenance Purge Record", () => {
    AdminAccessPage.verifyNavigationToMaintenancePurgeRecord(); // Correct function call
});


