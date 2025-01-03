import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import Login from "../../../services/login.cy";
import books from "../../../services/books.cy";

let bookId = 0;
let titleNumber = 0;
let response = {};

// Scenario 1: Successfully remove a book as admin
Given("a book is available with a specific ID", () => {
  titleNumber = Math.floor(Math.random() * 1000);
  Login.loginUser("user", "password");
  books
    .addBook({
      id: 1,
      title: "Sample Book " + titleNumber,
      author: "Sample Author",
    })
    .then((response) => {
      bookId = response.body.id;
      expect(response.status).to.be.oneOf([201, 200]);
    });
});

When("the admin performs a DELETE operation", () => {
  Login.loginUser("admin", "password");
  books.deleteBook(bookId).then((res) => {
    response = res;
  });
});

Then(
  "the server should return a status code of {int} after admin DELETE",
  (statusCode) => {
    expect(response.status).to.be.equal(statusCode);
  }
);

// Scenario 2: User tries to remove a book
Given("the user is logged and a book with a specific ID", () => {
  Login.loginUser("user", "password");
});

When("the user attempts to perform a DELETE operation", () => {
  titleNumber = Math.floor(Math.random() * 1000);
  books
    .addBook({
      id: 1,
      title: "Sample Book " + titleNumber,
      author: "Sample Author",
    })
    .then((response) => {
      bookId = response.body.id;
      expect(response.status).to.be.equal(201);
    });
  books.deleteBook(bookId).then((res) => {
    response = res;
  });
});

Then(
  "the server should return a status code of {int} after user DELETE attempt",
  (statusCode) => {
    expect(response.status).to.be.equal(statusCode);
  }
);

// Scenario 3: Removing a book that doesn’t exist by admin
Given("the admin is logged in to manage books", () => {
  Login.loginUser("admin", "password");
});

When("the admin attempts to DELETE a book that does not exist", () => {
  books.deleteBook(100000).then((res) => {
    response = res;
  });
});

Then(
  "the server should return a status code of {int} for non-existent book",
  (statusCode) => {
    expect(response.status).to.be.equal(statusCode);
  }
);

// Scenario 4: Deleting a book with an invalid ID as a user
Given("deleting a book with an invalid ID as a regular user", () => {
  Login.loginUser("user", "password");
});

When("the user sends a DELETE request with an invalid book ID", () => {
  books.deleteBook(100000).then((res) => {
    response = res;
  });
});

Then(
  "the response status code must be {int} for invalid book ID",
  (statusCode) => {
    expect(response.status).to.be.equal(statusCode);
  }
);
