@chrome
Feature:DPS-642
    Megadrop Menu and search links
    Background:logging in to the portal
        When user successfully logins

    Scenario:Verify megadrop Menu and search links
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then can click on any topic from the Topic panel and it will show sub topic panel for that Topic
        Then can click on forward and backward subtopic pagination arrows to check page title
        Then logout the user
