const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-36 - Wikipedia Article References Section Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Software_testing`);

    await expect(page.locator('#firstHeading')).toContainText('Software testing');
    console.log('PASS - Software Testing article opened');

    const references = page.locator('ol.references li');
    await expect(references.first()).toBeAttached();

    const count = await references.count();
    expect(count).toBeGreaterThan(5);

    console.log(`PASS - References found: ${count}`);

    printSummary('TC-36 REFERENCES SUMMARY', [
        'Reference list is present and populated'
    ]);
});
