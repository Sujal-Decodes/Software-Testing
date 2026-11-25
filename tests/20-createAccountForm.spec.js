const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, printSummary } = require('../test-data/helpers');

test('TC-20 - Wikipedia Create Account Page Form Testing', async ({ page }) => {

    test.setTimeout(120000);

    // Retry navigation: this page was failing when Wikipedia responded slowly
    await gotoWithRetry(page, `${BASE}/w/index.php?title=Special:CreateAccount`);

    await expect(page.locator('#firstHeading')).toContainText(/Create/i, { timeout: 30000 });

    console.log('PASS - Create account heading verified');

    await expect(page.locator('input[type="password"]').first())
        .toBeVisible({ timeout: 30000 });

    console.log('PASS - Sign-up form fields are visible (nothing was entered or submitted)');

    printSummary('TC-20 CREATE ACCOUNT FORM SUMMARY', [
        'Sign-up form fields are present, no account created'
    ]);
});
