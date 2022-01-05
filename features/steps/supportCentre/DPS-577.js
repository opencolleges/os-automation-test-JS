const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  supportMenuXpath,
  supportBreadcrumbXpath,
  supportCategoryItemXpath,
  supportCentreFAQXpath,
} = require("../../../data/elementXpath");

const { errorLog, elementTitleCheck } = require("../../../utilities/function");

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

setDefaultTimeout(120 * 1000);

Then(/^click on support menu from nav$/, async function () {
  try {
    var supportMenu = await driver.wait(
      until.elementLocated(By.xpath(supportMenuXpath)),
      30000
    );
  } catch {
    errorLog(fileName, "supportMenu", supportMenuXpath, "3s");
    driver.close();
    throw Error(err.message);
  }

  supportMenu.click();
});

Then(/^check support centre page title is expected$/, async function () {
  await driver.sleep(5000);

  await elementTitleCheck(driver, fileName, "Support Centre");
});

Then(
  /^click on all 8 support category and navigate to each page then click on support breadcrumbs to back to support centre page$/,
  async function () {
    for (let i = 1; i <= 7; i++) {
      await driver.sleep(5000);

      try {
        var supportCategoryItem = await driver.wait(
          until.elementLocated(
            By.xpath(supportCategoryItemXpath + `div[${i}]`)
          ),
          30000
        );
      } catch (err) {
        errorLog(
          fileName,
          "supportCategoryItem" + `div[${i}]`,
          supportCategoryItemXpath,
          "3s"
        );
        driver.close();
        throw Error(err.message);
      }

      supportCategoryItem.click();

      await driver.sleep(5000);

      try {
        var supportBreadcrumb = await driver.wait(
          until.elementLocated(By.xpath(supportBreadcrumbXpath)),
          30000
        );
      } catch (err) {
        errorLog(fileName, "supportBreadcrumb", supportBreadcrumbXpath, "3s");
        driver.close();
        throw Error(err.message);
      }

      supportBreadcrumb.click();
    }
  }
);

Then(/^expand collapse all FAQ on support category page$/, async function () {
  for (let i = 1; i <= 6; i++) {
    try {
      var FAQ = await driver.wait(
        until.elementLocated(By.xpath(supportCentreFAQXpath + `dd[${i}]`)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "FAQ", supportCentreFAQXpath + `dd[${i}]`, "3s");
      driver.close();
      throw Error(err.message);
    }

    FAQ.click();
  }
});

// Close the web driver after test
// After(function () {
//   driver.close();
// });
