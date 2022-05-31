@chrome
Feature:DPS-1086
    Extension form
    Scenario: Verifying user with expired course can extend thier course
        When user with an expired course logs in
        Then ensure 'Contact Support' button exsists
        Then logout the user