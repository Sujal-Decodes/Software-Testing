const { test, expect } = require('@playwright/test');

test('TC-15 - Wikipedia Browser Back and Forward Navigation', async ({ page }) => {

    test.setTimeout(60000);

    const urlA = 'https://en.wikipedia.org/wiki/Software_testing';
    const urlB = 'https://en.wikipedia.org/wiki/Test_automation';

    await page.goto(urlA, { waitUntil: 'domcontentloaded' });
    await page.goto(urlB, { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#firstHeading')).toContainText('Test automation');

    console.log('PASS - Second article opened');

    await page.goBack({ waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(urlA);
    await expect(page.locator('#firstHeading')).toContainText('Software testing');

    console.log('PASS - Back navigation returned to the first article');

    await page.goForward({ waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(urlB);

    console.log('PASS - Forward navigation returned to the second article');

    console.log('');
    console.log('========================================');
    console.log('  TC-15 BACK/FORWARD SUMMARY');
    console.log('========================================');
    console.log('Back and forward buttons work correctly');
    console.log('========================================');
});
