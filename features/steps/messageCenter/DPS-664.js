const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  messageReceiverXpath,
  messageButtonXpath,
  messageSubjectXpath,
  messageCenterXpath,
} = require("../../../data/elementXpath");

setDefaultTimeout(60 * 1000);

const path = require("path");
const { errorLog } = require("../../../utilities/function");

// Get file name
const fileName = path.basename(__filename);

Then(/^click Message Centre$/, async function () {
  try {
    var messageCenter = await driver.wait(
      until.elementLocated(By.xpath(messageCenterXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "messageCenter", messageCenterXpath, "3s");
    driver.close();
    throw Error(err.message);
  }

  messageCenter.click();
});

Then(
  /^message Centre Compose screen with all details preloaded for to, subject and student id$/,
  async function () {
    await driver.sleep(5000);

    try {
      // Find message button
      var messageButton = await driver.wait(
        until.elementLocated(By.xpath(messageButtonXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "messageButton", messageButtonXpath, "3s");
      driver.close();
      throw Error(err.message);
    }

    // Click message button
    messageButton.click();

    await driver.sleep(5000);

    try {
      var messageReceiver = await driver.wait(
        until.elementLocated(By.xpath(messageReceiverXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "messageReceiver", messageReceiverXpath, "3s");
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
      driver.close();
      throw Error(err.message);
    }

    // Assert both displayed
    assert(await messageReceiver.isDisplayed());
    assert(await messageSubject.isDisplayed());
  }
);
