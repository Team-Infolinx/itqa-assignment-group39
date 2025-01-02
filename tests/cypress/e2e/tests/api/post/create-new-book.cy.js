import {Given, Then} from "@badeball/cypress-cucumber-preprocessor";
import login from "../../../services/login.cy";
import Books from "../../../services/books.cy";

let response;

Given("user is logged into the service", () => {
    login.loginUser("admin", "password").then((res) => {
        response = res;
    });
});

Given("user sends a POST request to add the following book:", (dataTable) => {
    const books = dataTable.hashes().map((row) => ({
        id: row.id ? parseInt(row.id) : undefined,
        title: row.title.replace(/"/g, "").trim(),
        author: row.author.replace(/"/g, "").trim(),
    }));

    Books.addBook(books[0]).then((res) => {
        response = res;
    });
});

Given(
    "user sends a POST request with missing fields to add the following book:",
    (dataTable) => {
        const books = dataTable.hashes().map((row) => ({
            id: row.id ? parseInt(row.id) : undefined,
            title: row.title ? row.title.replace(/"/g, "") : undefined,
            author: row.author ? row.author.replace(/"/g, "") : undefined,
        }));

        Books.addBook(books[0]).then((res) => {
            response = res;
        });
    }
);

Then("the insert response status should be {int}", (statusCode) => {
    expect(response.status).to.eq(statusCode);
});

Then(
    "the response should contain the book data with title {string} and author {string}",
    (expectedTitle, expectedAuthor) => {
        expect(response.body).to.have.property("title", expectedTitle);
        expect(response.body).to.have.property("author", expectedAuthor);
    }
);

Then(
    "the response should contain an error message {string}",
    (errorMessage) => {
        expect(response.body).to.have.property("error", errorMessage);
    }
);

Then("the response should contain the id {int}", (expectedId) => {
    expect(response.body).to.have.property("id", expectedId);
});
