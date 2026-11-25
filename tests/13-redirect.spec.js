const { test, expect } = require('@playwright/test');

test('TC-13 - Wikipedia Redirect Handling', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/AI', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#firstHeading'))
        .toContainText('Artificial intelligence');

    console.log(`INFO - Final URL: ${page.url()}`);
    console.log('PASS - "AI" redirected to Artificial intelligence');

    console.log('');
    console.log('========================================');
    console.log('  TC-13 REDIRECT SUMMARY');
    console.log('========================================');
    console.log('Short title redirected to the full article');
    console.log('========================================');
});
