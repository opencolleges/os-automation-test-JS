@chrome
Feature:DPS-581
    Verifying assessment support page
    Scenario: Verifying assessment support page
        When user successfully logins
        Then click on assessment support category from support menu
        Then click on article blog tiles and then click breadcrumb to back to assessment page
        Then click on support breadcrumb to navigate to back to support centre page
        Then logout the user
