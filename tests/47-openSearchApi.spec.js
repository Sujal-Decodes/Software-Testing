const { test, expect } = require('@playwright/test');
const { BASE, gotoWithRetry, getWithRetry, printSummary } = require('../test-data/helpers');

test('TC-47 - Wikipedia OpenSearch Suggestions API Testing', async ({ request }) => {

    test.setTimeout(120000);

    const response = await getWithRetry(request,
        `${BASE}/w/api.php?action=opensearch&search=Software%20test&limit=5&format=json`);

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data[0]).toBe('Software test');
    console.log('PASS - Search term echoed correctly');

    expect(data[1].length).toBeGreaterThan(0);
    console.log(`PASS - Suggestions returned: ${data[1].length}`);

    for (const link of data[3]) {
        expect(link).toMatch(/^https:\/\/en\.wikipedia\.org\/wiki\//);
    }

    console.log('PASS - Suggestion URLs are valid Wikipedia links');

    printSummary('TC-47 OPENSEARCH API SUMMARY', [
        'OpenSearch API returned matching suggestions with article URLs'
    ]);
});
