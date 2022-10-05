const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const uatUrl = process.env["uatUrl"]

const {
  module2Xpath,
  firstTopicXpath,
  firstSubtopicXpath,
  footerXpath,
  generalCourseContentXpath,
} = require("../../../data/elementXpath");

const { titleCheck, errorLog } = require("../../../utilities/function");
const {
  subtopicNumberXpath,
  printTopicButtonXpath,
} = require("../../../data/elementXpath");

setDefaultTimeout(60 * 1000);

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

Then(/^check document title for OpenSpace 2.0$/, async function () {
  await titleCheck(driver, "DPS-640.js", title);
});

Then(
  /^check activity, reading and resource activities inside course content$/,
  async function () {
    try {
      // Find the second module
      var module2 = await driver.wait(
        until.elementLocated(By.xpath(module2Xpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "module2", module2Xpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Scroll down to module2
    await driver.executeScript("arguments[0].scrollIntoView()", module2);

    // Click to load topics
    module2.click();

    try {
      // Find the first topic
      var firstTopic = await driver.wait(
        until.elementLocated(By.xpath(firstTopicXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "firstTopic", firstTopicXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click it to load subtopics
    firstTopic.click();

    try {
      // Find subtopic
      var firstSubtopic = await driver.wait(
        until.elementLocated(By.xpath(firstSubtopicXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "firstSubtopic", firstSubtopicXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click to show element
    firstSubtopic.click();

    // Wait for page to load
    await driver.sleep(10000);

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

    // try {
    //   // Find all resource links
    //   var resourceLinks = await driver.wait(
    //     until.elementsLocated(
    //       By.className("activity-inline-download-resource pad-b10")
    //     ),
    //     30000
    //   );
    // } catch (err) {
    //   errorLog(
    //     fileName,
    //     "resourceLinks",
    //     'By.className("activity-inline-download-resource pad-b10")',
    //     "3s"
    //   );
    //   throw Error(err.message);
    // }

    //   // Assert each link displayed
    //   for (let i = 0; i < resourceLinks.length; i++) {
    //     const link = resourceLinks[i];
    //     driver.executeScript("arguments[0].scrollIntoView()", link);
    //     assert(await link.isDisplayed());
    //   }

    try {
      // Find all readings
      var readings = await driver.wait(
        until.elementsLocated(By.className("ats-dt-act-label")),
        100000
      );
    } catch (err) {
      errorLog(fileName, "readings", 'By.className("ats-dt-act-label"', "10s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Assert each reding tag is displayed
    // for (let i = 0; i < readings.length; i++) {
    //   const element = readings[i];
    //   driver.executeScript("arguments[0].scrollIntoView()", element);
    //   await driver.sleep(5000);
    //   assert(await element.isDisplayed());
    // }

    try {
      var generalCourseContent = await driver.wait(
        until.elementLocated(By.xpath(generalCourseContentXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "generalCourseContent",
        generalCourseContentXpath,
        "3s"
      );
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    assert(await generalCourseContent.isDisplayed());
  }
);

Then(
  /^correct subtopic number is present first on subtopic page and click print pdf$/,
  async function () {
    try {
      // Find subtopic number
      var subtopicNumber = await driver.wait(
        until.elementLocated(By.xpath(subtopicNumberXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "subtopicNumber", subtopicNumberXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Assert subtopic number displayed
    assert(await subtopicNumber.isDisplayed());

    try {
      // Find print topic button
      var printTopicButton = await driver.wait(
        until.elementLocated(By.xpath(printTopicButtonXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "printTopicButton", printTopicButtonXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click to print
    driver.executeScript("arguments[0].click()", printTopicButton);

    // Get current windows
    const windows = await driver.getAllWindowHandles();

    // Back to default window
    await driver.switchTo().window(windows[0]);
  }
);
