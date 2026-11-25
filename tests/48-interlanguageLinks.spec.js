const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-48 - Wikipedia Interlanguage Links Count Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Software_testing`);

    const languageLinks = page.locator('li.interlanguage-link');
    await expect(languageLinks.first()).toBeAttached();

    const count = await languageLinks.count();
    expect(count).toBeGreaterThanOrEqual(10);

    console.log(`PASS - Language versions available: ${count}`);

    printSummary('TC-48 INTERLANGUAGE LINKS SUMMARY', [
        'Article is available in many other languages'
    ]);
});
