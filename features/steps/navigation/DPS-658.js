const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  lastVisitedLinkXpath,
  openSpaceTourXPath,
  walkthroughMenuXpath,
  walkthroughModuleXpath,
  walkthroughAssessmentXpath,
  walkthroughAssessmentNextButtonXpath,
  walkthroughMessageNextButtonXpath,
  walkthroughJumpInXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

setDefaultTimeout(120 * 1000);

Then(/^click on last visited page link$/, async function () {
  try {
    var lastVisitedLink = await driver.wait(
      until.elementLocated(By.xpath(lastVisitedLinkXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "lastVisitedLink", lastVisitedLinkXpath, "3s");
    driver.close()
    throw Error(err.message);
  }

  lastVisitedLink.click();
});

Then(/^back to home page$/, async function () {
  await driver.navigate().back();
});

Then(/^click on OpenSpace Tour to test the Walkthrough$/, async function () {
  try {
    var openSpaceTour = await driver.wait(
      until.elementLocated(By.xpath(openSpaceTourXPath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "openSpaceTour", openSpaceTourXPath, "3s");
    driver.close()
    throw Error(err.message);
  }

  openSpaceTour.click();

  await driver.sleep(5000);

  try {
    var menu = await driver.wait(
      until.elementLocated(By.xpath(walkthroughMenuXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "menu", walkthroughMenuXpath, "3s");
    driver.close()
    throw Error(err.message);
  }

  menu.click();

  await driver.sleep(5000);

  try {
    var module = await driver.wait(
      until.elementLocated(By.xpath(walkthroughModuleXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "module", walkthroughModuleXpath, "3s");
    driver.close()
    throw Error(err.message);
  }

  module.click();

  await driver.sleep(5000);

  try {
    var assessment = await driver.wait(
      until.elementLocated(By.xpath(walkthroughAssessmentXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "assessment", walkthroughAssessmentXpath, "3s");
    driver.close()
    throw Error(err.message);
  }

  assessment.click();

  await driver.sleep(5000);

  try {
    var assessmentNextButton = await driver.wait(
      until.elementLocated(By.xpath(walkthroughAssessmentNextButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(
      fileName,
      "nextButton",
      walkthroughAssessmentNextButtonXpath,
      "3s"
    );
    driver.close()
    throw Error(err.message);
  }

  assessmentNextButton.click();

  await driver.sleep(5000);

  try {
    var messageNextButton = await driver.wait(
      until.elementLocated(By.xpath(walkthroughMessageNextButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(
      fileName,
      "messageNextButton",
      walkthroughMessageNextButtonXpath,
      "3s"
    );
    driver.close()
    throw Error(err.message);
  }

  messageNextButton.click();

  await driver.sleep(5000);

  try {
    var jumpInPopUp = await driver.wait(
      until.elementLocated(By.xpath(walkthroughJumpInXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "jumpInPopUp", walkthroughJumpInXpath, "3s");
    driver.close()
    throw Error(err.message);
  }

  jumpInPopUp.click();

  await driver.sleep(5000);
});

// Close the web driver after test
// After(function () {
//   driver.close();
// });
