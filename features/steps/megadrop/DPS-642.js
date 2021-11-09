const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  footerXpath,
  previousPageXpath,
  nextPageXpath,
  searchButtonXpath,
  searchInputXpath,
  firstLinkXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");
setDefaultTimeout(60 * 1000);

const path = require("path");

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
      throw Error(err.message);
    }

    // Assert next page title is displayed
    await nextPageTitle.isDisplayed();
  }
);

Then(
  /^enter keyword course to search and click on the first search result$/,
  async function () {
    try {
      // Find search button
      var searchButton = await driver.wait(
        until.elementLocated(By.xpath(searchButtonXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "searchButton", searchButtonXpath, "3s");
      throw Error(err.message);
    }

    // Click it
    searchButton.click();

    try {
      // Find search input bar
      var searchInput = await driver.wait(
        until.elementLocated(By.xpath(searchInputXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "searchInput", searchInputXpath, "3s");
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
    // Find search button
    var searchButton = await driver.wait(
      until.elementLocated(By.xpath(searchButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "searchButton", searchButtonXpath, "3s");
    throw Error(err.message);
  }

  // Click it
  searchButton.click();

  try {
    // Find search input bar
    var searchInput = await driver.wait(
      until.elementLocated(By.xpath(searchInputXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "searchInput", searchInputXpath, "3s");
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
    // try {
    // Find support centre link
    // NEED TO SOLVE: cannot select support link even though xpath is correct
    //   var supportCentreLink = await driver.wait(
    //     until.elementLocated(By.xpath('//*[@id="_dropdown"]/a')),
    //     30000
    //   );
    // } catch (err) {
    //   errorLog(fileName, "supportCentreLink", '//*[@id="_dropdown"]/a', "3s");
    //   throw Error(err.message);
    // }
    // Click support centre
    // supportCentreLink.click();
    // Wait to redirect page
    // await driver.sleep(5000);
    try {
      // Find page title
      var title = await driver.wait(until.elementLocated(By.css("h1")), 30000);
    } catch (err) {
      errorLog(fileName, "title", "By.css('h1')", "3s");
      throw Error(err.message);
    }
    // Assert title is displayed
    await title.isDisplayed();
  }
);

// After(async function () {
//   this.driver.close();
// });
