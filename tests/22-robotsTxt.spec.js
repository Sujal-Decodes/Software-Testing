const { test, expect } = require('@playwright/test');

test('TC-22 - Wikipedia robots.txt Availability Testing', async ({ request }) => {

    const response = await request.get('https://en.wikipedia.org/robots.txt');

    console.log(`INFO - robots.txt status: ${response.status()}`);

    expect(response.status()).toBe(200);

    const text = await response.text();

    expect(text).toContain('User-agent');

    console.log('PASS - robots.txt is available and contains User-agent rules');

    console.log('');
    console.log('========================================');
    console.log('  TC-22 ROBOTS.TXT SUMMARY');
    console.log('========================================');
    console.log(`Characters in robots.txt: ${text.length}`);
    console.log('========================================');
});
