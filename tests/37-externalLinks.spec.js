const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-37 - Wikipedia External Links Format Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Software_testing`);

    const externalLinks = page.locator('#mw-content-text a.external');
    await expect(externalLinks.first()).toBeAttached();

    const total = await externalLinks.count();
    expect(total).toBeGreaterThan(0);
    console.log(`PASS - External links found: ${total}`);

    const checkCount = Math.min(total, 10);

    for (let i = 0; i < checkCount; i++) {
        const href = await externalLinks.nth(i).getAttribute('href');
        expect(href).toMatch(/^(https?:)?\/\//);
    }

    console.log(`PASS - ${checkCount} external link addresses verified`);

    printSummary('TC-37 EXTERNAL LINKS SUMMARY', [
        'External links have valid http(s) addresses'
    ]);
});
