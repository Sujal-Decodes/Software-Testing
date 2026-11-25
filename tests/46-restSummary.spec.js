const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-46 - Wikipedia REST Page Summary API Testing', async ({ request }) => {

    test.setTimeout(120000);

    const response = await getWithRetry(request, `${BASE}/api/rest_v1/page/summary/Software_testing`);

    expect(response.status()).toBe(200);
    console.log('PASS - REST summary returned HTTP 200');

    const data = await response.json();

    expect(data.title).toBe('Software testing');
    expect(data.type).toBe('standard');
    expect(data.extract.length).toBeGreaterThan(50);
    expect(data.content_urls.desktop.page).toContain('Software_testing');

    console.log('PASS - Summary title, type, extract and URL verified');

    printSummary('TC-46 REST SUMMARY API SUMMARY', [
        'REST summary returned title, type and extract'
    ]);
});
