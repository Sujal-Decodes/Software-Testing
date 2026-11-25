const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-51 - Wikipedia HTTP Response Headers Testing', async ({ request }) => {

    test.setTimeout(120000);

    const response = await getWithRetry(request, `${BASE}/wiki/Main_Page`);

    expect(response.status()).toBe(200);
    console.log('PASS - Main Page returned HTTP 200');

    const headers = response.headers();

    expect(headers['content-type']).toContain('text/html');
    console.log('PASS - Content type is HTML');

    expect(headers['strict-transport-security']).toContain('max-age');
    console.log('PASS - HSTS header is present');

    expect(headers['cache-control']).toBeDefined();
    console.log('PASS - Cache-Control header is present');

    printSummary('TC-51 RESPONSE HEADERS SUMMARY', [
        'HTML content type and HSTS header verified'
    ]);
});
