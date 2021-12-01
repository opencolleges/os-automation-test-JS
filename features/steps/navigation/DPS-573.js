const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  title,
  uatUrl,
  courseCode,
  supportMenuParams,
} = require("../../../data/testData");

const {
  supportMenuXpath,
  messageCenterXpath,
  otherLinksXpath,
} = require("../../../data/elementXpath");

const {
  titleCheck,
  supportMenuHovering,
  errorLog,
} = require("../../../utilities/function");

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

setDefaultTimeout(120 * 1000);

Then(/^checking document title for OpenSpace$/, async function () {
  // Wait for page to fully loaded
  await driver.sleep(5000);

  // Check title is equal
  await titleCheck(driver, fileName, title);
});

// Hover and click support menu
Then(/^hovering and clicking on the support menu$/, async function () {
  await supportMenuHovering(driver, fileName);
});

Then(
  /^check support menus and navigate to all the links listed in the menu$/,
  async function () {
    await driver.sleep(5000);

    try {
      // Find menu links(row)
      const links = await driver.wait(
        until.elementLocated(By.className("large-3")),
        30000
      );
      // Click links except the last one
      for (let i = 0; i < links.length - 1; i++) {
        links[i].click();

        // Wait for browser to redirect
        await driver.sleep(10000);

        // Get the current url
        const currentUrl = await driver.getCurrentUrl();

        // Assert the url is correct
        assert.strictEqual(
          currentUrl,
          uatUrl + "/" + courseCode + "#/" + supportMenuParams[i],
          "Landed Page Url Not Equal"
        );
      }
    } catch (err) {
      errorLog(fileName, "links", "By.className('large-3')", "3s");
      driver.close()
      throw Error(err.message);
    }

    try {
      // Find support menu(column)
      const supportMenu = await driver.wait(
        until.elementLocated(By.xpath(supportMenuXpath)),
        60000
      );

      // Find support menu links
      const supportMenuLinks = await supportMenu.findElements(By.css("li a"));

      // Click links
      for (let i = 1; i < supportMenuLinks.length; i++) {
        supportMenuLinks[i].click();

        // Assert the title is loaded
        await driver.wait(until.elementLocated(By.css("h1")));
      }
    } catch (err) {
      errorLog(fileName, "supportMenu", supportMenuXpath, "6s");
      driver.close()
      throw Error(err.message);
    }
  }
);

Then(
  "check profile menus and navigate to all the links listed in the menu",
  async function () {
    try {
      // Find element (Message Center)
      const messageCenter = await driver.wait(
        until.elementLocated(By.xpath(messageCenterXpath)),
        30000
      );

      // Click element
      messageCenter.click();

      // Confirm that browser redirected and title loaded
      await driver.wait(until.elementLocated(By.css("h1")));
    } catch (err) {
      errorLog(fileName, "messageCenter", messageCenterXpath, "3s");
      driver.close()
      throw Error("messageCenter is not found after waiting for 3s");
    }

    try {
      // Find other links (My Profile, My Grades, My Payment, What's New, Log Out)
      var otherLinks = await driver.findElements(By.xpath(otherLinksXpath));

      // Click elements except Log Out
      for (let i = 0; i < otherLinks.length - 1; i++) {
        otherLinks[i].click();

        try {
          // Confirm that browser redirected and title loaded
          await driver.wait(until.elementLocated(By.css("h1")), 30000);
        } catch (err) {
          errorLog(fileName, "linkTitle", "By.css('h1')", "3s");
          driver.close()
          throw Error(err.message);
        }
      }
    } catch (err) {
      errorLog(fileName, "otherLinks", otherLinksXpath, "3s");
      driver.close()
      throw Error(err.message);
    }

    try {
      // Click Log Out
      otherLinks[otherLinks.length - 1].click();

      // Confirm that browser redirected and title loaded
      await driver.wait(until.elementLocated(By.css("h3")), 30000);
    } catch (err) {
      errorLog(fileName, "logoutTitle", "By.css('h3')", "3s");
      driver.close()
      throw Error(err.message);
    }
  }
);

// Close the web driver after test
// After(function () {
//   driver.close();
// });
