@chrome
Feature:DPS-803
  Assessor Messaging
    Background:logging in to the portal
        When user successfully logins as an assessor

    Scenario:Check OpenSpace Release Notes page
      Then click OpenSpace Release Notes
      Then verify the Release notes page is present and content has loaded
      Then click Messages
      Then check that content loads on Inbox, Send, Notifications, and Contracts tabs
      Then select Inbox and select the first message
      Then verify that content loads in the right-hand panel
      Then logout the user as an assessor