const { test, expect } = require('@playwright/test');

test('TC-12 - Wikipedia Non-Existent Page Handling', async ({ page }) => {

    test.setTimeout(60000);

    const response = await page.goto(
        'https://en.wikipedia.org/wiki/Playwright_Test_Page_Does_Not_Exist_98765',
        { waitUntil: 'domcontentloaded' }
    );

    console.log(`INFO - HTTP status: ${response.status()}`);

    expect(response.status()).toBe(404);

    console.log('PASS - Server returned HTTP 404');

    await expect(page.locator('#mw-content-text'))
        .toContainText(/does not have an article|no article|Search for/i);

    console.log('PASS - "No article" message is displayed');

    console.log('');
    console.log('========================================');
    console.log('  TC-12 NON-EXISTENT PAGE SUMMARY');
    console.log('========================================');
    console.log('Missing page returned 404 with a clear message');
    console.log('========================================');
});
