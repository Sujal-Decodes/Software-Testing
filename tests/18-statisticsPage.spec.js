const { test, expect } = require('@playwright/test');

test('TC-18 - Wikipedia Statistics Page Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto(
        'https://en.wikipedia.org/wiki/Special:Statistics',
        { waitUntil: 'domcontentloaded' }
    );

    await expect(page.locator('#firstHeading')).toContainText('Statistics');

    console.log('PASS - Statistics page heading verified');

    await expect(page.locator('#mw-content-text')).toContainText('Content pages');

    console.log('PASS - "Content pages" statistic is listed');

    console.log('');
    console.log('========================================');
    console.log('  TC-18 STATISTICS PAGE SUMMARY');
    console.log('========================================');
    console.log('Wikipedia statistics page opened and verified');
    console.log('========================================');
});
