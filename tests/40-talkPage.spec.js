const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-40 - Wikipedia Talk Page Opening Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Talk:Software_testing`);

    await expect(page.locator('#firstHeading')).toContainText(/Talk:Software testing/i);
    console.log('PASS - Talk page heading verified');

    await expect(page).toHaveURL(/Talk:Software_testing/);
    console.log('PASS - Talk page URL verified');

    printSummary('TC-40 TALK PAGE SUMMARY', [
        'Talk page opened for the article'
    ]);
});
