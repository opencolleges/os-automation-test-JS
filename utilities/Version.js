const { Builder, By } = require("selenium-webdriver");
const {uatUrl} = require("../data/testData");

const versionCheck = async () => {
  // Driver initialise
  this.driver = new Builder().forBrowser("chrome").build();

  // Link to version page
  await this.driver.navigate().to(uatUrl+"/version");

  // Get the text of element
  const version = await this.driver
    .findElement(By.xpath("/html/body/pre"))
    .getText();

  // Output the version number
  console.log("Test is running on version" + " " + version);

  // Close the web driver
  this.driver.close();
};

versionCheck();
