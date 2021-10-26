const { Then, After, setDefaultTimeout } = require("cucumber");
const assert = require("assert");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  totalCommentsXpath,
  closeMoreDiscussionXpath,
  moreDiscCommentElementXpath,
  commentXpath,
} = require("../../../data/elementXpath");
const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(120 * 1000);

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

Then(
  /^more discussions link will be present at the bottom of discussion panel if there are 10 comments$/,
  async function () {
    // Initialise number of comment
    var commentNumber = 1;

    for (var i = 1; i < 10; i++) {
      try {
        // Assert there are at least 10 comments
        await driver.wait(
          until.elementLocated(By.xpath(commentXpath + `div[${i}] `)),
          60000
        );
        commentNumber++;
      } catch (err) {
        errorLog(fileName, "comment", commentXpath + `div[${i}] `, "6s");
        throw Error(err.message);
      }
    }

    try {
      // Find the number of total comments
      var totalComments = await driver.wait(
        until.elementLocated(By.xpath(totalCommentsXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "totalComments", totalCommentsXpath, "3s");
      throw Error(err.message);
    }

    // Get the number of total comments
    totalComments = parseInt(await totalComments.getText());

    // total comments minues 10 to show the number of rest of comments
    totalComments -= 10;

    // Load more comments if 10 comments loaded
    if (commentNumber === 10) {
      try {
        var moreDiscussionButton = driver.wait(
          until.elementLocated(
            By.xpath(
              `//a[contains(text(),'More discussions (${totalComments})')]`
            )
          ),
          30000
        );
      } catch (err) {
        errorLog(
          fileName,
          "moreDiscussionButton",
          `//a[contains(text(),'More discussions (${totalComments})')]`,
          "3s"
        );
        throw Error(err.message);
      }

      // Scroll to the total comments tag
      await driver.executeScript(
        "arguments[0].scrollIntoView()",
        moreDiscussionButton
      );

      // Assert total comments tag is successfully displayed
      assert(await moreDiscussionButton.isDisplayed());
    }
  }
);

Then(
  /^clicking on more discussion link will load 10 more discussions$/,
  async function () {
    try {
      // Find total comments
      var totalComments = await driver.wait(
        until.elementLocated(By.xpath(totalCommentsXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "totalComments", totalCommentsXpath, "3s");
      throw Error(err.message);
    }

    // Get the number of total comments
    totalComments = parseInt(await totalComments.getText());

    // Get the number of rest of total comments
    const numberOfMoreDiscussion = totalComments - 10;

    try {
      // Find more discussion button
      var moreDiscussionButton = driver.wait(
        until.elementLocated(
          By.xpath(
            `//a[contains(text(),'More discussions (${numberOfMoreDiscussion})')]`
          )
        ),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "moreDiscussionButton",
        `//a[contains(text(),'More discussions (${numberOfMoreDiscussion})')]`,
        "3s"
      );
      throw Error(err.message);
    }

    // Scroll to more discussion button
    await driver.executeScript(
      "arguments[0].scrollIntoView()",
      moreDiscussionButton
    );

    // Click more discussion button to load more comments
    moreDiscussionButton.click();

    //  Load 10 more comments
    for (let moreDiscComment = 12; moreDiscComment < 20; moreDiscComment++) {
      try {
        // Assert every comment is successfully loaded
        var moreDiscCommentElement = await driver.wait(
          until.elementLocated(
            By.xpath(moreDiscCommentElementXpath + `div[${moreDiscComment}] `)
          ),
          30000
        );
      } catch (err) {
        errorLog(
          fileName,
          "moreDiscussionCommentElement",
          moreDiscCommentElementXpath + `div[${moreDiscComment}] `,
          "3s"
        );
        throw Error(err.message);
      }

      // Scroll to that comment
      await driver.executeScript(
        "arguments[0].scrollIntoView()",
        moreDiscCommentElement
      );

      // Assert the comment is successfully displayed
      assert(await moreDiscCommentElement.isDisplayed());
    }
  }
);

Then(
  /^clicking on close link remove 10 Discussion from display panel$/,
  async function () {
    try {
      // Find the button to close more discussion
      const closeMoreDiscussionButton = await driver.wait(
        until.elementLocated(By.xpath(closeMoreDiscussionXpath)),
        30000
      );

      // Click to close
      closeMoreDiscussionButton.click();
    } catch (err) {
      errorLog(
        fileName,
        "closeMoreDiscussionButton",
        closeMoreDiscussionXpath,
        "3s"
      );
    }

    // Wait for web to be fully loaded
    await driver.sleep(5000);

    // Try to load comment agin
    for (let moreDiscComment = 12; moreDiscComment < 20; moreDiscComment++) {
      const moreDiscCommentElement = await driver.findElements(
        By.xpath(moreDiscCommentElementXpath + `div[${moreDiscComment}] `)
      );
      // Assert there is no more comment
      assert(moreDiscCommentElement.length === 0);
    }
  }
);

// After(async function () {
//   driver.close();
// });
