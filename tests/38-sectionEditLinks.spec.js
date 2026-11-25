const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-38 - Wikipedia Section Edit Links Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Software_testing`);

    const editLinks = page.locator('.mw-editsection a');
    await expect(editLinks.first()).toBeAttached();

    const count = await editLinks.count();
    expect(count).toBeGreaterThan(0);
    console.log(`PASS - Section edit links found: ${count}`);

    const href = await editLinks.first().getAttribute('href');
    expect(href).toMatch(/action=edit|veaction=edit/);
    console.log('PASS - First edit link points to the edit action (nothing was edited)');

    printSummary('TC-38 SECTION EDIT LINKS SUMMARY', [
        'Section edit links are present and point to the edit action'
    ]);
});
