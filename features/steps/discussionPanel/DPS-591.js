const { Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  previewImageXpath,
  removeImageXpath,
  imageCounterXpath,
  postButtonXpath,
  postImageXpath,
  imageIconXpath,
  discussionPanelXpath,
  postTextXpath,
} = require("../../../data/elementXpath");

const {
  randomString,
  discussionPanelImageUpload,
  errorLog,
} = require("../../../utilities/function");

setDefaultTimeout(120 * 1000);

const path = require("path");
const uatUrl = process.env["uatUrl"]

// Get file name
const fileName = path.basename(__filename);

Then(
  /^can preview added image and can remove image from preview panel before posting$/,
  async function () {

    // Upload image to discussion panel
    await discussionPanelImageUpload(driver, fileName);

    try {
      // Find preview image button
      const previewImage = await driver.wait(
        until.elementLocated(By.xpath(previewImageXpath)),
        30000
      );

      // Assert image is displayed
      assert(await previewImage.isDisplayed());
    } catch (err) {
      errorLog(fileName, "previewImageButton", previewImageXpath, "3s");
      driver.navigate().to(uatUrl+"/user/logout");
      throw Error(err.message);
    }

    try {
      // Find remove image button
      const removeImage = await driver.wait(
        until.elementLocated(By.xpath(removeImageXpath)),
        30000
      );

      // Click to remove image
      removeImage.click();
    } catch (err) {
      errorLog(fileName, "removeImageButton", removeImageXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }
  }
);

Then(
  /^can check the image counter before image upload, image icon and posted image can be opened or not after posting the image$/,
  async function () {
    // Upload image to discussion panel
    await discussionPanelImageUpload(driver, fileName);

    try {
      // Find image counter
      const imageCounter = await driver.wait(
        until.elementLocated(By.xpath(imageCounterXpath)),
        30000
      );

      // Assert image counter is displayed
      assert(await imageCounter.isDisplayed());
    } catch (err) {
      errorLog(fileName, "imageCounter", imageCounterXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
      throw Error(err.message);
    }

    try {
      // Find post button
      const postButton = await driver.wait(
        until.elementLocated(By.xpath(postButtonXpath)),
        30000
      );

      // Click to post image
      postButton.click();
    } catch (err) {
      errorLog(fileName, "postButton", postButtonXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    try {
      // Find post image
      var postImage = await driver.wait(
        until.elementLocated(By.xpath(postImageXpath)),
        30000
      );

      // Assert post image is displayed
      assert(await postImage.isDisplayed());
    } catch (err) {
      errorLog(fileName, "postImageButton", postImageXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    try {
      // Find image icon
      const imageIcon = await driver.wait(
        until.elementLocated(By.xpath(imageIconXpath)),
        30000
      );

      // Assert image icon is displayed
      assert(await imageIcon.isDisplayed());
    } catch (err) {
      errorLog(fileName, "imageIcon", imageIconXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Click post image
    postImage.click();
    
    try {
      // Try to find image if successfully opened
      const openImageButton = await driver.wait(
        until.elementLocated(By.xpath('//img[@class="mfp-img"]')),
        30000
      );

      // Assert image has opened
      assert(await openImageButton.isDisplayed());
    } catch (err) {
      errorLog(fileName, "openImageButton", '//img[@class="mfp-img"]', "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }
  }
);

Then(
  /^can post text into the discussion panel and check the posted text$/,
  async function () {
    try {
      // Find discussion panel
      var discussionPanel = await driver.wait(
        until.elementLocated(By.xpath(discussionPanelXpath)),
        30000
      );

      // Click discussion panel
      discussionPanel.click();
    } catch (err) {
      errorLog(fileName, "discussionPanel", discussionPanelXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    // Generate a random string
    const textToPost = randomString(10);

    // Input random string to discussion panel
    discussionPanel.sendKeys(textToPost);

    try {
      // Find post button
      const postButton = await driver.wait(
        until.elementLocated(By.xpath(postButtonXpath)),
        30000
      );

      // Click to post
      postButton.click();
    } catch (err) {
      errorLog(fileName, "postButton", postButtonXpath, "3s");
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }

    try {
      // Find post text
      const postText = await driver.wait(
        until.elementLocated(
          By.xpath(postTextXpath + `//p[contains(text(),${textToPost})] `)
        ),
        30000
      );

      // Assert post text is displayed
      assert(await postText.isDisplayed());
    } catch (err) {
      errorLog(
        fileName,
        "postText",
        `//p[contains(text(),${textToPost})] `,
        "3s"
      );
        driver.navigate().to(uatUrl+"/user/logout");
        throw Error(err.message);
    }
  }
);
