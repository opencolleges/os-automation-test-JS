@chrome
Feature:DPS-579
    Verifying My Profile and Enrolment page
    Scenario: My Profile and Enrolment page
        When user successfully logins
        Then click and hover on the profile menu
        Then click My Profile
        Then check Student Name and Student Number fields are present
        Then check Change Password link correctly redirects to the update_password page
        Then check Grading Preference section can be edited and saved
        Then check Privacy Setting section is present
        Then check Study Buddy settings can be edited and saved
        Then logout the user
