const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  module1Xpath,
  secondAssessmentXpath,
  downloadAssessmentXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(60 * 1000);

const path = require("path");
// Get file name
const fileName = path.basename(__filename);

Then(
  /^can click on Module 1 Meeting the needs of older people$/,
  async function () {
    try {
      var module1 = await driver.wait(
        until.elementLocated(By.xpath(module1Xpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "module1", module1Xpath, "3s");
      driver.close()
      throw Error(err.message);
    }

    module1.click();
  }
);

Then(/^can click on Assessment Knowledge Test$/, async function () {
  await driver.sleep(5000);

  try {
    var assessment = await driver.wait(
      until.elementLocated(By.xpath(secondAssessmentXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "assessment", secondAssessmentXpath, "3s");
    driver.close()
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
    driver.close()
    throw Error(err.message);
  }

  downloadAssessment.click();

  await driver.sleep(5000);
});

// After(async function () {
//   this.driver.close();
// });
