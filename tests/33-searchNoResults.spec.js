const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-33 - Wikipedia Search With No Matching Results Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/w/index.php?search=zxqvjkwpplmnbvc12345xyz&title=Special%3ASearch&fulltext=1`);

    await expect(page.locator('#mw-content-text'))
        .toContainText(/no results|did not match/i, { timeout: 20000 });
    console.log('PASS - No-results message is displayed');

    await expect(page.locator('.mw-search-result-heading')).toHaveCount(0);
    console.log('PASS - No result entries are listed');

    printSummary('TC-33 SEARCH NO RESULTS SUMMARY', [
        'Meaningless search term shows a no-results message'
    ]);
});
