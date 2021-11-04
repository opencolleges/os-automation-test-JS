const { Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  myProfileXpath,
  studentNameXpath,
  studentNumberXpath,
  changePasswordButtonXpath,
  gradingPreferenceXpath,
  privacySettingXpath,
  studyBuddySettingsXpath,
  studyBuddySettingsEditButtonXpath,
  studyBuddySettingsCancelButtonXpath,
  gradingPreferenceEditButtonXpath,
  gradingPreferenceSaveButtonXpath,
} = require("../../../data/elementXpath");

setDefaultTimeout(60 * 1000);

const path = require("path");
const { errorLog } = require("../../../utilities/function");
const { strictEqual } = require("assert");

// Get file name
const fileName = path.basename(__filename);

Then(/^click My Profile$/, async function () {
  try {
    var myProfile = await driver.wait(
      until.elementLocated(By.xpath(myProfileXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "myProfile", myProfileXpath, "3s");
    throw Error(err.message);
  }

  myProfile.click();
});

Then(/^check My Profile page title$/, async function () {
  // Wait for page load
  await driver.sleep(5000);

  try {
    //  Find page title
    var pageTitle = await driver
      .wait(until.elementLocated(By.css("h1")), 60000)
      .getText();
  } catch (err) {
    errorLog(fileName, "pageTitle", "By.css('h1')", "6s");
    throw Error(err.message);
  }

  // Assert the title is expected
  strictEqual(pageTitle, "My Profile", "Title is not correct");
});

Then(
  /^check Student Name and Student Number fields are present$/,
  async function () {
    try {
      var studentName = await driver.wait(
        until.elementLocated(By.xpath(studentNameXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "studentName", studentNameXpath, "3s");
      throw Error(err.message);
    }

    try {
      var studentNumber = await driver.wait(
        until.elementLocated(By.xpath(studentNumberXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "studentNumber", studentNumberXpath, "3s");
      throw Error(err.message);
    }

    assert(
      (await studentName.isDisplayed()) && (await studentNumber.isDisplayed())
    );
  }
);

Then(
  /^check Change Password link correctly redirects to the update_password page$/,
  async function () {
    try {
      var changePasswordButton = await driver.wait(
        until.elementLocated(By.xpath(changePasswordButtonXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "changePasswordButton",
        changePasswordButtonXpath,
        "3s"
      );
      throw Error(err.message);
    }

    changePasswordButton.click();

    await driver.sleep(5000);

    // Get the current url
    const currentUrl = await driver.getCurrentUrl();

    // Assert the url is expected
    assert.equal(
      currentUrl,
      "https://os-forms-staging.opencolleges.edu.au" + "/update-password"
    );

    // Back to previous page
    driver.executeScript("window.history.go(-1)");
  }
);

Then(
  /^check Grading Preference section can be edited and saved$/,
  async function () {
    try {
      var gradingPreference = await driver.wait(
        until.elementLocated(By.xpath(gradingPreferenceXpath)),
        30000
      );
    } catch (err) {
      errorLog(fileName, "gradingPreference", gradingPreferenceXpath, "3s");
      throw Error(err.message);
    }

    assert(await gradingPreference.isDisplayed());

    try {
      var gradingPreferenceEditButton = await driver.wait(
        until.elementLocated(By.xpath(gradingPreferenceEditButtonXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "gradingPreferenceEditButton",
        gradingPreferenceEditButtonXpath,
        "3s"
      );
      throw Error(err.message);
    }

    gradingPreferenceEditButton.click();

    try {
      var gradingPreferenceSaveButton = await driver.wait(
        until.elementLocated(By.xpath(gradingPreferenceSaveButtonXpath)),
        30000
      );
    } catch (err) {
      errorLog(
        fileName,
        "gradingPreferenceSaveButton",
        gradingPreferenceSaveButtonXpath,
        "3s"
      );
      throw Error(err.message);
    }

    gradingPreferenceSaveButton.click();
  }
);

Then(/^check Privacy Setting section is present$/, async function () {
  try {
    var privacySetting = await driver.wait(
      until.elementLocated(By.xpath(privacySettingXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "privacySetting", privacySettingXpath, "3s");
    throw Error(err.message);
  }

  assert(await privacySetting.isDisplayed());
});

Then(/^check Study Buddy settings can be edited and saved$/, async function () {
  try {
    var studyBuddySettings = await driver.wait(
      until.elementLocated(By.xpath(studyBuddySettingsXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "studyBuddySettings", studyBuddySettingsXpath, "3s");
    throw Error(err.message);
  }

  assert(await studyBuddySettings.isDisplayed());

  try {
    var studyBuddySettingsEditButton = await driver.wait(
      until.elementLocated(By.xpath(studyBuddySettingsEditButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(fileName, "editButton", studyBuddySettingsEditButtonXpath, "3s");
    throw Error(err.message);
  }

  studyBuddySettingsEditButton.click();

  try {
    var studyBuddySettingsCancelButton = await driver.wait(
      until.elementLocated(By.xpath(studyBuddySettingsCancelButtonXpath)),
      30000
    );
  } catch (err) {
    errorLog(
      fileName,
      "studyBuddySettingsCancelButton",
      studyBuddySettingsCancelButtonXpath,
      "3s"
    );
    throw Error(err.message);
  }

  studyBuddySettingsCancelButton.click();
});

// After(async function () {
//   driver.close();
// });
