const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  supportMenuXpath,
  linkGettingStartedXpath,
  gettingStartedViewMoreXpath,
  gettingStartedCourseBreadScrumbXpath,
  gettingStartedCurrentBreadScrumbXpath,
  supportBreadcrumbXpath,
  gettingStartedButtonYesXpath,
  gettingStartedButtonNoXpath,
  supportCentreFirstFAQXpath,
  supportCentreSecondFAQXpath,
} = require("../../../data/elementXpath");

const { errorLog, elementTitleCheck } = require("../../../utilities/function");

const path = require("path");
const { strictEqual } = require("assert");

const actions = driver.actions({ bridge: true });

// Get file name
const fileName = path.basename(__filename);

setDefaultTimeout(120 * 1000);

Then(
  /^click on getting started support category from support page$/,
  async function () {
    try {
      var supportMenu = await driver.wait(
        until.elementLocated(By.xpath(supportMenuXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "supportMenu", supportMenuXpath, "3s");
      driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
      throw Error(err.message);
    }

    await actions
      .move({ duration: 5000, origin: supportMenu, x: 0, y: 0 })
      .perform();

    try {
      var linkGettingStarted = await driver.wait(
        until.elementLocated(By.xpath(linkGettingStartedXpath)),
        30000
      );
    } catch {
      errorLog(fileName, "linkGettingStarted", linkGettingStartedXpath, "3s");
      driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
      throw Error(err.message);
    }

    linkGettingStarted.click();
  }
);

Then(
  /^click on view more button to navigate to main FAQ page$/,
  async function () {
    await driver.sleep(5000);

    try {
      var viewMore = await driver.wait(
        until.elementLocated(By.xpath(gettingStartedViewMoreXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "viewMore", gettingStartedViewMoreXpath, "3s");
      driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
      throw Error(err.message);
    }

    viewMore.click();
  }
);

Then(/^check FAQ main page title is expected$/, async function () {
  await driver.sleep(5000);

  await elementTitleCheck(driver, fileName, "FAQs - Getting Started");
});

Then(/^check the breadscrumbs and heading display correct$/, async function () {
  try {
    var courseBreadscrumb = await driver
      .wait(
        until.elementLocated(By.xpath(gettingStartedCourseBreadScrumbXpath)),
        30000
      )
      .getText();
  } catch (err) {
    errorLog(
      fileName,
      "courseBreadscrumb",
      gettingStartedCourseBreadScrumbXpath,
      "3s"
    );
    driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
    throw Error(err.message);
  }
  strictEqual(
    courseBreadscrumb,
    "E1048B Certificate III Education Support - Supporting Education"
  );

  try {
    var previousPageBreadScrumb = await driver
      .wait(until.elementLocated(By.xpath(supportBreadcrumbXpath)), 30000)
      .getText();
  } catch (err) {
    errorLog(fileName, "previousPageBreadScrumb", supportBreadcrumbXpath, "3s");
    driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
    throw Error(err.message);
  }

  strictEqual(previousPageBreadScrumb, "Support Centre");

  try {
    var currentPageBreadScrumb = await driver
      .wait(
        until.elementLocated(By.xpath(gettingStartedCurrentBreadScrumbXpath)),
        30000
      )
      .getText();
  } catch (err) {
    errorLog(
      fileName,
      "currentPageBreadScrumb",
      gettingStartedCurrentBreadScrumbXpath,
      "3s"
    );
    driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
    throw Error(err.message);
  }

  strictEqual(currentPageBreadScrumb, "Getting Started");
});

Then(
  /^click the first FAQ and provide the feedback with YES$/,
  async function () {
    await driver.sleep(5000);
    try {
      var firstFAQ = await driver.wait(
        until.elementLocated(By.xpath(supportCentreFirstFAQXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "firstFAQ", supportCentreFirstFAQXpath, "3s");
      driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
      throw Error(err.message);
    }

    firstFAQ.click();

    await driver.sleep(5000);

    try {
      var buttonYes = await driver.wait(
        until.elementLocated(By.xpath(gettingStartedButtonYesXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "buttonYes", gettingStartedButtonYesXpath, "3s");
      driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
      throw Error(err.message);
    }

    buttonYes.click();
  }
);

Then(
  /^click the second FAQ and provide the feedback with NO$/,
  async function () {
    await driver.sleep(5000);
    try {
      var secondFAQ = await driver.wait(
        until.elementLocated(By.xpath(supportCentreSecondFAQXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "secondFAQ", supportCentreSecondFAQXpath, "3s");
      driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
      throw Error(err.message);
    }

    secondFAQ.click();

    await driver.sleep(5000);

    try {
      var buttonNo = await driver.wait(
        until.elementLocated(By.xpath(gettingStartedButtonNoXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "buttonNo", gettingStartedButtonNoXpath, "3s");
      driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
      throw Error(err.message);
    }

    buttonNo.click();
  }
);
