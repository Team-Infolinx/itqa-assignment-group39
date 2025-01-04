import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-xpath";
import AddEmployee from "../../../page-objects/addEmployeePage.cy";
import "cypress-file-upload";

When("I Click on PIM item in Dashboard", () => {
  AddEmployee.clickPIM();
});

When("I click on Add button", () => {
  AddEmployee.clickAddButton();
});

When("I enter First name with {string}", (firstName) => {
  AddEmployee.enterFirstName(firstName);
});

When("I enter Middle name with {string}", (middleName) => {
  AddEmployee.enterMiddleName(middleName);
});

When("I enter Last name with {string}", (lastName) => {
  AddEmployee.enterLastName(lastName);
});

When("I enter Employee ID", () => {
  const randomEmpID = `EMP${Math.floor(Math.random() * 100000)}`;
  AddEmployee.enterEmpID(randomEmpID);
});

When("I add Image with file path {string}", (filePath) => {
  AddEmployee.addImage(filePath);
});

When("I click on Save button", () => {
  AddEmployee.clickSave();
});

Then("I see Toast massage with {string}", (message) => {
  AddEmployee.seeToast(message);
});
