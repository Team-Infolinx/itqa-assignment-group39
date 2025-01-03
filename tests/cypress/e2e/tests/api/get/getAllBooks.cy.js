import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Books from "../../../services/books.cy";
import Login from "../../../services/login.cy";

let response;

Given("multiple books exist in the system", () => {
  const booksToCreate = 5;
  const bookPromises = [];

  for (let i = 1; i <= booksToCreate; i++) {
    const bookData = {
      title: `Automated Testing Book ${i}`,
      author: `Test Author ${i}`,
    };

    bookPromises.push(Books.addOneBook(bookData));
  }

  cy.wrap(Promise.all(bookPromises));
});

Given("no books exist in the system", () => {
  Login.loginUser("user", "password").then(() => {
    Books.getBooks().then((res) => {
      const books = res.body;

      if (books.length > 0) {
        books.forEach((book) => {
          Books.deleteBook(book.id).then((deleteRes) => {
            expect(deleteRes.status).to.equal(200);
          });
        });
      }

      Books.getBooks().then((finalRes) => {
        expect(finalRes.body).to.be.an("array").that.is.empty;
      });
    });
  });
});

When("the user fetches all books", () => {
  Books.getBooks().then((res) => {
    response = res;
  });
});

Then("the response should contain an error message", () => {
  expect(response.body).to.have.property("message");
  expect(response.body.message).to.equal("Unauthorized access");
});

Then("the response should contain an empty list of books", () => {
  expect(response.body).to.be.an("array").that.is.empty;
});

Then("the response should contain an array of books", () => {
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);
});

Then('each book should have an "id", "title", and "author" property', () => {
  response.body.forEach((book) => {
    expect(book).to.have.property("id");
    expect(book).to.have.property("title");
    expect(book).to.have.property("author");
  });
});
