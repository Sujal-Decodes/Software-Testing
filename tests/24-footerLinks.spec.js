const { test, expect } = require('@playwright/test');

test('TC-24 - Wikipedia Footer Links Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://en.wikipedia.org/wiki/Software_testing', { waitUntil: 'domcontentloaded' });

    const footer = page.locator('footer');

    const names = ['Privacy policy', 'About Wikipedia', 'Disclaimers', 'Terms of Use'];

    for (const name of names) {
        await expect(footer.getByRole('link', { name }).first()).toBeAttached();
        console.log(`PASS - Footer link found: ${name}`);
    }

    console.log('');
    console.log('========================================');
    console.log('  TC-24 FOOTER LINKS SUMMARY');
    console.log('========================================');
    console.log(`Footer links verified: ${names.length}`);
    console.log('========================================');
});
