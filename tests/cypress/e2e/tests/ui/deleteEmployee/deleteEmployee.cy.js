import {Then, When} from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-xpath';
import DeleteEmployee from "../../../page-objects/deleteEmployeePage.cy";

When("I click on Delete button on a row with ID {string}", (ID) => {
    DeleteEmployee.clickDeleteButton(ID);
});

When("I click on Delete confirmation button", () => {
    DeleteEmployee.clickConfirmationDeleteButton();
});

















 


    
