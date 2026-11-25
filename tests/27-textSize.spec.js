const { test, expect } = require('@playwright/test');

test('TC-27 - Wikipedia Text Size Setting Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Software_testing', { waitUntil: 'domcontentloaded' });

    const getFontSize = () => page.evaluate(
        () => parseFloat(getComputedStyle(document.querySelector('.mw-body-content')).fontSize)
    );

    const before = await getFontSize();

    console.log(`INFO - Font size before: ${before}px`);

    const largeOption = page.locator('label', { hasText: /^\s*Large\s*$/ }).first();

    if (!(await largeOption.isVisible())) {
        await page.getByRole('button', { name: /Appearance/i }).first().click();
    }

    await expect(largeOption).toBeVisible();

    await largeOption.click();

    await expect.poll(getFontSize).toBeGreaterThan(before);

    const after = await getFontSize();

    console.log(`PASS - Font size increased to ${after}px`);

    console.log('');
    console.log('========================================');
    console.log('  TC-27 TEXT SIZE SUMMARY');
    console.log('========================================');
    console.log(`Font size: ${before}px to ${after}px`);
    console.log('========================================');
});
