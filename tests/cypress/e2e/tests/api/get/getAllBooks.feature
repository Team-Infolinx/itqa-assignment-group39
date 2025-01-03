Feature: Get all books

  Scenario Outline: Fetching all books successfully
    Given the user is authenticated as "<userRole>" with password "password"
    And multiple books exist in the system
    When the user fetches all books
    Then the API should return a 200 status code
    And the response should contain an array of books
    And each book should have an "id", "title", and "author" property

  Examples:
    | userRole |
    | admin    |
    | user     |


  Scenario: Fetching all books when no books exist in the system
    Given no books exist in the system
    And the user is authenticated as "<userRole>" with password "password"
    When the user fetches all books
    Then the API should return a 200 status code
    And the response should contain an empty list of books

  Examples:
    | userRole |
    | admin    |
    | user     |