const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const uatUrl = process.env["uatUrl"]
const courseCode = process.env["courseCode"]
const course = process.env["course"]

const {
  courseHomePageXpath,
  courseOverviewXpath,
  module1Xpath,
  firstTopicXpath,
  firstSubtopicXpath,
  additionalResourcesXpath,
  additionalResourcesTitleXpath,
  additionalResourcesSubTitleXpath,
  additionalResourcesLinksXpath,
  moduleHelperXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(60 * 1000);

const path = require("path");
//*[@id="message-pane"]/div/div[4]
// Get file name
const fileName = path.basename(__filename);

Then(
  /^click on course home page from megadrop menu and navigate to Home Page$/,
  async function () {

    try {
      // Find course homepage
      var courseHomePage = await driver.wait(
        until.elementLocated(By.xpath(courseHomePageXpath))
      );
    } catch (err) {
      errorLog(fileName, "courseHomePage", courseHomePageXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }
    // Click course homepage to show megadrop menu
    courseHomePage.click();

    // Get the current url
    const currentUrl = await driver.getCurrentUrl();

    // Assert the url is expected
    assert.equal(currentUrl, uatUrl + `/${courseCode}#/`);
  }
);

Then(
  /^click and navigate to course overview page and check the content loading right$/,
  async function () {
    try {
      // Find course overview
      var courseOverview = await driver.wait(
        until.elementLocated(By.xpath(courseOverviewXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "courseOverview", courseOverviewXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click course overview
    courseOverview.click();

    try {
      // Find course title
      var courseTitle = await driver
        .wait(until.elementLocated(By.css("h1"), 60000))
        .getText();
    } catch (err) {
      errorLog(fileName, "courseTitle", 'By.css("h1")', "6s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Assert the title is expected
    assert.strictEqual(courseTitle, course, "Title Not Equal");
  }
);

Then(
  /^can click on any module and it will show topic panel for that module and check the content$/,
  async function () {
    try {
      // Click Module 1 Facilitate programs and behaviours
      var module1 = await driver.wait(
        until.elementLocated(By.xpath(module1Xpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "module1", module1Xpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click module
    module1.click();

    try {
      // Click Topic1.1 Communicate effectively with students
      var firstTopic = await driver.wait(
        until.elementLocated(By.xpath(firstTopicXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "firstTopic", firstTopicXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click topic
    firstTopic.click();

    try {
      // Find Subtopic1.1 Communicate effectively with students
      var firstSubtopic = await driver.wait(
        until.elementLocated(By.xpath(firstSubtopicXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "firstSubTopic", firstSubtopicXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click subtopic
    firstSubtopic.click();

    // Assert content is successfully loaded
    for (let i = 1; i < 6; i++) {
      try {
        var content = await driver.wait(
          until.elementLocated(By.id(`p${i}`)),
          60000
        );
      } catch (err) {
        errorLog(fileName, "content", `By.id(p${i})`, "6s");
          driver.navigate().to(uatUrl+"/user/logout");
          throw Error(err.message);
      }
      assert(await content.isDisplayed());
    }
  }
);

Then(
  /^click on additional resources to check content loading right$/,
  async function () {
    try {
      //  Find additional resources
      var additionalResources = await driver.wait(
        until.elementLocated(By.xpath(additionalResourcesXpath)),
        30000
      );
        // Click additional resources
        additionalResources.click();
    } catch (err) {
      errorLog(fileName, "additionalResources", additionalResourcesXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    try {
      // Find title
      var additionalResourcesTitle = await driver.wait(
        until.elementLocated(By.xpath(additionalResourcesTitleXpath)),
        30000
      );
        // Assert title is successfully displayed
        assert(await additionalResourcesTitle.isDisplayed());

        // Assert title is expected
        assert.strictEqual(
            await additionalResourcesTitle.getText(),
            "Additional Resources"
        );
    } catch (err) {
      errorLog(
        fileName,
        "additionalResourcesTitle",
        additionalResourcesTitleXpath,
        "3s"
      );
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }



    try {
      var additionalResourcesSubTitle = await driver.wait(
        until.elementLocated(By.xpath(additionalResourcesSubTitleXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "additionalResourcesSubTitle",
        additionalResourcesSubTitle,
        "3s"
      );
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }


    try {
      // Find links
      var additionalResourcesLinks = await driver.wait(
        until.elementsLocated(By.xpath(additionalResourcesLinksXpath)),
        30000
      );
        // Assert every link is successfully displayed
        for (let i = 0; i < additionalResourcesLinks.length; i++) {
            assert(await additionalResourcesLinks[i].isDisplayed());
        }
    } catch (err) {
      errorLog(
        fileName,
        "additionalResourcesLinks",
        additionalResourcesLinksXpath,
        "3s"
      );
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }


  }
);

Then(
  /^open pages for additional resources and click on few documents link to test$/,
  async function () {
    try {
      // Find module helper
      var moduleHelper = await driver.wait(
        until.elementLocated(By.xpath(moduleHelperXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "moduleHelper", moduleHelperXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click module helper
    await moduleHelper.click();

    // Get current windows
    const windows = await driver.getAllWindowHandles();

    // Switch to new window
    await driver.switchTo().window(windows[1]);

    // Back to default window
    await driver.switchTo().window(windows[0]);
  }
);
