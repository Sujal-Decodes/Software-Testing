
const { test, expect } = require('@playwright/test');

test('TC-09 - Wikipedia Article Revision History Testing', async ({ page }) => {

    // Increase test timeout to 60 seconds
    test.setTimeout(60000);

    // STEP 1: Open Wikipedia article
    await page.goto(
        'https://en.wikipedia.org/wiki/Software_testing',
        { waitUntil: 'domcontentloaded', timeout: 60000 }
    );

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log('PASS - Software Testing article opened');

    // STEP 2: Open revision history
    await page.goto(
        'https://en.wikipedia.org/w/index.php?title=Software_testing&action=history',
        { waitUntil: 'domcontentloaded', timeout: 60000 }
    );

    await expect(page).toHaveURL(/action=history/);

    console.log('PASS - Revision history page opened');

    // STEP 3: Verify revision entries
    const revisionRows = page.locator('#pagehistory li');

    await expect(revisionRows.first()).toBeVisible();

    const revisionCount = await revisionRows.count();

    expect(revisionCount).toBeGreaterThan(0);

    console.log(`PASS - Revision entries found: ${revisionCount}`);

    // STEP 4: Verify revision timestamps
    const timestamps = page.locator(
        '#pagehistory .mw-changeslist-date'
    );

    await expect(timestamps.first()).toBeVisible();

    console.log('PASS - Revision timestamps are visible');

    // STEP 5: Verify history section
    await expect(page.locator('#pagehistory')).toBeVisible();

    console.log('PASS - Revision history content verified');

    // FINAL SUMMARY
    console.log('');
    console.log('======================================');
    console.log('TC-09 REVISION HISTORY TEST PASSED');
    console.log(`Total revision entries: ${revisionCount}`);
    console.log('======================================');

});
