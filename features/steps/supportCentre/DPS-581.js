const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  supportMenuXpath,
  supportCentreAssessmentBlockXpath,
  supportCentreAsssessmentSecondArticleBlogTileXpath,
  gettingStartedCurrentBreadScrumbXpath,
  supportCentreAssessmentViewMoreXpath,
  gettingStartedPreviousBreadScrumbXpath,
} = require("../../../data/elementXpath");

const { errorLog, elementTitleCheck } = require("../../../utilities/function");

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

setDefaultTimeout(120 * 1000);

Then(
  /^click on assessment support category from support menu$/,
  async function () {
    try {
      var supportMenu = await driver.wait(
        until.elementLocated(By.xpath(supportMenuXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "supportMenu", supportMenuXpath, "3s");
      driver.close();
      throw Error(err.message);
    }

    supportMenu.click();

    await driver.sleep(5000);

    try {
      var assessmentBlock = await driver.wait(
        until.elementLocated(By.xpath(supportCentreAssessmentBlockXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "assessmentBlock",
        supportCentreAssessmentBlockXpath,
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }

    // assessmentBlock.click();
    driver.executeScript("arguments[0].click()", assessmentBlock);
  }
);

Then(/^check assessment support page title is expected$/, async function () {
  await elementTitleCheck(driver, fileName, "Assessments");
});

Then(
  /^click on article blog tiles and then click breadcrumb to back to assessment page$/,
  async function () {
    try {
      var secondArticleBlogTile = await driver.wait(
        until.elementLocated(
          By.xpath(supportCentreAsssessmentSecondArticleBlogTileXpath)
        ),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "secondArticleBlogTile",
        supportCentreAsssessmentSecondArticleBlogTileXpath,
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }

    secondArticleBlogTile.click();

    try {
      var assessmentsPageBreadScrumb = await driver.wait(
        until.elementLocated(By.xpath(gettingStartedCurrentBreadScrumbXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "assessmentsPageBreadScrumb",
        gettingStartedCurrentBreadScrumbXpath,
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }

    assessmentsPageBreadScrumb.click();
  }
);

Then(
  /^click on view more button and then click breadcrumb to back to assessment page$/,
  async function () {
    try {
      var viewMore = await driver.wait(
        until.elementLocated(By.xpath(supportCentreAssessmentViewMoreXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "viewMore",
        supportCentreAssessmentViewMoreXpath,
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }

    viewMore.click();

    try {
      var assessmentsPageBreadScrumb = await driver.wait(
        until.elementLocated(By.xpath(gettingStartedCurrentBreadScrumbXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "assessmentsPageBreadScrumb",
        gettingStartedCurrentBreadScrumbXpath,
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }

    assessmentsPageBreadScrumb.click();
  }
);

Then(
  /^click on support breadcrumb to navigate to back to support centre page$/,
  async function () {
    try {
      var supportCentreBreadScrumb = await driver.wait(
        until.elementLocated(By.xpath(gettingStartedPreviousBreadScrumbXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "supportCentreBreadScrumb",
        gettingStartedPreviousBreadScrumbXpath,
        "3s"
      );
      driver.close();
      throw Error(err.message);
    }

    supportCentreBreadScrumb.click();
  }
);
