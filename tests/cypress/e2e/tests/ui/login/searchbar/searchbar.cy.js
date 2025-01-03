import {Then, When} from "@badeball/cypress-cucumber-preprocessor";
import Searchbar from '../../../page-objects/searchbar.cy';
    
const {default: LoginAsValidUser} = require('../hooks.cy');


When("navigate to the search bar", () => {
    Searchbar.visit();
});

When("enter correct element {string}", (element) => {
    Searchbar.enterSearchTerm(element);
});

Then("should see filtered element {string}", (expectedElement) => {
    Searchbar.verifyFilteredElement(expectedElement);
});

Then("should not see filtered element {string}", (expectedElement) => {
    Searchbar.verifyNoFilteredElement(expectedElement);
});
