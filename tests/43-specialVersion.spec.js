const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-43 - Wikipedia Software Version Page Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Special:Version`);

    await expect(page.locator('#firstHeading')).toContainText(/Version/i);
    console.log('PASS - Version page heading verified');

    await expect(page.locator('#mw-content-text')).toContainText(/MediaWiki/i);
    console.log('PASS - MediaWiki information is displayed');

    printSummary('TC-43 VERSION PAGE SUMMARY', [
        'Special:Version page shows MediaWiki information'
    ]);
});
