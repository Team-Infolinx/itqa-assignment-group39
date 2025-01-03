import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Books from "../../../services/books.cy";
import Login from "../../../services/login.cy";

let bookId;
let response;

Given(
  "the user is authenticated as {string} with password {string}",
  (userRole, password) => {
    cy.log(`Authenticating as ${userRole}...`);
    Login.loginUser(userRole, password).then((res) => {
      response = res;
    });
  }
);

Given("a valid book ID exists", () => {
  titleNUmber = Math.floor(Math.random() * 1000);
  const bookData = {
    title: "Automated Testing Book" + titleNUmber,
    author: "Test Author",
  };

  Books.addOneBook(bookData).then((res) => {
    expect(res.status).to.equal(201);
    bookId = res.body.id;
  });
});

Given("a non-existent book ID is provided", () => {
  bookId = 99999;
});

Given("an invalid book ID is provided", () => {
  bookId = "invalidId";
});

Given("no book ID is provided", () => {
  bookId = undefined;
});

Given("a book with a string ID is provided", () => {
  bookId = "123abc";
});

When("the user fetches the book details with the ID", () => {
  Books.getBook(bookId).then((res) => {
    response = res;
  });
});

Then("the API should return a {int} status code", (statusCode) => {
  expect(response.status).to.equal(statusCode);
});

Then("the response should contain the correct book details", () => {
  expect(response.body).to.have.property("id", bookId);
  expect(response.body).to.have.property("title").and.to.be.a("string");
  expect(response.body).to.have.property("author").and.to.be.a("string");
});
