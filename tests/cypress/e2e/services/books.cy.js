const baseUrl = Cypress.config("baseUrlAPI");

class Books {
  visitBooksPage() {
    cy.url().should("eq", baseUrl + "books");
  }

  addBook(bookData) {
    return cy.request({
      method: "POST",
      url: baseUrl + "/api/books",
      body: bookData,
    });
  }

  addOneBook(bookData, authToken) {
    return cy.request({
      method: "POST",
      url: baseUrl + "/api/books",
      headers: { Authorization: `Bearer ${authToken}` },
      body: bookData,
      failOnStatusCode: false,
    });
  }

  getBook(bookId) {
    return cy.request({
      method: "GET",
      url: baseUrl + "/api/books/" + bookId,
      failOnStatusCode: false,
    });
  }

  getBooks() {
    return cy.request("GET", baseUrl + "/api/books");
  }

  deleteBook(bookId, authHeader) {
    if (bookId === undefined || bookId === null) {
      return cy.request({
        method: "DELETE",
        url: baseUrl + "/api/books",
        headers: authHeader,
        failOnStatusCode: false,
      });
    }
    return cy.request({
      method: "DELETE",
      url: baseUrl + "/api/books/" + bookId,
      headers: authHeader,
      failOnStatusCode: false,
    });
  }

  updateBook(bookId, bookData, authToken) {
    // Ensure bookId is provided, otherwise return an error message
    if (!bookId) {
      return cy.wrap({ status: 400, body: { message: "Missing book ID" } });
    }
  
    // Send PUT request to update the book with the authorization token
    return cy.request({
      method: "PUT",
      url: baseUrl + "/api/books/" + bookId,
      headers: { Authorization: `Bearer ${authToken}` },
      body: bookData,
      failOnStatusCode: false,
    }).then((res) => {
      console.log(res); // Log the full response for debugging
      return res;
    });
  }
}

const books = new Books();
export default books;
