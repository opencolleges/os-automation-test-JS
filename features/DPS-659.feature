@chrome
Feature:DPS-659
    Download Assessment
    Background:logging in to the portal
        When user successfully logins

    Scenario:Verify megadrop Menu and search links
        # Then can open megadrop course Menu when click on Menu icon on Top navigation
        # Then can click on Module 1 Facilitate programs and behaviours
        # Need scroll down mega menu to see the assessment
        # Then can click on Assessment Knowledge Test
        # Then click Download Assessment
        Then logout the user
