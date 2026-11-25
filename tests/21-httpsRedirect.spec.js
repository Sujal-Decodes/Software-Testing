const { test, expect } = require('@playwright/test');

test('TC-21 - Wikipedia HTTP to HTTPS Redirect Testing', async ({ request }) => {

    const response = await request.get(
        'http://en.wikipedia.org/wiki/Software_testing',
        { maxRedirects: 0 }
    );

    console.log(`INFO - HTTP status: ${response.status()}`);

    expect([301, 302, 307, 308]).toContain(response.status());

    const location = response.headers()['location'];

    console.log(`INFO - Redirect location: ${location}`);

    expect(location).toMatch(/^https:\/\//);

    console.log('PASS - HTTP request is redirected to HTTPS');

    console.log('');
    console.log('========================================');
    console.log('  TC-21 HTTPS REDIRECT SUMMARY');
    console.log('========================================');
    console.log(`Status ${response.status()} redirected to HTTPS`);
    console.log('========================================');
});
