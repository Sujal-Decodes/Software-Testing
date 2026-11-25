
const { test, expect } = require('@playwright/test');

test('TC-10 - Wikipedia Category Page Testing', async ({ page }) => {

    // Increase test timeout to 60 seconds
    test.setTimeout(60000);

    // STEP 1: Open Wikipedia category page
    await page.goto(
        'https://en.wikipedia.org/wiki/Category:Software_testing',
        { waitUntil: 'domcontentloaded', timeout: 60000 }
    );

    console.log('PASS - Wikipedia category page opened');

    // STEP 2: Verify category heading
    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log('PASS - Category heading verified');

    // STEP 3: Verify subcategories section
    const subcategories = page.locator('#mw-subcategories');

    const subcategorySectionExists = await subcategories.count();

    if (subcategorySectionExists > 0) {
        await expect(subcategories).toBeVisible();
        console.log('PASS - Subcategories section is visible');
    } else {
        console.log('INFO - No subcategories section found');
    }

    // STEP 4: Verify category pages section
    const categoryPages = page.locator('#mw-pages');

    await expect(categoryPages).toBeVisible();

    const articleLinks = categoryPages.locator('a[href^="/wiki/"]');

    const articleCount = await articleLinks.count();

    expect(articleCount).toBeGreaterThan(0);

    console.log(`PASS - Category article links found: ${articleCount}`);

    // STEP 5: Open first article from category
    const firstArticle = articleLinks.first();

    const articleName = (await firstArticle.innerText()).trim();

    await firstArticle.click();

    await expect(page.locator('#firstHeading')).toBeVisible();

    await expect(page).toHaveURL(/\/wiki\//);

    console.log(`PASS - Category article opened: ${articleName}`);

    // FINAL SUMMARY
    console.log('');
    console.log('======================================');
    console.log('TC-10 CATEGORY PAGE TEST PASSED');
    console.log(`Total article links: ${articleCount}`);
    console.log(`Opened article: ${articleName}`);
    console.log('======================================');

});
