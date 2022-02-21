@chrome
Feature:DPS-900
    Scenario: Search bar in support centre page
        When user successfully logins
        Then click on support menu from nav
        Then enter keyword course to search and click on the first search result
        Then check page title is displayed
        Then click on support menu from nav
        Then click on the last result which called support centre from search list
        Then logout the user