Feature: API Testing for Login

  Scenario Outline: Login with user credentials
    Given the user is authenticated as "<userRole>" with password "password"
    Then the response status should be 200

    Examples:
      | userRole |
      | admin    |
      | user     |

  Scenario: Login with invalid credentials
    Given I send a POST request to login with username "invalidUser" and password "invalidPassword"
    Then the response status should be 401

  Scenario: Login with missing credentials
    Given I send a POST request to login with username "" and password ""
    Then the response status should be 400

