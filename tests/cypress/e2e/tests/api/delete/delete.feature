Feature: Delete a Book By using Book bookId

  As an admin I want to delete a book using API So that I can 

  Scenario : Valid book deletion by admin
    Given a book with a BOOK bookId
    When the admin sends a DELETE request
    Then the response status code should be 200
    
    