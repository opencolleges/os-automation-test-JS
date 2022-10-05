const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  footerXpath,
  previousPageXpath,
  nextPageXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");
setDefaultTimeout(60 * 1000);

const path = require("path");
const uatUrl = process.env["uatUrl"]

// Get file name
const fileName = path.basename(__filename);

Then(
  /^can click on forward and backward subtopic pagination arrows to check page title$/,
  async function () {
    try {
      // Find privous page pagination
      var previousPage = await driver.wait(
        until.elementLocated(By.xpath(previousPageXpath)),
        60000
      );
    } catch (err) {
      errorLog(fileName, "previousPage", previousPageXpath, "6s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    try {
      // Find next page pagination
      var nextPage = await driver.wait(
        until.elementLocated(By.xpath(nextPageXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "nextPage", nextPageXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // assert both are displayed
    (await previousPage.isDisplayed()) && (await nextPage.isDisplayed());

    // Click previous page pagination
    previousPage.click();

    // Wait for page to load
    await driver.sleep(5000);

    // Find previous page title
    const previousPageTitle = await driver.wait(
      until.elementLocated(By.css("h3")),
      30000
    );

    // Assert title is displayed
    await previousPageTitle.isDisplayed();

    try {
      // Find footer to scroll down the page
      var footer = await driver.wait(
        until.elementLocated(By.xpath(footerXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "footer", footerXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Scroll down to footer
    await driver.executeScript("arguments[0].scrollIntoView()", footer);

    try {
      // Find next page pagination
      var nextPage = await driver.wait(
        until.elementLocated(By.xpath(nextPageXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "nextPage", nextPageXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click next page pagination
    nextPage.click();

    // Wait page to load
    await driver.sleep(5000);

    try {
      // Find next page title
      var nextPageTitle = await driver.wait(
        until.elementLocated(By.css("h3")),
        30000
      );
    } catch (err) {
      errorLog(fileName, "nextPageTitle", "By.css('h3')", "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Assert next page title is displayed
    await nextPageTitle.isDisplayed();
  }
);
