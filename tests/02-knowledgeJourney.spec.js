const { test, expect } = require('@playwright/test');

test('TC-02 - Wikipedia Knowledge Chain Traversal', async ({ page }) => {

    // -----------------------------------------
    // 1. Open Article A
    // -----------------------------------------

    const firstUrl =
        'https://en.wikipedia.org/wiki/Software_testing';

    await page.goto(firstUrl);

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log('Article A: Software testing');


    // -----------------------------------------
    // 2. Find "Database testing" by visible text
    // -----------------------------------------

    const databaseLink = page
        .getByRole('link', { name: /Database testing/i })
        .first();

    const linkCount = await databaseLink.count();

    console.log(
        `Database testing links found: ${linkCount}`
    );

    expect(linkCount).toBeGreaterThan(0);

    await expect(databaseLink).toBeVisible();

    console.log(
        'Found related article: Database testing'
    );


    // -----------------------------------------
    // 3. Read the actual destination
    // -----------------------------------------

    const databaseHref =
        await databaseLink.getAttribute('href');

    console.log(
        `Database testing destination: ${databaseHref}`
    );

    expect(databaseHref).toBeTruthy();


    // -----------------------------------------
    // 4. Open Article B
    // -----------------------------------------

    await databaseLink.click();

    await page.waitForLoadState('domcontentloaded');


    // -----------------------------------------
    // 5. Verify Article B
    // -----------------------------------------

    await expect(page.locator('#firstHeading'))
        .toContainText('Database testing');

    console.log(
        'Article B: Database testing'
    );


    // -----------------------------------------
    // 6. Verify URL
    // -----------------------------------------

    await expect(page)
        .toHaveURL(/Database_testing/);

    console.log(
        'Article B URL verified'
    );


    // -----------------------------------------
    // 7. Return to Article A
    // -----------------------------------------

    await page.goto(firstUrl);

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log(
        'Returned to Article A successfully'
    );


    // -----------------------------------------
    // 8. Go to Article B again
    // -----------------------------------------

    await page.goto(
        'https://en.wikipedia.org/wiki/Database_testing'
    );

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('#firstHeading'))
        .toContainText('Database testing');

    console.log(
        'Article B restored successfully'
    );


    // Temporary observation
    await page.waitForTimeout(3000);
});