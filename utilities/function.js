const { By, until } = require("selenium-webdriver");
const assert = require("assert");
require('dotenv').config()

const { uatUrl } = require("../data/testData");

const {
  usernameInputXpath,
  passwordInputXpath,
  postButtonXpath,
  discussionPanelXpath,
  addImageXpath,
  iframeXpath,
  browseButtonXpath,
  jsDropFile,
  testFilepath,
  postTextXpath,
  otherLinksXpath,
  pofanityElementXpath,
  profileMenuXpath,
} = require("../data/elementXpath");

const util = require("util");
const fs = require("fs");
const { strictEqual } = require("assert");
const writeFile = util.promisify(fs.appendFile);

// Function to create random string
function randomString(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function isCourseExpired(driver) {
  await driver
    .wait(until.elementLocated(By.css("h1")), 30000)
    .getText()
    .then(
      (title) => {
        if (title === "Course Extension Form") {
          throw Error("Course is expired");
        }
      },
      (notFound) => {}
    );
}

function errorLog(fileName, elementName, Xpath, time, errorMessage) {
  writeFile(
    "./errors.text",
    "File: " +
      fileName +
      "\n" +
      "Name: " +
      elementName +
      "\n" +
      "Xpath: " +
      Xpath +
      "\n" +
      "Waiting time: " +
      time +
      "\n" +
      "Error message: " +
      errorMessage +
      "\n\n"
  );
}

exports.login = async function (driver, username, password) {
  //Seems like on occasion in circleCI that the driver gets in a weird state.
  //Give it some time to get itself together and then try
  await driver.sleep(5000);

  //call logout first, page will redirect to login afterward
  await driver.navigate().to(uatUrl+"/user/logout");
  // Open the page for login
  //await driver.get(uatUrl);

  // Input username and password
  const usernameInput = await driver.wait(
    until.elementLocated(By.xpath(usernameInputXpath)),
    60000
  );

  usernameInput.sendKeys(username);

  const passwordInput = await driver.wait(
    until.elementLocated(By.xpath(passwordInputXpath)),
    60000
  );

  passwordInput.sendKeys(password);

  // Find login button
  const loginbtn = await driver.wait(
    until.elementLocated(By.xpath("// button[ @ type = 'submit']")),
    30000
  );

  // Click button to login
  loginbtn.click();

  // Wait for page loading
  await driver.sleep(1000);

  // Check whether course is expired
  await isCourseExpired(driver);
};

exports.elementTitleCheck = async function (driver, fileName, expectedTitle) {
  try {
    var title = await driver
      .wait(until.elementLocated(By.css("h1")), 30000)
      .getText();
  } catch (err) {
    errorLog(fileName, "title", 'By.css("h1")', "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }
  strictEqual(title, expectedTitle);
};

exports.logout = async function (driver) {
  const actions = driver.actions({ bridge: true });

  try {
    // Find profile menu
    const profileMenu = await driver.wait(
      until.elementLocated(By.xpath(profileMenuXpath)),
      30000
    );

    // Move mouse to the element to hover it
    await actions
      .move({ duration: 5000, origin: profileMenu, x: 0, y: 0 })
      .perform();
  } catch (err) {
    errorLog("function", "profileMenu", profileMenuXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  try {
    // Find other links (My Profile, My Grades, My Payment, What's New, Log Out)
    const otherLinks = await driver.wait(
      until.elementsLocated(By.xpath(otherLinksXpath)),
      30000
    );

    // Click Log Out
    otherLinks[otherLinks.length - 1].click();

    // Confirm that browser redirected and title loaded
    await driver.wait(until.elementLocated(By.css("h3")));
  } catch (err) {
    errorLog("null", "otherLinks", otherLinksXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }
};

exports.supportMenuHovering = async function (driver, fileName) {
  // Initialise actions
  const actions = driver.actions({ bridge: true });

  try {
    // Find support menu
    const supportMenu = await driver.wait(
      until.elementLocated(By.className("mgn-b5")),
      30000
    );

    // Move mouse to the element to hover it
    await actions
      .move({ duration: 5000, origin: supportMenu, x: 0, y: 0 })
      .perform();
  } catch (err) {
    errorLog(fileName, "supportMenu", "By.className('mgn-b5')", "3s");
  }
};

exports.discussionPanelImageUpload = async function (driver, fileName) {
  // Wait for page to fully loaded
  //await driver.sleep(8000);

  try {
    // Find discussion text
    const discussionPanel = await driver.wait(
      until.elementLocated(By.xpath(discussionPanelXpath), 30000)
    );
    // Click discussion text
    discussionPanel.click();
  } catch (err) {
    errorLog(fileName, "discussionPanel", discussionPanelXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  try {
    // Find add image button
    const addImage = await driver.wait(
      until.elementLocated(By.xpath(addImageXpath)),
      30000
    );

    // Click to add image
    addImage.click();
  } catch (err) {
    errorLog(fileName, "addImageButton", addImageXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  // Find the path of test file
  const filePath = process.cwd() + testFilepath;

  try {
    // Find iframe
    const iframe = await driver.wait(
      until.elementLocated(By.xpath(iframeXpath)),
      100000
    );

    // Switch to iframe
    driver.switchTo().frame(iframe);
  } catch (err) {
    errorLog(fileName, "iframe", iframeXpath, "10s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  await driver.sleep(5000);

  try {
    // Find browse button
    var browseButton = await driver.wait(
      until.elementLocated(By.xpath(browseButtonXpath)),
      100000
    );

    await driver.sleep(5000);
  } catch (err) {
    errorLog(fileName, "browseButton", browseButtonXpath, "10s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  try {
    // Try to upload file
    const uploadFile = await driver.executeScript(jsDropFile, browseButton);

    // Declare which file to upload
    uploadFile.sendKeys(filePath);
  } catch (err) {
    errorLog(fileName, "uploadFile", "", "");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  // Wait file to be fully uploaded
  await driver.sleep(10000);

  // Back to web page
  driver.switchTo().defaultContent();
};

exports.publishPostToDiscussionPanel = async function (driver, fileName) {
  try {
    // Generate random string
    var name = randomString(45);

    // Text to post
    const textToPost = name + " " + uatUrl;

    // Find discussion panel
    const discussionPanel = await driver.wait(
      until.elementLocated(By.xpath(discussionPanelXpath)),
      60000
    );

    // Click dicsussion panel
    discussionPanel.click();

    // Input text to discussion panel
    discussionPanel.sendKeys(textToPost);
  } catch (err) {
    errorLog(fileName, "discussionPanel", discussionPanelXpath, "6s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  try {
    // Find post button
    const postButton = await driver.wait(
      until.elementLocated(By.xpath(postButtonXpath)),
      60000
    );

    // Click post button
    postButton.click();
  } catch (err) {
    errorLog(fileName, "postButton", postButtonXpath, "6s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }

  try {
    // Find post text
    const postText = await driver.wait(
      until.elementLocated(
        By.xpath(postTextXpath + `//p[contains(text(),${name})] `)
      ),
      60000
    );

    // Click post text to focus
    postText.click();

    // Assert post text is successfully displayed
    assert(await postText.isDisplayed());
  } catch (err) {
    errorLog(fileName, "postText", `//p[contains(text(),${name})] `, "6s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }
};

// Check web page title is expected (not element title..eg <h1>)
exports.titleCheck = async function (driver, fileName, targetTitle) {
  try {
    const title = await driver.getTitle();
    assert.strictEqual(title, targetTitle, "Title Not Equal");
  } catch (error) {
    errorLog(fileName, "title", "By.css('title')", "3s");
  }
};

exports.pofanityCheck = async function (driver, fileName) {
  try {
    // Find pofanity element
    const pofanityElement = await driver.wait(
      until.elementLocated(By.xpath(pofanityElementXpath)),
      30000
    );

    // Assert profanity element successfully displayed
    assert(await pofanityElement.isDisplayed());
  } catch (err) {
    errorLog(fileName, "pofanityElement", pofanityElementXpath, "3s");
    driver.navigate().to(uatUrl+"/user/logout");
    throw Error(err.message);
  }
};

exports.randomString = randomString;
exports.errorLog = errorLog;
