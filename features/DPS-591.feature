@chrome
Feature:DPS-591
    Verifying discussion panel.
    Scenario: Verify that user can post image and text into discussion panel.
        When user successfully logins
        Then can preview added image and can remove image from preview panel before posting
        When page is refreshed
        Then can check the image counter before image upload, image icon and posted image can be opened or not after posting the image
        When page is refreshed
        Then can post text into the discussion panel and check the posted text
        Then logout the user