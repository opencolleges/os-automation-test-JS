@chrome
Feature:DPS-581
    Verifying assessment support page
    Scenario: Verifying assessment support page
        When user successfully logins
        Then click on assessment support category from support menu
        Then check assessment support page title is expected
        Then click on article blog tiles and then click breadcrumb to back to assessment page
        Then logout the user
