const { test, expect } = require('@playwright/test');

test('TC-19 - Wikipedia Login Page Form Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto(
        'https://en.wikipedia.org/w/index.php?title=Special:UserLogin',
        { waitUntil: 'domcontentloaded' }
    );

    await expect(page.locator('input[name="wpName"]').first()).toBeVisible();

    console.log('PASS - Username field is visible');

    await expect(page.locator('input[type="password"]').first()).toBeVisible();

    console.log('PASS - Password field is visible (nothing was entered or submitted)');

    console.log('');
    console.log('========================================');
    console.log('  TC-19 LOGIN FORM SUMMARY');
    console.log('========================================');
    console.log('Login form fields are present, no login attempted');
    console.log('========================================');
});
