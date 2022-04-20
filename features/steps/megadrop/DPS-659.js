const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  module2Xpath,
  secondAssessmentXpath,
  downloadAssessmentXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(60 * 1000);

const path = require("path");
// Get file name
const fileName = path.basename(__filename);

Then(/^can click on Module 2$/, async function () {
  try {
    var module2 = await driver.wait(
      until.elementLocated(By.xpath(module2Xpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "module2", module2Xpath, "3s");
    driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
    throw Error(err.message);
  }

  module2.click();
});

Then(/^can click on Assessment Project$/, async function () {
  await driver.sleep(5000);

  try {
    var assessment = await driver.wait(
      until.elementLocated(By.xpath(secondAssessmentXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "assessment", secondAssessmentXpath, "3s");
    driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
    throw Error(err.message);
  }

  assessment.click();
});

Then(/^click Download Assessment$/, async function () {
  await driver.sleep(5000);

  try {
    var downloadAssessment = await driver.wait(
      until.elementLocated(By.xpath(downloadAssessmentXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "downloadAssessment", downloadAssessmentXpath, "3s");
    driver.navigate().to("https://uat-os.opencolleges.edu.au/user/logout");
    throw Error(err.message);
  }

  downloadAssessment.click();

  await driver.sleep(5000);
});
