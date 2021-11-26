const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  assessorHomeXpath,
  assessorHomeInternalAnnouncementsXpath,
  assessorHomeTextAreaXpath,
  assessorHomePostButtonXpath,
  assessorHomeFirstCommentXpath,
  assessorHomeLikeButtonXpath,
  assessorHomeCommentTextAreaXpath,
  assessorHomeCommentPostButtonXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(120 * 1000);

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

Then(/^click Home$/, async function () {
  // Wait for page to be fully loaded
  await driver.sleep(5000);

  try {
    var home = await driver.wait(
      until.elementLocated(By.xpath(assessorHomeXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "home", assessorHomeXpath, "3s");
    throw Error(err.message);
  }

  home.click();
});

Then(/^check whether internal announcements is present$/, async function () {
  try {
    var internalAnnouncements = await driver.wait(
      until.elementLocated(By.xpath(assessorHomeInternalAnnouncementsXpath)),
      30000
    );
  } catch (err) {
    errorLog(
      fileName,
      "internalAnnouncements",
      assessorInternalAnnouncementsXpath,
      "3s"
    );
    throw Error(err.message);
  }

  assert(await internalAnnouncements.isDisplayed());
});

Then(/^check post functionality$/, async function () {
  try {
    var textArea = await driver.wait(
      until.elementLocated(By.xpath(assessorHomeTextAreaXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "textArea", assessorHomeTextAreaXpath, "3s");
    throw Error(err.message);
  }

  textArea.click();

  await textArea.sendKeys("Testing Testing");

  try {
    var postButton = await driver.wait(
      until.elementLocated(By.xpath(assessorHomePostButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "postButton", assessorHomePostButtonXpath, "3s");
    throw Error(err.message);
  }

  postButton.click();
});

Then(/^like a comment and unlike a comment$/, async function () {
  await driver.sleep(5000);

  try {
    var firstComment = await driver.wait(
      until.elementLocated(By.xpath(assessorHomeFirstCommentXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "firstComment", assessorHomeFirstCommentXpath, "3s");
    throw Error(err.message);
  }

  firstComment.click();

  try {
    var likeButton = await driver.wait(
      until.elementLocated(By.xpath(assessorHomeLikeButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "likeButton", assessorHomeLikeButtonXpath, "3s");
    throw Error(err.message);
  }

  // Click to like this comment
  likeButton.click();

  // Click again to displike comment
  likeButton.click();
});

Then(/^add a comment to an existing post$/, async function () {
  try {
    var commentTextArea = await driver.wait(
      until.elementLocated(By.xpath(assessorHomeCommentTextAreaXpath)),
      30000
    );
  } catch (err) {
    errorLog(
      fileName,
      "commentTextArea",
      assessorHomeCommentTextAreaXpath,
      "3s"
    );
    throw Error(err.message);
  }
  commentTextArea.click();

  await commentTextArea.sendKeys("Testing comment");

  try {
    var commentPostButton = await driver.wait(
      until.elementLocated(By.xpath(assessorHomeCommentPostButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(
      fileName,
      "commentPostButton",
      assessorHomeCommentPostButtonXpath,
      "3s"
    );
    throw Error(err.message);
  }

  commentPostButton.click();
});

// After(async function () {
//   driver.close();
// });
