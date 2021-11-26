@chrome
Feature:DPS-802
  Assessor Home Page
    Background:logging in to the portal
        When user successfully logins as an assessor

    Scenario:Check internal announcements page content
      Then click Home
      Then check whether internal announcements is present
      Then check post functionality
      Then like a comment and unlike a comment
      Then add a comment to an existing post
      Then logout the user as an assessor