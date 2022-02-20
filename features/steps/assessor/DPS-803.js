const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  assessorOpenSpaceReleaseNotesXpath,
  assessorOpenSpaceReleaseNotesContentXPath,
  assessorMessagesXpath,
  assessorMessagesTabBarItemsXpath,
  firstInboxMessageXpath,
  messageSenderXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(120 * 1000);

const path = require("path");
const { strictEqual } = require("assert");

// Get file name
const fileName = path.basename(__filename);

Then(/^click OpenSpace Release Notes$/, async function () {
  // Wait for page to be fully loaded
  await driver.sleep(5000);

  try {
    var openSpaceReleaseNotes = await driver.wait(
      until.elementLocated(By.xpath(assessorOpenSpaceReleaseNotesXpath)),
      30000
    );
  } catch (err) {
    errorLog(
      fileName,
      "openSpaceReleaseNotes",
      assessorOpenSpaceReleaseNotesXpath,
      "3s"
    );
    driver.close();
    throw Error(err.message);
  }

  openSpaceReleaseNotes.click();
});

Then(
  /^verify the Release notes page is present and content has loaded$/,
  async function () {
    try {
      var title = await driver
        .wait(until.elementLocated(By.css("h1")), 30000)
        .getText();
    } catch (err) {
      errorLog(fileName, "title", "By.css('h1')", "3s");
      driver.close();
      throw Error(err.message);
    }

    strictEqual(title, "Release notes");

    try {
      var content = await driver.wait(
        until.elementLocated(
          By.xpath(assessorOpenSpaceReleaseNotesContentXPath)
        ),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "content",
        assessorOpenSpaceReleaseNotesContentXPath,
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }
  }
);

Then(/^click Messages$/, async function () {
  try {
    var Messages = await driver.wait(
      until.elementLocated(By.xpath(assessorMessagesXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "Messages", assessorMessagesXpath, "3s");
    driver.close();
    throw Error(err.message);
  }

  Messages.click();
});

Then(
  /^check that content loads on Inbox, Send, Notifications, and Contracts tabs$/,
  async function () {
    //   Wait for page loading
    await driver.sleep(5000);

    // Check Inbox content is displayed
    // At least one message should be displayed
    try {
      var messageItem = await driver.wait(
        until.elementLocated(By.className("message-content-regular ng-scope")),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "By.className('message-content-regular ng-scope')",
        "messageItem",
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }

    assert(await messageItem.isDisplayed());

    // Need to confirm that Notification tab can get data
    for (let i = 2; i < 3; i++) {
      try {
        var tabBarItem = await driver.wait(
          until.elementLocated(
            By.xpath(assessorMessagesTabBarItemsXpath + `div[${i}]`)
          ),
          30000
        );
      } catch (err) {
        errorLog(
          fileName,
          "tabBarItem",
          assessorMessagesTabBarItemsXpath + `div[${i}]`,
          "3s"
        );
        driver.close();
        throw Error(err.message);
      }

      tabBarItem.click();

      await driver.sleep(5000);

      try {
        var messageItem = await driver.wait(
          until.elementLocated(
            By.className("message-content-regular ng-scope")
          ),
          30000
        );
      } catch (err) {
        errorLog(
          fileName,
          "By.className('message-content-regular ng-scope')",
          "messageItem",
          "3s"
        );
        driver.close();
        throw Error(err.message);
      }

      assert(await messageItem.isDisplayed());
    }
  }
);

Then(/^select Inbox and select the first message$/, async function () {
  try {
    var inbox = await driver.wait(
      until.elementLocated(
        By.xpath(assessorMessagesTabBarItemsXpath + "div[1]")
      )
    );
  } catch (err) {
    errorLog(
      fileName,
      "inbox",
      assessorMessagesTabBarItemsXpath + `div[${1}]`,
      "3s"
    );
    driver.close();
    throw Error(err.message);
  }

  inbox.click();

  await driver.sleep(5000);

  try {
    var firstInboxMessage = await driver.wait(
      until.elementLocated(By.xpath(firstInboxMessageXpath))
    );
  } catch (err) {
    errorLog(fileName, "firstInboxMessage", firstInboxMessageXpath, "3s");
    driver.close();
    throw Error(err.message);
  }

  firstInboxMessage.click();
});

Then(/^verify that content loads in the right-hand panel$/, async function () {
  await driver.sleep(5000);

  try {
    var messageSender = await driver.wait(
      until.elementLocated(By.xpath(messageSenderXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "messageSender", messageSenderXpath, "3s");
    driver.close();
    throw Error(err.message);
  }

  assert(
    await messageSender.getText(),
    "Emma Biggs",
    "Message sender is not correct"
  );
});
