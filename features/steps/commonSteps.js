const { When, Then, AfterAll } = require("cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const { usernameAlt, password } = require("../../data/testData");

const {
  toolTipXpath,
  trainerNameXpath,
  trainerAvatarXpath,
  courseMenuXpath,
  trainerPositionXpath,
  profileMenuXpath,
} = require("../../data/elementXpath");

const { login, logout, errorLog } = require("../../utilities/function");

const chrome = require("selenium-webdriver/chrome");

const screen = {
  width: 1920,
  height: 1200,
};
options = new chrome.Options().headless().windowSize(screen);
options.addArguments("disable-gpu");

// Create a new driver for Chrome
var driver = new Builder().forBrowser("chrome").build();

When("user successfully logins", async function () {
  await login(driver, usernameAlt, password);
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
      50000
    );
  } catch (err) {
    errorLog("commonSteps", "toolTip", toolTipXpath, "5s");
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

exports.driver = driver;

AfterAll(async function () {
  driver.close();
});
