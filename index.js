const { By, Builder, Capabilities } = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const assert = require("assert");

const chromeCapabilities = Capabilities.chrome();
// chromeCapabilities.set('chromeOptions', {args: ['--headless']});

const driver = new Builder()
  .forBrowser('chrome')
  .withCapabilities(chromeCapabilities)
  .build();

async function run() {
  await driver.get('https://crossbrowsertesting.github.io/selenium_example_page.html');
  await driver.sleep(3000);
  
  let title = await driver.getTitle();
  assert.ok(title.includes("Selenium"));

  await driver.manage().setTimeouts({ implicit: 5000 });

  let searchBox = await driver.findElement(By.name('text'));
  let checkbox = await driver.findElement(By.name('checkbox'));
  let searchButton = await driver.findElement(By.id('submitbtn'));

  await searchBox.sendKeys('Selenium');
  await checkbox.click();
  await driver.sleep(3000);

  await searchButton.click();
  await driver.sleep(3000);
  
  searchBox = await driver.findElement(By.id('form-results'));
  let value = await searchBox.getText();
  assert.ok(value.includes("Selenium"));

  await driver.sleep(1000);
  
  await driver.quit();
}

run();