const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-49 - Wikipedia Image File Page Navigation Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Python_(programming_language)`);

    const imageLink = page.locator('a.mw-file-description').first();
    await expect(imageLink).toBeAttached();

    const href = await imageLink.getAttribute('href');
    expect(href).toMatch(/\/wiki\/File:/);
    console.log('PASS - Image link points to a File page');

    await gotoWithRetry(page, new URL(href, BASE).toString());

    await expect(page.locator('#firstHeading')).toContainText(/File:/i);
    console.log('PASS - File page heading verified');

    printSummary('TC-49 IMAGE FILE PAGE SUMMARY', [
        'Article image links to its File page'
    ]);
});
