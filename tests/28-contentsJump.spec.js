const { test, expect } = require('@playwright/test');

test('TC-28 - Wikipedia Contents Section Jump Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Software_testing', { waitUntil: 'domcontentloaded' });

    const link = page.locator('a[href="#History"]:visible').first();

    await expect(link).toBeVisible();

    console.log('PASS - Contents link "History" is visible');

    await link.click();

    await expect(page).toHaveURL(/#History$/);

    console.log('PASS - Page jumped to the History section');

    console.log('');
    console.log('========================================');
    console.log('  TC-28 CONTENTS JUMP SUMMARY');
    console.log('========================================');
    console.log('Contents link moved the page to the History section');
    console.log('========================================');
});
