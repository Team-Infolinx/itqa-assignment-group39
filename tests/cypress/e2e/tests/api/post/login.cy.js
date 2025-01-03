import {Given, Then} from "@badeball/cypress-cucumber-preprocessor";
import Login from "../../../services/login.cy";

let response;

Given(
    "I send a POST request to login with username {string} and password {string}",
    (username, password) => {
        Login.loginUser(username, password).then((res) => {
            response = res;
        });
    }
);

Then("the response status should be {int}", (statusCode) => {
    expect(response.status).to.eq(statusCode);
});

Then("the response body should contain {string}", (message) => {
    expect(response.body).to.include(message);
});

