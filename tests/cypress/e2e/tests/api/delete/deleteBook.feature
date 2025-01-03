Feature: Remove a Book from the Database
  As an admin or user
  I need to remove a book using the API
  So that I can manage book records or handle errors for invalid deletions

Scenario: Successfully remove a book based on user role permissions
  Given a book is available with a specific ID and user is authenticated as as "<userRole>" with password "password"
  When the user performs a DELETE operation
  Then the server should return a status code of <statusCode> based on the user role "<userRole>"

  Examples:
    | userRole | statusCode |
    | admin    | 204        |
    | user     | 403        |


Scenario: Attempt to Remove a Non-Existent Book Based on User Role Permissions
    Given a user with role "<userRole>" is authenticated with password "password"
    When the user attempts to DELETE a book that does not exist
    Then the server should return a status code of <statusCode> based on user role permissions

  Examples:
    | userRole | statusCode |
    | admin    | 404        |
    | user     | 403        |

Scenario: Attempt to Remove a book with an invalid ID format
    Given for a specific book a user with role "<userRole>" is authenticated with password "password"
    When the user attempts to DELETE a book with an invalid ID format
    Then the backend server should return a status code of <statusCode> based on user role permissions

  Examples:
    | userRole | statusCode |
    | admin    | 400        |
    | user     | 403        |

