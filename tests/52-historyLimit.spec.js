const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-52 - Wikipedia Revision History Limit Parameter Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/w/index.php?title=Software_testing&action=history&limit=20`);

    await expect(page).toHaveURL(/limit=20/);
    console.log('PASS - History page opened with limit=20');

    const rows = page.locator('#pagehistory li[data-mw-revid]');
    await expect(rows.first()).toBeVisible({ timeout: 30000 });

    await expect(rows).toHaveCount(20);
    console.log('PASS - Exactly 20 revision entries are listed');

    printSummary('TC-52 HISTORY LIMIT SUMMARY', [
        'History page respected the limit of 20 entries'
    ]);
});
