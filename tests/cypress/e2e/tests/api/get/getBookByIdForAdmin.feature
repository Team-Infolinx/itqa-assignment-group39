Feature: Get book by ID for Admin

Background:
    Given the user is authenticated as 'admin' with password 'password'

  Scenario: Fetching a valid book by ID
    Given a valid book ID exists
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details


  Scenario: Fetching a non-existent book by ID
    Given a non-existent book ID is provided
    When the user fetches the book details with the ID
    Then the API should return a 404 status code


  Scenario: Fetching a book with an invalid ID format
    Given an invalid book ID is provided
    When the user fetches the book details with the ID
    Then the API should return a 400 status code
    

  Scenario: Fetching a book with a string ID
    Given a book with a string ID is provided
    When the user fetches the book details with the ID
    Then the API should return a 400 status code
