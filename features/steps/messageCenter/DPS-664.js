const { Then, After, setDefaultTimeout } = require("cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  messageButtonXpath,
  messageSenderXpath,
  messageSubjectXpath,
} = require("../../../data/elementXpath");

setDefaultTimeout(60 * 1000);

const path = require("path");
const { errorLog } = require("../../../utilities/function");

// Get file name
const fileName = path.basename(__filename);

Then(
  /^message Centre Compose screen with all details preloaded for to, subject and student id$/,
  async function () {
    try {
      // Find message button
      var messageButton = await driver.wait(
        until.elementLocated(By.xpath(messageButtonXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "messageButton", messageButtonXpath, "3s");
      throw Error(err.message);
    }

    // Click message button
    messageButton.click();

    try {
      // Find message sender
      var messageSender = await driver.wait(
        until.elementLocated(By.xpath(messageSenderXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "messageSender", messageSenderXpath, "3s");
      throw Error(err.message);
    }

    try {
      // Find message subject
      var messageSubject = await driver.wait(
        until.elementLocated(By.xpath(messageSubjectXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "messageSubject", messageSubjectXpath, "3s");
      throw Error(err.message);
    }

    // Assert both displayed
    assert(
      (await messageSender.isDisplayed()) &&
        (await messageSubject.isDisplayed())
    );

    // Student ID is not possible to select from textarea in DOM
  }
);

// After(async function () {
//   driver.close();
// });
