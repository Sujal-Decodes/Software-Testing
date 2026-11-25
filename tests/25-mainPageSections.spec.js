const { test, expect } = require('@playwright/test');

test('TC-25 - Wikipedia Main Page Sections Testing', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto(
        'https://en.wikipedia.org/wiki/Main_Page',
        { waitUntil: 'domcontentloaded' }
    );

    await expect(page).toHaveTitle(/Wikipedia/);

    console.log('PASS - Main Page title verified');

    const sections = [
        { id: '#mp-tfa', name: "Today's featured article" },
        { id: '#mp-dyk', name: 'Did you know' },
        { id: '#mp-itn', name: 'In the news' },
        { id: '#mp-otd', name: 'On this day' }
    ];

    for (const section of sections) {
        await expect(page.locator(section.id)).toBeAttached();
        console.log(`PASS - Section found: ${section.name}`);
    }

    console.log('');
    console.log('========================================');
    console.log('  TC-25 MAIN PAGE SECTIONS SUMMARY');
    console.log('========================================');
    console.log(`Sections verified: ${sections.length}`);
    console.log('========================================');
});
