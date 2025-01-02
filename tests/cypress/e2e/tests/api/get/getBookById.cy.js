import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Books from "../../../services/books.cy";
import Login from "../../../services/login.cy";

let bookId;
let response;

Given(
  "the user is authenticated as {string} with password {string}",
  (username, password) => {
    Login.loginUser(username, password).then((res) => {
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

  // Create a valid book to get its ID
  Books.addOneBook(bookData).then((res) => {
    expect(res.status).to.equal(201); // Verify book creation
    bookId = res.body.id; // Save the book ID for later use
  });
});

Given("a non-existent book ID is provided", () => {
  bookId = 99999; // Use a non-existent book ID
});

Given("an invalid book ID is provided", () => {
  bookId = "invalidId"; // Invalid format, should be an integer
});

Given("no book ID is provided", () => {
  bookId = undefined; // No ID for this case
});

Given("a book with a string ID is provided", () => {
  bookId = "123abc"; // Invalid format
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
