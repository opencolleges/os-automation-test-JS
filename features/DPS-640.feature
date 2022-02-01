@chrome
Feature:DPS-640
    Megadrop Menu and activities
    Background:logging in to the portal
        When user successfully logins

    Scenario:Verify megadrop Menu and activities
        # Then check profile picture, trainer name and position
        Then check document title for OpenSpace 2.0
        # Then can open megadrop course Menu when click on Menu icon on Top navigation
        # Then check activity, reading and resource activities inside course content
        # Then correct subtopic number is present first on subtopic page and click print pdf
        Then logout the user

