const { test, expect } = require('@playwright/test');

test('TC-26 - Wikipedia Keyboard Navigation Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Software_testing', { waitUntil: 'domcontentloaded' });

    await page.keyboard.press('Tab');

    const tag = await page.evaluate(
        () => document.activeElement ? document.activeElement.tagName : 'NONE'
    );

    console.log(`INFO - Focused element after Tab: ${tag}`);

    expect(tag).not.toBe('BODY');
    expect(tag).not.toBe('NONE');

    console.log('PASS - Tab key moved focus to an interactive element');

    console.log('');
    console.log('========================================');
    console.log('  TC-26 KEYBOARD NAVIGATION SUMMARY');
    console.log('========================================');
    console.log(`Focused element: ${tag}`);
    console.log('========================================');
});
