@chrome
Feature:DPS-583
    Verifying study buddy page.
    Scenario: Verifying phone number and payment history.
        When user successfully logins
        Then hovering and clicking on the support menu
        Then click Support Centre
        Then logout the user
