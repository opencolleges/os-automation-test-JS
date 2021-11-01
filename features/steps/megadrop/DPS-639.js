const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  module1Xpath,
  module2Xpath,
  moduleOverviewXpath,
  homeIconXpath,
  firstTopicXpath,
  topicOverviewXpath,
  teamUpBuddyXpath,
  secondAssessmentXpath,
  assessmentTitleXpath,
  assessmentTipsXpath,
  discussionsIconXpath,
  moduleTwoAssessmentXpath,
} = require("../../../data/elementXpath");

const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(60 * 1000);

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

Then(/^check the breadcrumb on module overview page$/, async function () {
  try {
    // Find Module 1 Facilitate Programs
    var module1 = await driver.wait(
      until.elementLocated(By.xpath(module1Xpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "module1", module1Xpath, "3s");
    throw Error(err.message);
  }

  // Click Module 1 Facilitate Programs
  module1.click();

  // Wait to load Module Overview
  await driver.sleep(5000);

  try {
    // Find Module Overview
    var moduleOverview = await driver.wait(
      until.elementLocated(By.xpath(moduleOverviewXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "moduleOverview", moduleOverviewXpath, "3s");
    throw Error(err.message);
  }

  // Click Module Overview
  moduleOverview.click();

  // Wait to load page
  await driver.sleep(5000);

  try {
    // Find home icon
    var homeIcon = driver.wait(
      until.elementLocated(By.xpath(homeIconXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "homeIcon", homeIconXpath, "3s");
    throw Error(err.message);
  }

  // Assert home icon is successfully diplayed
  assert(await homeIcon.isDisplayed());
});

Then(
  /^can click on any topic from the Topic panel and it will show sub topic panel for that Topic$/,
  async function () {
    try {
      // Find Module 2 Developing literacy and oral language skills
      var module2 = await driver.wait(
        until.elementLocated(By.xpath(module2Xpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "module2", module2Xpath, "3s");
      throw Error(err.message);
    }

    await driver.executeScript("arguments[0].scrollIntoView()", module2);

    // Click Module 2 Developing literacy and oral language skills
    module2.click();

    //  Wait to load topics
    await driver.sleep(5000);

    try {
      // Find Topic 2.1
      var firstTopic = await driver.wait(
        until.elementLocated(By.xpath(firstTopicXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "firstTopic", firstTopicXpath, "3s");
      throw Error(err.message);
    }

    // Click Topic 2.1
    firstTopic.click();

    // Wait to load subtopics
    await driver.sleep(5000);

    try {
      // Find Topic Overview
      var topicOverview = await driver.wait(
        until.elementLocated(By.xpath(topicOverviewXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "topicOverview", topicOverviewXpath, "3s");
      throw Error(err.message);
    }

    // Click Topic Overview
    topicOverview.click();
  }
);

Then(
  /^can click on quiz and check content is loading right$/,
  async function () {
    try {
      // Find Module 2 Developing literacy and oral language skills
      var module2 = await driver.wait(
        until.elementLocated(By.xpath(module2Xpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "module2", module2Xpath, "3s");
      throw Error(err.message);
    }

    await driver.executeScript("arguments[0].scrollIntoView()", module2);

    // Click the module
    module2.click();

    // Wait to load assessment
    await driver.sleep(5000);

    try {
      // Find the first assessment
      var firstAssessment = await driver.wait(
        until.elementLocated(By.xpath(moduleTwoAssessmentXpath))
      );
    } catch (err) {
      errorLog(fileName, "firstAssessment", moduleTwoAssessmentXpath, "3s");
      throw Error(err.message);
    }

    // Click it
    firstAssessment.click();

    // Wait to load the page
    await driver.sleep(5000);

    try {
      // Find team up buddy
      var teamUpBuddy = await driver.wait(
        until.elementLocated(By.xpath(teamUpBuddyXpath)),
        60000
      );
    } catch (err) {
      errorLog(fileName, "teamUpBuddy", teamUpBuddyXpath, "6s");
      throw Error(err.message);
    }

    // Assert it is displayed
    assert(await teamUpBuddy.isDisplayed());

    try {
      // Find discussion icon
      var discussionsIcon = await driver.wait(
        until.elementLocated(By.xpath(discussionsIconXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "discussionsIcon", discussionsIconXpath, "3s");
      throw Error(err.message);
    }

    // Assert it is displayed
    assert(await discussionsIcon.isDisplayed());
  }
);

Then(
  /^can click on assessment and check content is loading right$/,
  async function () {
    try {
      // Find Module 2 Developing literacy and oral language skills
      var module2 = await driver.wait(
        until.elementLocated(By.xpath(module2Xpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "module2", module2Xpath, "3s");
      throw Error(err.message);
    }

    await driver.executeScript("arguments[0].scrollIntoView()", module2);

    // Click it
    module2.click();

    // Wait to load assessments
    await driver.sleep(5000);

    try {
      // Find the second assessment
      var secondAssessment = await driver.wait(
        until.elementLocated(By.xpath(secondAssessmentXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "secondAssessment", secondAssessmentXpath, "3s");
      throw Error(err.message);
    }

    await driver.executeScript(
      "arguments[0].scrollIntoView()",
      secondAssessment
    );

    // Click it
    secondAssessment.click();

    // Wait page to load
    await driver.sleep(5000);

    try {
      // Find assessment title
      var assessmentTitle = await driver.wait(
        until.elementLocated(By.xpath(assessmentTitleXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "assessmentTitle", assessmentTitleXpath, "3s");
      throw Error(err.message);
    }

    try {
      // Find assessment tips
      var assessmentTips = await driver.wait(
        until.elementLocated(By.xpath(assessmentTipsXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "assessmentTips", assessmentTipsXpath, "3s");
    }

    // Asssert both displayed
    assert(
      (await assessmentTitle.isDisplayed()) &&
        (await assessmentTips.isDisplayed())
    );

    try {
      // Find team up buddy
      var teamUpBuddy = await driver.wait(
        until.elementLocated(By.xpath(teamUpBuddyXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "teamUpBuddy", teamUpBuddyXpath, "3s");
      throw Error(err.message);
    }

    // Assert team up buddy displayed
    assert(await teamUpBuddy.isDisplayed());

    try {
      // Find discussions icon
      var discussionsIcon = await driver.wait(
        until.elementLocated(By.xpath(discussionsIconXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "discussionsIcon", discussionsIconXpath, "3s");
      throw Error(err.message);
    }

    // Assert discussions icon displayed
    assert(await discussionsIcon.isDisplayed());

    try {
      // Find tab discussion
      var tabDiscussion = await driver.wait(
        until.elementLocated(By.xpath('//li[@id="tab-discussion"]')),
        30000
      );
    } catch (err) {
      errorLog(fileName, "tabDiscussion", '//li[@id="tab-discussion"]', "3s");
      throw Error(err.message);
    }

    try {
      // Find tab submit assessment
      var tabSubmitAssessment = await driver.wait(
        until.elementLocated(By.xpath('//li[@id="tab-submit-assessment"]')),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "tabSubmitAssessment",
        '//li[@id="tab-submit-assessment"]',
        "3s"
      );
      throw Error(err.message);
    }

    // Assert both displayed
    assert(
      (await tabDiscussion.isDisplayed()) &&
        (await tabSubmitAssessment.isDisplayed())
    );
  }
);

// After(async function () {
//   this.driver.close();
// });
