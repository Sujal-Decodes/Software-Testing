const { test, expect } = require('@playwright/test');

test('TC-30 - Wikipedia Random Article Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto(
        'https://en.wikipedia.org/wiki/Special:Random',
        { waitUntil: 'domcontentloaded' }
    );

    await expect(page).not.toHaveURL(/Special:Random/);

    console.log(`PASS - Redirected to a random article: ${page.url()}`);

    await expect(page.locator('#firstHeading')).toBeVisible();

    const heading = (await page.locator('#firstHeading').innerText()).trim();

    expect(heading.length).toBeGreaterThan(0);

    console.log(`PASS - Article heading is visible: ${heading}`);

    console.log('');
    console.log('========================================');
    console.log('  TC-30 RANDOM ARTICLE SUMMARY');
    console.log('========================================');
    console.log(`Random article opened: ${heading}`);
    console.log('========================================');
});
