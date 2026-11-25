const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-34 - Wikipedia Empty Search Input Handling Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/w/index.php?search=&title=Special%3ASearch&fulltext=1`);

    await expect(page.locator('#firstHeading')).toContainText(/Search/i);
    console.log('PASS - Search page opened with empty query');

    await expect(page.locator('input[name="search"]:visible').first()).toBeVisible();
    console.log('PASS - Search input is still available');

    await expect(page.locator('.mw-search-result-heading')).toHaveCount(0);
    console.log('PASS - No results are shown for an empty query');

    printSummary('TC-34 EMPTY SEARCH SUMMARY', [
        'Empty search stays on the search page without results'
    ]);
});
