const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-44 - Wikipedia URL Format Normalization Testing', async ({ page }) => {

    test.setTimeout(120000);

    const variants = [
        `${BASE}/wiki/software_testing`,
        `${BASE}/wiki/Software%20testing`
    ];

    for (const url of variants) {
        await gotoWithRetry(page, url);

        await expect(page.locator('#firstHeading')).toContainText('Software testing');

        await expect(page.locator('link[rel="canonical"]'))
            .toHaveAttribute('href', /\/wiki\/Software_testing$/);

        console.log(`PASS - URL resolves to Software testing: ${url}`);
    }

    printSummary('TC-44 URL NORMALIZATION SUMMARY', [
        'Lowercase and space-encoded URLs open the same article'
    ]);
});
