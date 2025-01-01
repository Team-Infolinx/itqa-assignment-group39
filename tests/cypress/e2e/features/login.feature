Feature: Login functionality

Scenario: Successful login
  Given I open the login page
  When I enter "user@example.com" and "password123"
  Then I should see the dashboard
