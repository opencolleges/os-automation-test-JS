@chrome
Feature:DPS-664
  megadrop menu and subtopic navigation
    Background:logging in to the portal
        When user successfully logins

    Scenario:Hover over trainer tooltip in Discussion Panel (Hover on Image or Name Opens up Tooltip)
      # NEW DASHBOARD IS ON UAT
      # Then check profile picture, trainer name and position
      Then click and hover on the profile menu
      Then click Message Centre
      Then message Centre Compose screen with all details preloaded for to, subject and student id
      Then logout the user