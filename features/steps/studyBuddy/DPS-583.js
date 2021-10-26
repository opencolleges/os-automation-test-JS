const { Then, After, setDefaultTimeout } = require("cucumber");
const { By, until } = require("selenium-webdriver");

const { driver } = require("../commonSteps");

const {
  supportCentreXpath,
  studyBuddyXpath,
  viewMoreQuestionsXpath,
} = require("../../../data/elementXpath");

const { strictEqual } = require("assert");
const { errorLog } = require("../../../utilities/function");

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

setDefaultTimeout(120 * 1000);

Then(/^click Support Centre$/, async function () {
  try {
    // Find Support Centre
    const supportCentre = await driver.wait(
      until.elementLocated(By.xpath(supportCentreXpath)),
      30000
    );

    // Click Support Centre
    supportCentre.click();
  } catch (err) {
    errorLog(fileName, "supportCentre", supportCentreXpath, "3s");
    throw Error(err.message);
  }
});

Then(/^click Study Buddy$/, async function () {
  try {
    // Find Study Buddy
    const studyBuddy = await driver.wait(
      until.elementLocated(By.xpath(studyBuddyXpath)),
      100000
    );

    // Click Study Buddy
    studyBuddy.click();
  } catch (err) {
    errorLog(fileName, "studyBuddy", studyBuddyXpath, "10s");
    throw Error(err.message);
  }
});

Then(/^check Support Centre title$/, async function () {
  try {
    // Wait to load page
    await driver.sleep(5000);

    // Find title
    const title = await driver.wait(until.elementLocated(By.css("h1")), 60000);

    // Assert title is expected
    strictEqual(await title.getText(), "Study Buddy", "Title is not correct");
  } catch (err) {
    errorLog(fileName, "title", "By.css('h1')", "6s");
    throw Error(err.message);
  }
});

Then(/^click arrow icon of each question to show details$/, async function () {
  try {
    const questionList = await driver.wait(
      until.elementLocated(By.css("dl")),
      30000
    );

    const questions = await questionList.findElements(By.css("dd"));
    for (let i = 0; i < questions.length; i++) {
      // Click each question
      questions[i].click();

      try {
        // Find the detail
        await driver.wait(
          until.elementLocated(By.xpath(`//*[@id="faq_study-buddy_${i + 1}"]`)),
          30000
        );
      } catch (err) {
        errorLog(
          fileName,
          "questionDetail",
          `//*[@id="faq_study-buddy_${i + 1}"]`,
          "3s"
        );
        throw Error(err.message);
      }
    }
  } catch (err) {
    errorLog(fileName, "questionList", "By.css('dl')", "3s");
    throw Error(err.message);
  }
});

Then(/^click View more button to show more questions$/, async function () {
  try {
    // Find View more button
    const viewMoreQuestionsButton = await driver.wait(
      until.elementLocated(By.xpath(viewMoreQuestionsXpath)),
      30000
    );

    // Click button
    viewMoreQuestionsButton.click();
  } catch (err) {
    errorLog(fileName, "viewMoreQuestionsButton", viewMoreQuestionsXpath, "3s");
  }

  // Wait page to load
  await driver.sleep(5000);
});

Then(/^check the title$/, async function () {
  try {
    // Find title
    const title = await driver.wait(until.elementLocated(By.css("h1")), 30000);

    // Assert title is expected
    strictEqual(
      await title.getText(),
      "FAQs - Study Buddy",
      "Title is not correct"
    );
  } catch (err) {
    errorLog(fileName, "title", "By.css('h1')", "3s");
    throw Error(err.message);
  }
});

// Close the web driver after test
// After(function () {
//   driver.close();
// });
