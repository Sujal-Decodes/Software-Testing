const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-31 - Wikipedia Search Autocomplete Suggestions Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Main_Page`);

    const searchBox = page.locator('input[name="search"]:visible').first();
    await expect(searchBox).toBeVisible();
    console.log('PASS - Search box is visible');

    await searchBox.click();
    await searchBox.pressSequentially('Software test', { delay: 80 });

    const suggestions = page.locator('.cdx-menu-item, .suggestions-result');
    await expect(suggestions.first()).toBeVisible({ timeout: 20000 });

    const count = await suggestions.count();
    expect(count).toBeGreaterThan(0);

    console.log(`PASS - Suggestions displayed: ${count}`);

    printSummary('TC-31 SEARCH SUGGESTIONS SUMMARY', [
        'Typing in the search box shows suggestion list'
    ]);
});
