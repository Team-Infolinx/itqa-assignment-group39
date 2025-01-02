Feature: API Testing to Insert Books Data

  Background:
    Given user is logged into the service

  Scenario: Insert new book using POST request
    Given user sends a POST request to add the following book:
      | id | title         | author |
      | 1  | "Sample Book" | "John" |
    Then the insert response status should be 201
    And the response should contain the book data with title "Sample Book" and author "John"

  Scenario: Insert book with missing title
    Given user sends a POST request to add the following book:
      | id | title | author |
      | 2  |       | "John" |
    Then the insert response status should be 400

  Scenario: Insert book with missing author
    Given user sends a POST request to add the following book:
      | id | title         | author |
      | 3  | "Sample Book" |        |
    Then the insert response status should be 400

  Scenario: Insert book with duplicate id
    Given user sends a POST request to add the following book:
      | id | title          | author |
      | 1  | "Another Book" | "Jane" |
    Then the insert response status should be 409
    And the response should contain an error message "Book Already Exists"

  Scenario: Insert book with an invalid id type
    Given user sends a POST request to add the following book:
      | id    | title       | author  |
      | "abc" | "Test Book" | "Alice" |
    Then the insert response status should be 400

  Scenario: Insert book without id (auto-generate id)
    Given user sends a POST request to add the following book:
      | id | title       | author  |
      |    | "Auto Book" | "Chris" |
    Then the insert response status should be 201
    And the response should contain the book data with title "Auto Book" and author "Chris"

  Scenario: Insert book with a specific id
    Given user sends a POST request to add the following book:
      | id   | title              | author     |
      | 1000 | "Specific Book ID" | "Author X" |
    Then the insert response status should be 201
    And the response should contain the book data with title "Specific Book ID" and author "Author X"
    And the response should contain the id 1000