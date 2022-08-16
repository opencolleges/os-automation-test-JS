@chrome
Feature:DPS-591
    Verifying discussion panel.
    Scenario: Verify that user can post image and text into discussion panel.
        When user successfully logins
        Then can post text into the discussion panel and check the posted text
        Then logout the user