@chrome
Feature:DPS-577
    Verifying Support Centre
    Scenario: Verifying support centre
        When user successfully logins
        Then click on support menu from nav
        Then check support centre page title is expected
        Then click on all 8 support category and navigate to each page then click on support breadcrumbs to back to support centre page
        Then expand collapse all FAQ on support category page
        Then logout the user



