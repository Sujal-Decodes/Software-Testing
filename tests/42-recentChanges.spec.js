const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-42 - Wikipedia Recent Changes Page Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Special:RecentChanges`);

    await expect(page.locator('#firstHeading')).toContainText(/Recent changes/i);
    console.log('PASS - Recent changes heading verified');

    const entries = page.locator('a.mw-changeslist-title');
    await expect(entries.first()).toBeVisible({ timeout: 30000 });

    const count = await entries.count();
    expect(count).toBeGreaterThan(0);

    console.log(`PASS - Changed pages listed: ${count}`);

    printSummary('TC-42 RECENT CHANGES SUMMARY', [
        'Recent changes page lists edited pages'
    ]);
});
