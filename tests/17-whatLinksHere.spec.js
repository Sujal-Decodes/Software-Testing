const { test, expect } = require('@playwright/test');

test('TC-17 - Wikipedia What Links Here Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto(
        'https://en.wikipedia.org/wiki/Special:WhatLinksHere/Software_testing',
        { waitUntil: 'domcontentloaded' }
    );

    await expect(page.locator('#firstHeading'))
        .toContainText(/What links here|Pages that link to/i);

    console.log('PASS - What links here heading verified');

    const items = await page.locator('#mw-whatlinkshere-list li').count();

    expect(items).toBeGreaterThan(0);

    console.log(`PASS - Linking pages listed: ${items}`);

    console.log('');
    console.log('========================================');
    console.log('  TC-17 WHAT LINKS HERE SUMMARY');
    console.log('========================================');
    console.log(`Pages linking to the article: ${items}`);
    console.log('========================================');
});
