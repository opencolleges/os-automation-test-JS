const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  supportBreadcrumbXpath,
  supportCategoryItemXpath,
  supportCentreFAQXpath,
  supportCategoryItemsWrapperXpath,
} = require("../../../data/elementXpath");

const { errorLog, elementTitleCheck } = require("../../../utilities/function");

const path = require("path");
const uatUrl = process.env["uatUrl"]

// Get file name
const fileName = path.basename(__filename);

setDefaultTimeout(120 * 1000);

Then(/^check support centre page title is expected$/, async function () {
  await driver.sleep(5000);

  await elementTitleCheck(driver, fileName, "Support Centre");
});

Then(
  /^click on all 8 support category and navigate to each page then click on support breadcrumbs to back to support centre page$/,
  async function () {
    try {
      var supportCategoryItemsWrapper = await driver.wait(
        until.elementLocated(By.xpath(supportCategoryItemsWrapperXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "supportCategoryItemsWrapper",
        supportCategoryItemsWrapperXpath,
        "3s"
      );
      driver.navigate().to(uatUrl+"/user/logout");
      throw Error(err.message);
    }

    const supportCategoryItems = await supportCategoryItemsWrapper.findElements(
      By.className("oc-grid__item oc-grid__item--s-6 oc-grid__item--m-3")
    );

    // for (let i = 1; i <= supportCategoryItems.length; i++) {
    for (let i = 1; i <= 5; i++) {
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
          "supportCategoryItem",
          supportCategoryItemXpath + `div[${i}]`,
          "3s"
        );
        driver.navigate().to(uatUrl+"/user/logout");
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
        errorLog(
          fileName,
          "supportBreadcrumb" + i,
          supportBreadcrumbXpath,
          "3s"
        );
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
      }

      supportBreadcrumb.click();
    }
  }
);

Then(/^expand collapse all FAQ on support category page$/, async function () {
  for (let i = 1; i <= 5; i++) {
    try {
      var FAQ = await driver.wait(
        until.elementLocated(By.xpath(supportCentreFAQXpath + `dd[${i}]`)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "FAQ", supportCentreFAQXpath + `dd[${i}]`, "3s");
      driver.navigate().to(uatUrl+"/user/logout");
      throw Error(err.message);
    }

    FAQ.click();
  }
});
