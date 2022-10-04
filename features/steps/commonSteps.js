const { When, Then, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

require('dotenv').config()

const usernameAlt = process.env["usernameAlt"]
const password = process.env["password"]
const usernameAssessor = process.env["usernameAssessor"]
const expiredCourseUser = process.env["expiredCourseUser"]
const expiredCoursePass = process.env["expiredCoursePass"]
const uatUrl = process.env["uatUrl"]

const {
  toolTipXpath,
  trainerNameXpath,
  trainerAvatarXpath,
  courseMenuXpath,
  trainerPositionXpath,
  profileMenuXpath,
  supportMenuXpath,
  contactSupportXpath,
} = require("../../data/elementXpath");

const { login, logout, errorLog } = require("../../utilities/function");

const screen = {
  width: 1920,
  height: 1200,
};

const runMode = "headless";  //'headless' for circleci, 'web' to see it run on screen in your local
const useFirefox = false;

if (useFirefox) {
  const ffx = require("selenium-webdriver/firefox");
  options = new ffx.Options().windowSize(screen);
  options.addArguments("disable-gpu");

  if (runMode === "headless") {
    // Create a new driver for Chrome headless
    var driver = new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(new ffx.Options().headless().windowSize(screen))
        .build();
  } else if (runMode === "web") {
    // None headless
    var driver = new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(new ffx.Options().windowSize(screen))
        .build();
  }
}
else{
  const chrome = require("selenium-webdriver/chrome");
  options = new chrome.Options().windowSize(screen);
  options.addArguments("disable-gpu");

  if (runMode === "headless") {
    // Create a new driver for Chrome headless
    var driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().headless().windowSize(screen))
        .build();
  } else if (runMode === "web") {
    // None headless
    var driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().windowSize(screen))
        .build();
  }
}

When("user successfully logins", async function () {
  await login(driver, usernameAlt, password);
});

When(/^user successfully logins as an assessor$/, async function () {
  await login(driver, usernameAssessor, passwordAssessor);
});

When(/^user with an expired course logs in$/, async function () {
  await login(driver, expiredCourseUser, expiredCoursePass);
});

When(/^page is refreshed$/, async function () {
  driver.navigate().refresh();
});

Then(
  /^can open megadrop course Menu when click on Menu icon on Top navigation$/,
  async function () {
    // Wait for page to be fully loaded
    await driver.sleep(5000);

    // Find course menu
    const courseMenu = await driver.wait(
      until.elementLocated(By.xpath(courseMenuXpath)),
      30000
    );

    // Click course menu
    courseMenu.click();
  }
);

Then(/^check profile picture, trainer name and position$/, async function () {
  // Initialise actions
  const actions = driver.actions({ bridge: true });

  try {
    // Find tool tip
    var toolTip = await driver.wait(
      until.elementLocated(By.xpath(toolTipXpath)),
      100000
    );
  } catch (err) {
    errorLog("commonSteps", "toolTip", toolTipXpath, "10s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  // Move mouse to tool tip
  await actions.move({ duration: 5000, origin: toolTip, x: 0, y: 0 }).perform();

  try {
    // Find trainer's name
    var name = await driver.wait(
      until.elementLocated(By.xpath(trainerNameXpath)),
      30000
    );
  } catch (err) {
    errorLog("commonSteps", "name", trainerNameXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  try {
    // Find trainer's avatar
    var avatar = await driver.wait(
      until.elementLocated(By.xpath(trainerAvatarXpath)),
      30000
    );
  } catch (err) {
    errorLog("commonSteps", "avatar", trainerAvatarXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  try {
    // Find trainer's position
    var position = await driver.wait(
      until.elementLocated(By.xpath(trainerPositionXpath)),
      30000
    );
  } catch (err) {
    errorLog("commonSteps", "position", trainerPositionXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }
  // Assert all displayed
  assert(
    (await name.isDisplayed()) &&
      (await avatar.isDisplayed()) &&
      (await position.isDisplayed())
  );
});

Then("click and hover on the profile menu", async function () {
  // Wait page to load
  await driver.sleep(5000);

  // Initialise actions
  const actions = driver.actions({ bridge: true });

  try {
    // Find profile menu
    var profileMenu = await driver.wait(
      until.elementLocated(By.xpath(profileMenuXpath)),
      30000
    );
  } catch (err) {
    errorLog("commonSteps", "profileMenu", profileMenuXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  // Move mouse to the element to hover it
  await actions
    .move({ duration: 5000, origin: profileMenu, x: 0, y: 0 })
    .perform();
});

Then(/^logout the user$/, async function () {
  await logout(driver);
});

Then(/^logout the user as an assessor$/, async function () {
  try {
    // var logoutAsAssessor = await driver.wait(
    //   until.elementLocated(By.id("assessor-logout")),
    //   60000
    // );
    driver.navigate().to(uatUrl+"/user/logout");
      } catch (err) {
    errorLog("commonSteps", "logoutAsAssessor", "assessor-logout", "6s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  //logoutAsAssessor.click();
});

Then(/^click on support menu from nav$/, async function () {
  try {
    var supportMenu = await driver.wait(
      until.elementLocated(By.xpath(supportMenuXpath)),
      30000
    );
  } catch (err){
    errorLog("commonSteps", "supportMenu", supportMenuXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  supportMenu.click();
});

Then(/^ensure 'Contact Support' button exsists$/, async function () {
  try {
    var contactSupport = await driver.wait(
      until.elementLocated(By.xpath(contactSupportXpath)),
      30000
    );
  } catch(err) {
    errorLog("commonSteps", "contactSupport", contactSupportXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }
});

exports.driver = driver;

AfterAll(async function () {
  driver.close();
});
