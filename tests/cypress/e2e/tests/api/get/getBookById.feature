Feature: Get book by ID

  Scenario Outline: Fetching a valid book by ID
    Given the user is authenticated as "<userRole>" with password "password"
    And a valid book ID exists
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details

  Examples:
    | userRole |
    | admin    |
    | user     |


  Scenario Outline: Fetching a non-existent book by ID
    Given the user is authenticated as "<userRole>" with password "password"
    And a non-existent book ID is provided
    When the user fetches the book details with the ID
    Then the API should return a 404 status code

  Examples:
    | userRole |
    | admin    |
    | user     |


  Scenario Outline: Fetching a book with an invalid ID format
    Given the user is authenticated as "<userRole>" with password "password"
    And an invalid book ID is provided
    When the user fetches the book details with the ID
    Then the API should return a 400 status code

  Examples:
    | userRole |
    | admin    |
    | user     |
