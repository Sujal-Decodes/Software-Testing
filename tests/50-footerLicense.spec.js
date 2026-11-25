const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-50 - Wikipedia Footer License and Last Edited Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Software_testing`);

    await expect(page.locator('#footer-info-lastmod')).toContainText(/last edited/i);
    console.log('PASS - Last edited information is shown');

    await expect(page.locator('#footer-info-copyright'))
        .toContainText(/Creative Commons Attribution-ShareAlike/i);
    console.log('PASS - Creative Commons license text is shown');

    printSummary('TC-50 FOOTER LICENSE SUMMARY', [
        'Footer shows the license and the last edited information'
    ]);
});
