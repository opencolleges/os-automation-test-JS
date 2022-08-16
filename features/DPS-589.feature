@chrome
Feature:DPS-589
    Verifying payment page.
    Scenario: Verifying phone number and payment history.
        When user successfully logins
        Then click and hover on the profile menu
        Then click link My Payments
        Then check Payment History section presents
        Then check Phone Number section presents
        Then logout the user



