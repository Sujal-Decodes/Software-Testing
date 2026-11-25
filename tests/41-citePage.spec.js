
const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, printSummary } = require('../test-data/helpers');

test('TC-41 - Wikipedia Cite This Page Testing', async ({ page }) => {

    test.setTimeout(120000);

    // STEP 1: Open Software Testing article
    await gotoWithRetry(page, `${BASE}/wiki/Software_testing`);

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log('PASS - Software Testing article opened');

    // STEP 2: Open Cite This Page
    await gotoWithRetry(
        page,
        `${BASE}/w/index.php?title=Special:CiteThisPage&page=Software_testing`
    );

    // STEP 3: Verify citation page heading
    await expect(page.locator('#firstHeading'))
        .toContainText(/Cite|citation/i, { timeout: 15000 });

    console.log('PASS - Cite This Page heading verified');

    // STEP 4: Verify citation form
    const content = page.locator('#mw-content-text');

    await expect(content).toBeVisible();

    await expect(content).toContainText('Page');
    await expect(content).toContainText('Submit');

    console.log('PASS - Citation form is visible');

    // STEP 5: Verify citation page URL
    await expect(page).toHaveURL(/Special:CiteThisPage/i);

    console.log('PASS - Citation page URL verified');

    // FINAL SUMMARY
    printSummary('TC-41 CITE THIS PAGE TEST PASSED', {
        'Article': 'Software testing',
        'Citation page': 'Verified',
        'Citation form': 'Visible',
        'URL': 'Verified'
    });

});
