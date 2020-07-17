const puppeteer = require('puppeteer');
require('dotenv').config();


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({
    width: 0,
    height: 0,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.facebook.com/');
  await page.type("input[type='email']", process.env.EMAIL, {delay: 200});
  await page.type("input[type='password']", process.env.PASS, {delay: 200});
  await page.click("#loginbutton");
  await page.waitForNavigation();
  const context = browser.defaultBrowserContext();
                              //        URL                  An array of permissions
    context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);
    await page.click('a[aria-label="More"] div[data-visualcompletion="ignore"]')
    await page.waitFor(2000);
    await page.goto('https://www.facebook.com/friends');
    await page.waitFor(1000);

    const friendsToAdd = await page.$$eval('div[aria-label="Add Friend"]', divs => divs.length);
    
   async function addFried() {
    for (let i = 0; i < friendsToAdd; i++) {
        await page.click('div[aria-label="Add Friend"]')[0]
        await page.waitFor(2000);

    }

    if(friendsToAdd) {
        addFried()
    }
   }
   addFried()
    await page.click('div[aria-label="Add Friend"]')[0]

    const assert = require('assert');
    describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
    });

  await browser.close();
})();


