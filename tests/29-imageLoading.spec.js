const { test, expect } = require('@playwright/test');

test('TC-29 - Wikipedia Image Loading Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Eiffel_Tower', { waitUntil: 'domcontentloaded' });

    const image = page.locator('#mw-content-text img').first();

    await expect(image).toBeVisible();

    await expect.poll(() => image.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);

    console.log('PASS - First article image loaded successfully');

    console.log('');
    console.log('========================================');
    console.log('  TC-29 IMAGE LOADING SUMMARY');
    console.log('========================================');
    console.log('Article image loaded with a valid width');
    console.log('========================================');
});
