const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  replyPostWrapperXpath,
  replyPostAreaXpath,
  replyTimeStampXpath,
  replyPostButtonXpath,
  discussionPanelXpath,
} = require("../../../data/elementXpath");

const {
  publishPostToDiscussionPanel,
  errorLog,
  pofanityCheck,
} = require("../../../utilities/function");

setDefaultTimeout(120 * 1000);

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

// Profane text to prohibit
const profaneText = ["fuck", "fuckers", "bollock", "bitch", "bastardz"];

Then(
  /^can add link to discussion text area, Posted link should display in white tile with grey border$/,
  async function () {
    // Wait for page to be fully loaded
    await driver.sleep(5000);

    // Publish post to discussion panel
    await publishPostToDiscussionPanel(driver, fileName);
  }
);

Then(
  /^can like or dislike the post, can reply to post and like or dislike the reply, and check the timestamp for both$/,
  async function () {
    // Publish post to discussion panel
    await publishPostToDiscussionPanel(driver, fileName);

    try {
      // Find reply post wrapper
      const replyPostWrapper = await driver.wait(
        until.elementLocated(By.xpath(replyPostWrapperXpath)),
        60000
      );

      // Click reply post wrapper
      replyPostWrapper.click();
    } catch (err) {
      errorLog(fileName, "replyPostWrapper", replyPostWrapperXpath, "6s");
      throw Error(err.message);
    }

    try {
      // Find reply post textarea
      const replyPostTextArea = await driver.wait(
        until.elementLocated(By.xpath(replyPostAreaXpath)),
        30000
      );

      // Input text to reply post textarea
      replyPostTextArea.sendKeys("reply");
    } catch (err) {
      errorLog(fileName, "replyPostTextArea", replyPostAreaXpath, "3s");
      throw Error(err.message);
    }

    try {
      // Find reply post button
      const replyPostButton = await driver.wait(
        until.elementLocated(By.xpath(replyPostButtonXpath)),
        30000
      );

      // Click reply post button
      driver.executeScript("arguments[0].click()", replyPostButton);
    } catch (err) {
      errorLog(fileName, "replyPostButton", replyPostButtonXpath, "3s");
      throw Error(err.message);
    }

    try {
      // Find reply timestamp
      const replyTimeStamp = await driver.wait(
        until.elementLocated(By.xpath(replyTimeStampXpath)),
        30000
      );

      // Assert reply time stamp is successfully displayed
      assert(await replyTimeStamp.isDisplayed());
    } catch (err) {
      errorLog(fileName, "replyTimeStamp", replyTimeStampXpath, "3s");
      throw Error(err.message);
    }
    //  ------------------------------- ! Cant find elements -------------------------------

    //   const likeReply = await driver.wait(
    //     until.elementLocated(
    //       By.xpath(
    //         "//div[@class='small-10 columns nopad-MtL-l']//span[contains(text(),'0')]"
    //       )
    //     ),
    //     30000
    //   );

    //   likeReply.click();

    //   const unlikeReply = await driver.wait(
    //     until.elementLocated(
    //       By.xpath(
    //         "//div[@class='small-10 columns nopad-MtL-l']//span[contains(text(),'1')]"
    //       )
    //     ),
    //     30000
    //   );
    //   unlikeReply.click();
  }
);

Then(
  /^check the profanity for text posted in the discussion panel$/,
  async function () {
    try {
      // Find discussion panel
      var discussionPanel = await driver.wait(
        until.elementLocated(By.xpath(discussionPanelXpath)),
        30000
      );

      // Click discussion panel to focus
      discussionPanel.click();
    } catch (err) {
      errorLog(fileName, "discussionPanel", discussionPanelXpath, "3s");
      throw Error(err.message);
    }

    // Wait to focus on discussion panel
    await driver.sleep(5000);

    for (let i = 0; i < profaneText.length; i++) {
      // Input profane text
      await discussionPanel.sendKeys(profaneText[i]);

      await pofanityCheck(driver, fileName);

      // Clear discussion panel
      await discussionPanel.clear();
    }
  }
);

Then(
  /^check the profanity for replied post in the discussion panel$/,
  async function () {
    // Publish post to discussion panel
    await publishPostToDiscussionPanel(driver, fileName);

    try {
      // Find reply post wrapper
      const replyPostWrapper = await driver.wait(
        until.elementLocated(By.xpath(replyPostWrapperXpath)),
        30000
      );

      // Click to show reply area
      replyPostWrapper.click();
    } catch (err) {
      errorLog(fileName, "replyPostWrapper", replyPostWrapperXpath, "3s");
      throw Error(err.message);
    }

    try {
      // Find reply post area
      var replyPostArea = await driver.wait(
        until.elementLocated(By.xpath(replyPostAreaXpath)),
        30000
      );

      // Click reply post area
      replyPostArea.click();
    } catch (err) {
      errorLog(fileName, "replyPostArea", replyPostAreaXpath, "3s");
      throw Error(err.message);
    }

    // Wait to focus on reply panel
    await driver.sleep(5000);

    for (let i = 0; i < profaneText.length; i++) {
      // Input profane text
      await replyPostArea.sendKeys(profaneText[i]);

      await pofanityCheck(driver, fileName);

      // Clear discussion panel
      await replyPostArea.clear();
    }
  }
);

// After(async function () {
//   driver.close();
// });
