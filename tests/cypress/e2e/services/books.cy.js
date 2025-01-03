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
}

const books = new Books();
export default books;
