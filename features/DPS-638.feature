@chrome
Feature:DPS-638
    Megadrop Menu and navigation verification
    Background:logging in to the portal
        When user successfully logins

    Scenario:Verify megadrop menu options
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then click on course home page from megadrop menu and navigate to Home Page
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        Then click and navigate to course overview page and check the content loading right
        Then can open megadrop course Menu when click on Menu icon on Top navigation
        # Gecko issue
        # Then can click on any module and it will show topic panel for that module and check the content
        # Then can open megadrop course Menu when click on Menu icon on Top navigation
        # Then click on additional resources to check content loading right
        # Then open pages for additional resources and click on few documents link to test
        # Then logout the user





