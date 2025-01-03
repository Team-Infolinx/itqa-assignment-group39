Feature: Remove a Book from the Database
  As an admin or user
  I need to remove a book using the API
  So that I can manage book records or handle errors for invalid deletions

  Scenario: Successfully remove a book as an admin
    Given a book is available with a specific ID
    When the admin performs a DELETE operation
    Then the server should return a status code of 204 after admin DELETE

  Scenario: User tries to remove a book
    Given the user is logged and a book with a specific ID 
    When the user attempts to perform a DELETE operation
    Then the server should return a status code of 403 after user DELETE attempt

  Scenario: Removing a book that doesn’t exist by admin
    Given the admin is logged in to manage books
    When the admin attempts to DELETE a book that does not exist
    Then the server should return a status code of 404 for non-existent book

  Scenario: Deleting a book with an invalid ID as a user
    Given deleting a book with an invalid ID as a regular user
    When the user sends a DELETE request with an invalid book ID
    Then the response status code must be 403 for invalid book ID
