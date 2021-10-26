const { Builder, By } = require("selenium-webdriver");

const versionCheck = async () => {
  // Driver initialise
  this.driver = new Builder().forBrowser("chrome").build();

  // Link to version page
  await this.driver.get("https://uat-os.opencolleges.edu.au/version");

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
