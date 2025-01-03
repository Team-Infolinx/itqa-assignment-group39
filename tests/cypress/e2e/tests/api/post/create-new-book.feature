Feature: API Testing to Insert Books Data

  Background:
    Given user is logged into the service

  Scenario Outline: Insert new book using POST request
    Given the user is authenticated as "<userRole>" with password "password"
    And user sends a POST request to add the following book with user role:
      | id       | title       | author   |
      | <bookId> | <bookTitle> | <author> |
    Then the insert response status should be 201
    And the response should contain the book data with title "<bookTitle>" and author "<author>"
    And the created book should be deleted

    Examples:
      | userRole | bookId | bookTitle    | author  |
      | admin    | 1      | Admin_Book_1 | Admin_1 |
      | user     | 2      | User_Book_1  | User_1  |

  Scenario: Insert book with missing title
    Given user sends a POST request to add the following book:
      | id | title | author |
      | 3  |       | "John" |
    Then the insert response status should be 400
    And the created book should be deleted

  Scenario: Insert book with missing author
    Given user sends a POST request to add the following book:
      | id | title    | author |
      | 4  | "Book_2" |        |
    Then the insert response status should be 400
    And the created book should be deleted

  Scenario: Insert book with duplicate id
    Given user sends a POST request to add the following book:
      | id | title    | author |
      | 5  | "Book_3" | "Jane" |
    Then the insert response status should be 409
    And the response should contain an error message "Book Already Exists"
    And the created book should be deleted

  Scenario: Insert book with an invalid id type
    Given user sends a POST request to add the following book:
      | id    | title    | author  |
      | "abc" | "Book_4" | "Alice" |
    Then the insert response status should be 400
    And the created book should be deleted

  Scenario: Insert book without id (auto-generate id)
    Given user sends a POST request to add the following book:
      | id | title    | author  |
      |    | "Book_5" | "Chris" |
    Then the insert response status should be 201
    And the response should contain the book data with title "Book_5" and author "Chris"
    And the created book should be deleted

  Scenario: Insert book with a specific id
    Given user sends a POST request to add the following book:
      | id   | title    | author     |
      | 1000 | "Book_6" | "Author X" |
    Then the insert response status should be 201
    And the response should contain the book data with title "Book_6" and author "Author X"
    And the response should contain the id 1000
    And the created book should be deleted