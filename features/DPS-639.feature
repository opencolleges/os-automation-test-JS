@chrome
Feature:DPS-639
    Megadrop Menu and subtopic navigation
    Background:logging in to the portal
        When user successfully logins

    Scenario:Verify megadrop Menu and subtopic navigation
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then check the breadcrumb on module overview page
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then can click on any topic from the Topic panel and it will show sub topic panel for that Topic
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then can click on quiz and check content is loading right
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then can click on assessment and check content is loading right
        # Then logout the user