const { test, expect } = require('@playwright/test');

test('TC-23 - Wikipedia Page Metadata Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Software_testing', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Software testing - Wikipedia/);

    console.log('PASS - Page title verified');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    console.log('PASS - Page language attribute is "en"');

    await expect(page.locator('link[rel="canonical"]'))
        .toHaveAttribute('href', /Software_testing/);

    console.log('PASS - Canonical link verified');

    console.log('');
    console.log('========================================');
    console.log('  TC-23 PAGE METADATA SUMMARY');
    console.log('========================================');
    console.log('Title, language and canonical link verified');
    console.log('========================================');
});
