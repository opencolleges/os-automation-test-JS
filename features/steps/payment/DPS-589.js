const { Then, After, setDefaultTimeout } = require("cucumber");
const { By, until } = require("selenium-webdriver");
const assert = require("assert");

const { driver } = require("../commonSteps");

const {
  myPaymentLinkXpath,
  phoneNumberSectionXpath,
  paymentHistoryXpath,
} = require("../../../data/elementXpath");

const { strictEqual } = require("assert");
const { errorLog } = require("../../../utilities/function");

setDefaultTimeout(120 * 1000);

const path = require("path");

// Get file name
const fileName = path.basename(__filename);

Then(/^click link My Payments$/, async function () {
  try {
    // Find My Payment
    const myPaymentLink = driver.wait(
      until.elementLocated(By.xpath(myPaymentLinkXpath)),
      30000
    );

    // Click My Payment
    myPaymentLink.click();
  } catch (err) {
    errorLog(fileName, "myPaymentLink", myPaymentLinkXpath, "3s");
    throw Error(err.message);
  }
});

Then(/^check My Payments page title$/, async function () {
  // Wait for page to fully loaded
  await driver.sleep(5000);

  try {
    // Find Title
    const title = await driver.wait(until.elementLocated(By.css("h1")), 30000);

    // Assert Title is expected
    strictEqual(await title.getText(), "My Payments", "Title is not correct");
  } catch (err) {
    errorLog(fileName, "title", "By.css('h1')", "3s");
    throw Error(err.message);
  }
});

Then(/^check Payment History section presents$/, async function () {
  try {
    // Find Payment History
    const paymentHistory = await driver.wait(
      until.elementLocated(By.xpath(paymentHistoryXpath)),
      30000
    );

    // Assert it displayed
    assert(await paymentHistory.isDisplayed());
  } catch (err) {
    errorLog(fileName, "paymentHistory", paymentHistoryXpath, "3s");
    throw Error(err.message);
  }
});

Then(/^check Phone Number section presents$/, async function () {
  try {
    // Find Phone Number
    const phoneNumberSection = await driver.wait(
      until.elementLocated(By.xpath(phoneNumberSectionXpath)),
      30000
    );

    // Assert it displayed
    assert(await phoneNumberSection.isDisplayed());
  } catch (err) {
    errorLog(fileName, "phoneNumberSection", phoneNumberSectionXpath, "3s");
    throw Error(err.message);
  }
});

// Close the web driver after test
// After(function () {
//   driver.close();
// });
