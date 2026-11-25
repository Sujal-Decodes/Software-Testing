const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-39 - Wikipedia Article Tabs Availability Testing', async ({ page }) => {

    test.setTimeout(120000);

    await gotoWithRetry(page, `${BASE}/wiki/Software_testing`);

    const tabs = [
        { id: '#ca-nstab-main', name: 'Article' },
        { id: '#ca-talk', name: 'Talk' },
        { id: '#ca-history', name: 'View history' }
    ];

    for (const tab of tabs) {
        await expect(page.locator(tab.id)).toBeVisible();
        console.log(`PASS - Tab visible: ${tab.name}`);
    }

    printSummary('TC-39 ARTICLE TABS SUMMARY', [
        'Article, Talk and History tabs are available'
    ]);
});
