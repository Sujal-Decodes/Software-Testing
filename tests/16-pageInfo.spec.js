const { test, expect } = require('@playwright/test');

test('TC-16 - Wikipedia Page Information Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto(
        'https://en.wikipedia.org/w/index.php?title=Software_testing&action=info',
        { waitUntil: 'domcontentloaded' }
    );

    await expect(page.locator('#firstHeading')).toContainText(/Information for/i);

    console.log('PASS - Page information heading verified');

    await expect(page.locator('table.wikitable').first()).toBeVisible();

    console.log('PASS - Page information table is visible');

    console.log('');
    console.log('========================================');
    console.log('  TC-16 PAGE INFORMATION SUMMARY');
    console.log('========================================');
    console.log('Page information page opened');
    console.log('========================================');
});
