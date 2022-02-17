@chrome
Feature:DPS-590
    Verifying FAQ main page and FAQ feedback
    Scenario: Verifying phone number and payment history.
        When user successfully logins
        Then click on getting started support category from support page
        Then click on view more button to navigate to main FAQ page
        Then check FAQ main page title is expected
        Then check the breadscrumbs and heading display correct
        # Then provide the feedback with YES or NO
        Then logout the user



