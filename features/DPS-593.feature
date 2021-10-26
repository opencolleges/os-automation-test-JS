@chrome
Feature:DPS-593
    Verifying discussions
    Scenario: Verifying discussion count
        When user successfully logins
        Then more discussions link will be present at the bottom of discussion panel if there are 10 comments
        Then clicking on more discussion link will load 10 more discussions
        Then clicking on close link remove 10 Discussion from display panel
        Then logout the user