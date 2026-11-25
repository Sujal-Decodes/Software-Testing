const { test, expect } = require('@playwright/test');

test('TC-14 - Wikipedia Disambiguation Page Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Python', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#mw-content-text')).toContainText(/may refer to/i);

    console.log('PASS - "may refer to" text found');

    const linkCount = await page
        .locator('#mw-content-text .mw-parser-output li a')
        .count();

    expect(linkCount).toBeGreaterThan(10);

    console.log(`PASS - Disambiguation links found: ${linkCount}`);

    console.log('');
    console.log('========================================');
    console.log('  TC-14 DISAMBIGUATION SUMMARY');
    console.log('========================================');
    console.log(`Links listed: ${linkCount}`);
    console.log('========================================');
});
