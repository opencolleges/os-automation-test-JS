@chrome
Feature:DPS-592
    Verifying discussions
    Scenario: Verifying discussion likes, dislikes, replies and url content
        When user successfully logins
        Then can add link to discussion text area, Posted link should display in white tile with grey border
        Then can like or dislike the post, can reply to post and like or dislike the reply, and check the timestamp for both
        Then check the profanity for text posted in the discussion panel
        When page is refreshed
        Then check the profanity for replied post in the discussion panel
        Then logout the user
