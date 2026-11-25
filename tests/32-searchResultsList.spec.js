const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-32 - Wikipedia Full Text Search Results List Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/w/index.php?search=software+testing+tools&title=Special%3ASearch&fulltext=1&ns0=1`);

    await expect(page.locator('#firstHeading')).toContainText(/Search/i);
    console.log('PASS - Search results page opened');

    const results = page.locator('.mw-search-result-heading a');
    await expect(results.first()).toBeVisible({ timeout: 20000 });

    const count = await results.count();
    expect(count).toBeGreaterThanOrEqual(5);

    console.log(`PASS - Search results listed: ${count}`);

    printSummary('TC-32 SEARCH RESULTS LIST SUMMARY', [
        'Full text search listed multiple results'
    ]);
});
