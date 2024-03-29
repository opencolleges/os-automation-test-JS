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
const uatUrl = process.env["uatUrl"]

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
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    supportMenu.click();
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
        driver.navigate().to(uatUrl+"/user/logout");
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
        driver.navigate().to(uatUrl+"/user/logout");
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
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    assessmentsPageBreadScrumb.click();
  }
);
