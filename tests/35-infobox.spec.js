const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-35 - Wikipedia Article Infobox Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Python_(programming_language)`);

    await expect(page.locator('#firstHeading')).toContainText('Python');
    console.log('PASS - Python article opened');

    const infobox = page.locator('table.infobox').first();
    await expect(infobox).toBeVisible();
    console.log('PASS - Infobox is visible');

    await expect(infobox).toContainText(/Paradigm|Designed by|Developer/i);
    console.log('PASS - Infobox contains expected fields');

    printSummary('TC-35 INFOBOX SUMMARY', [
        'Infobox found with expected fields on the Python article'
    ]);
});
