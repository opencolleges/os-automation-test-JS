@chrome
Feature:DPS-573
    Verifying top navigations.
    Scenario: Verifying support and profile menu.
        When user successfully logins
        Then checking document title for OpenSpace
        Then hovering and clicking on the support menu
        Then check support menus and navigate to all the links listed in the menu
        Then click and hover on the profile menu
        Then check profile menus and navigate to all the links listed in the menu



