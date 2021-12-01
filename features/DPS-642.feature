@chrome
Feature:DPS-642
    Megadrop Menu and search links
    Background:logging in to the portal
        When user successfully logins

    Scenario:Verify megadrop Menu and search links
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then can click on any topic from the Topic panel and it will show sub topic panel for that Topic
        Then can click on forward and backward subtopic pagination arrows to check page title
        # Then enter keyword course to search and click on the first search result
        # Then check page title is displayed
        # Then click on the last result which called support centre from search list
        Then logout the user
