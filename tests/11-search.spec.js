const { test, expect } = require('@playwright/test');

test('TC-11 - Wikipedia Search Results Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Main_Page', { waitUntil: 'domcontentloaded' });

    const searchBox = page.locator('input[name="search"]:visible').first();

    await expect(searchBox).toBeVisible();

    console.log('PASS - Search box is visible');

    await searchBox.fill('Software testing');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/Software_testing|search=Software/i);

    await expect(page.locator('#firstHeading'))
        .toContainText(/Software testing|Search results/i);

    console.log(`PASS - Search completed, opened: ${page.url()}`);

    console.log('');
    console.log('========================================');
    console.log('  TC-11 SEARCH TEST SUMMARY');
    console.log('========================================');
    console.log('Search box accepted text and returned a result page');
    console.log('========================================');
});
