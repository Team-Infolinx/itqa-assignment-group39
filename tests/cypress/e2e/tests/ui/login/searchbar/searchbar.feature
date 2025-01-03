Feature: Check Search bar

  Scenario: Correct element check
    Given I am a valid user
    When navigate to the search bar
    And enter correct element "Admin"
    Then should see filtered element "Admin"

  Scenario: Incorrect element check
    Given I am a valid user
    When navigate to the search bar
    And enter correct element "bnbdnwbnbwn"
    Then should not see filtered element "bnbdnwbnbwn"

  Scenario: Case Sensivity Check
    Given I am a valid user
    When navigate to the search bar
    And enter correct element "daShboard"
    Then should see filtered element "Dashboard"

