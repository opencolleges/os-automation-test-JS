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
const uatUrl = process.env["uatUrl"]

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

    openSpaceReleaseNotes.click();
  } catch (err) {
    errorLog(
      fileName,
      "openSpaceReleaseNotes",
      assessorOpenSpaceReleaseNotesXpath,
      "3s"
    );
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

});

Then(
  /^verify the Release notes page is present and content has loaded$/,
  async function () {
    try {
      var title = await driver
        .wait(until.elementLocated(By.css("h1")), 30000)
        .getText();
      strictEqual(title, "Release notes");
    } catch (err) {
      errorLog(fileName, "title", "By.css('h1')", "3s");
      driver.navigate().to(uatUrl+"/user/logout");
      throw Error(err.message);
    }



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
      driver.navigate().to(uatUrl+"/user/logout");
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

    Messages.click();
  } catch (err) {
    errorLog(fileName, "Messages", assessorMessagesXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

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
      driver.navigate().to(uatUrl+"/user/logout");
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
        driver.navigate().to(uatUrl+"/user/logout");
      }

      tabBarItem.click();

      await driver.sleep(1000);

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
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  inbox.click();

  await driver.sleep(1000);

  try {
    var firstInboxMessage = await driver.wait(
      until.elementLocated(By.xpath(firstInboxMessageXpath))
    );
  } catch (err) {
    errorLog(fileName, "firstInboxMessage", firstInboxMessageXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  firstInboxMessage.click();
});

Then(/^verify that content loads in the right-hand panel$/, async function () {


  try {
    var messageSender = await driver.wait(
      until.elementLocated(By.xpath(messageSenderXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "messageSender", messageSenderXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  assert(
    await messageSender.getText(),
    "Michelle Badato",
    "Message sender is not correct"
  );
});
