import {
  Given,
  Then,
  When
} from "@badeball/cypress-cucumber-preprocessor";
import Books from "../../../services/books.cy";
import Login from "../../../services/login.cy";
let bookId;
let response;
let updatedBookData;
let authToken;

Given(
  "the user is authenticated as {string} and password {string}",
  (userRole, password) => {
    cy.log(`Authenticating as ${userRole}...`);
    Login.loginUser(userRole, password).then((res) => {
      response = res;
      authToken = res.body.token; // Assuming the token is in the response body
    });
  }
);

Given("a book is created for update", () => {
  const titleNumber = Math.floor(Math.random() * 1000);
  const bookData = {
    title: "Automated Testing Book" + titleNumber,
    author: "Test Author",
  };

  Books.addOneBook(bookData).then((res) => {
    expect(res.status).to.equal(201);
    bookId = res.body.id;
  });
});

Given("a not-existent book ID is provided", () => {
  bookId = 99999;
});

Given("book ID is not provided", () => {
  bookId = undefined;
});

Given("invalid book ID is provided", () => {
  bookId = "invalidId"; // Simulate invalid ID
});

Given("the user provides updated book data", () => {
  function generateRandomString(length) {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  updatedBookData = {
    id: bookId,
    title: `Updated Automated Testing Book ${generateRandomString(5)}`,
    author: `Updated Test Author ${generateRandomString(5)}`,
  };
});

Given("the user provides invalid updated book data", () => {
  updatedBookData = {
    id: bookId,
    title: 2564, // Invalid title (should be a string)
      author: 7894, // Invalid author (should be a string)
    };
    });

    Given("the user provides updated book data with missing title", () => {
          updatedBookData = {
              id: bookId,
              author: `Updated Test Author ${Math.random().toString(36).substring(2, 7)}`,
              // Missing title
  };
});

When("the user attempts to update the book with valid data", () => {
  Books.updateBook(bookId, updatedBookData, authToken).then((res) => {
    response = res;
  });
});

When("the user attempts to update the book with invalid data", () => {
  Books.updateBook(bookId, updatedBookData, authToken).then((res) => {
    response = res;
  });
});

Then("the API should return {int} status code", (statusCode) => {
  expect(response.status).to.equal(statusCode);
});

Then("the response should contain the updated book details", () => {
  expect(response.body).to.have.property("id", bookId);
  expect(response.body).to.have.property("title", updatedBookData.title);
  expect(response.body).to.have.property("author", updatedBookData.author);
});

Then("the book data should be updated in the system", () => {
  Books.getBook(bookId).then((res) => {
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("title", updatedBookData.title);
    expect(res.body).to.have.property("author", updatedBookData.author);
  });
});

Then("the response should indicate that the book id is not matched", () => {
  expect(response.body).to.equal("Book not found");
});

Then("the response should contain an error message for invalid data", () => {
  expect(response.body).to.equal("Invalid data provided");
});

Then("the response should contain an error message for missing book ID", () => {
  expect(response.body).to.equal("Missing book ID");
});

Then("the response should contain an error message for invalid book ID", () => {
  expect(response.body).to.equal("Invalid book ID");
});

Then("the response should contain an error message for missing required fields", () => {
  expect(response.body).to.equal("Missing required field: title");
});
