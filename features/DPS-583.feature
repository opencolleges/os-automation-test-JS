@chrome
Feature:DPS-583
    Verifying study buddy page.
    Scenario: Verifying phone number and payment history.
        When user successfully logins
        Then hovering and clicking on the support menu
        Then click Support Centre
        #Then click Study Buddy
        #Then click arrow icon of each question to show details
        #Then click View more button to show more questions
        Then logout the user
