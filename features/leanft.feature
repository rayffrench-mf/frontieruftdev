Feature: Website
    Scenario Outline: Navigate to iChris home
        Given I navigate to "<URL>"
        When  I click the "<Action>" button
        Then  the message "<Error>" is shown 
        
        Examples:
                                                | URL                                      | Action | Error                |
                                                | https://ichrisbrowser-test.ftrdevops.com | Login  | Username is required |