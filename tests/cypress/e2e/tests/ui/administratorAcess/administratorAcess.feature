Feature: Navigate to Maintenance Purge Record

  Scenario: Admin enters an incorrect password
    Given I am a valid user
    When I navigate to the Administrator access page
    And the Username is automatically filled
    And I enter admin access password with "Admin12345"
    Then I should see an error message saying "Invalid credentials"

  Scenario: Admin enters the correct password
    Given I am a valid user
    When I navigate to the Administrator access page
    And the Username is automatically filled
    And I enter admin access password with "admin123"
    Then I should see Maintenance Purge Record

