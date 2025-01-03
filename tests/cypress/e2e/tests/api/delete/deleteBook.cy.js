import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import Login from "../../../services/login.cy";
import books from "../../../services/books.cy";

let bookId = 0;
let response = {};

// Scenario: Successfully remove a book based on user role permissions
Given(
  "a book is available with a specific ID and user is authenticated as as {string} with password {string}",
  (userRole, password) => {
    const titleNumber = Math.floor(Math.random() * 1000);

    Login.loginUser(userRole, password);

    books
      .addBook({
        id: 1,
        title: `Sample Book ${titleNumber}`,
        author: "Sample Author",
      })
      .then((response) => {
        bookId = response.body.id;
        expect(response.status).to.be.oneOf([201, 200]);
      });
  }
);

When("the user performs a DELETE operation", () => {
  books.deleteBook(bookId).then((res) => {
    response = res;
  });
});

Then(
  "the server should return a status code of {int} based on the user role {string}",
  (expectedStatusCode, userRole) => {
    if (userRole === "admin") {
      expect(response.status).to.be.equal(204);
    } else if (userRole === "user") {
      expect(response.status).to.be.equal(403);
    } else {
      throw new Error("Unexpected user role");
    }
  }
);

// Scenario: Attempt to Remove a Non-Existent Book Based on User Role Permissions
Given(
  "a user with role {string} is authenticated with password {string}",
  (userRole, password) => {
    Login.loginUser(userRole, password);
  }
);

When("the user attempts to DELETE a book that does not exist", () => {
  books.deleteBook(100000).then((res) => {
    response = res;
  });
});

Then(
  "the server should return a status code of {int} based on user role permissions",
  (expectedStatusCode) => {
    expect(response.status).to.be.equal(expectedStatusCode);
  }
);

// Scenario: Attempt to Remove a Book with an Invalid ID Format
Given(
  "for a specific book a user with role {string} is authenticated with password {string}",
  (userRole, password) => {
    Login.loginUser(userRole, password);
  }
);

When("the user attempts to DELETE a book with an invalid ID format", () => {
  books.deleteBook("invalid-id").then((res) => {
    response = res;
  });
});

Then(
  "the backend server should return a status code of {int} based on user role permissions",
  (expectedStatusCode) => {
    expect(response.status).to.be.equal(expectedStatusCode);
  }
);

// Scenario: Attempt to Remove a Book Without Authentication
Given("a user is not authenticated", () => {
  window.localStorage.removeItem("auth_token");
});

When("the user attempts to DELETE a book with ID {int}", (bookId) => {
  books.deleteBook(bookId).then((res) => {
    response = res;
  });
});

Then(
  "the server should return a status code of {int}",
  (expectedStatusCode) => {
    expect(response.status).to.be.equal(expectedStatusCode);
  }
);

// Scenario: Attempt to Remove a Book Without Passing an ID
Given(
  "User with role {string} is authenticated with password {string}",
  (userRole, password) => {
    Login.loginUser(userRole, password);
  }
);

When("the user tries to DELETE a book without passing an ID", (bookId) => {
  books.deleteBook(bookId).then((res) => {
    response = res;
  });
});

Then(
  "backend server should return a status code of {int} based on user role permissions",
  (expectedStatusCode) => {
    expect(response.status).to.be.equal(expectedStatusCode);
  }
);
