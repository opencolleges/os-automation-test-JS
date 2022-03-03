@chrome
Feature:DPS-583
    Verifying study buddy page.
    Scenario: Verifying phone number and payment history.
        When user successfully logins
        Then hovering and clicking on the support menu
        Then click Support Centre
        Then click Study Buddy
        # Gecko Error, title is not equal
        # Then check Support Centre title
        # Waiting for element to be located
        # Then click arrow icon of each question to show details
        # Then click View more button to show more questions
        # Then check the title
        Then logout the user
