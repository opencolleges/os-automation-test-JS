const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  searchInputXpath,
  firstLinkXpath,
  supportCentreLinkXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");
setDefaultTimeout(60 * 1000);

const path = require("path");
const uatUrl = process.env["uatUrl"]

// Get file name
const fileName = path.basename(__filename);

Then(
  /^enter keyword course to search and click on the first search result$/,
  async function () {
    try {
      // Find search input bar
      var searchInput = await driver.wait(
        until.elementLocated(By.xpath(searchInputXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "searchInput", searchInputXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
      throw Error(err.message);
    }

    // Type course in search bar
    searchInput.sendKeys("course");

    // Wait page to load
    await driver.sleep(5000);

    try {
      // Find the first result
      var firstLink = await driver.wait(
        until.elementLocated(By.xpath(firstLinkXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "firstLink", firstLinkXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click it
    firstLink.click();

    // Wait page to load
    await driver.sleep(5000);
  }
);

Then(/^check page title is displayed$/, async function () {
  // Find page title
  const title = await driver.wait(until.elementLocated(By.css("h1")), 30000);

  // Assert title is displayed
  await title.isDisplayed();
});

Then(/^click on support centre from search list$/, async function () {
  try {
    // Find search input bar
    var searchInput = await driver.wait(
      until.elementLocated(By.xpath(searchInputXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "searchInput", searchInputXpath, "3s");
      driver.navigate().to(uatUrl+"/user/logout");
      throw Error(err.message);
  }

  // Type course in search bar
  searchInput.sendKeys("course");

  // Wait page to load
  await driver.sleep(5000);
});

Then(
  /^click on the last result which called support centre from search list$/,
  async function () {
    try {
      // Find search input bar
      var searchInput = await driver.wait(
        until.elementLocated(By.xpath(searchInputXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "searchInput", searchInputXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Type course in search bar
    searchInput.sendKeys("course");

    // Wait page to load
    await driver.sleep(5000);

    try {
      // Find the supportCentre link
      var supportCentreLink = await driver.wait(
        until.elementLocated(By.xpath(supportCentreLinkXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "supportCentreLink", supportCentreLinkXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click it
    supportCentreLink.click();

    // Wait page to load
    await driver.sleep(5000);
  }
);
