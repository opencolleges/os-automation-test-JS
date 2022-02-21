@chrome
Feature:DPS-659
    Download Assessment
    Background:logging in to the portal
        When user successfully logins

    Scenario:Verify megadrop Menu and search links
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then can click on Module 2
        Then can click on Assessment Project
        Then click Download Assessment
        Then logout the user
