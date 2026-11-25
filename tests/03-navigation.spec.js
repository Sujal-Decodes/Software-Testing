const { test, expect } = require('@playwright/test');

test('TC-03 - Wikipedia Multi-Language Switching', async ({ page }) => {

    // ==========================================
    // STEP 1: Open English Wikipedia
    // ==========================================

    await page.goto(
        'https://en.wikipedia.org/wiki/Software_testing'
    );

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log('PASS - English Software Testing article opened');


    // ==========================================
    // STEP 2: Open language selector
    // ==========================================

    const languageButton = page.getByRole('button', {
        name: /language/i
    }).first();

    await expect(languageButton).toBeVisible();

    await languageButton.click();

    console.log('PASS - English language selector opened');


    // ==========================================
    // STEP 3: Find Hindi language link
    // ==========================================

    const hindiLink = page.locator(
        'a.interlanguage-link-target[lang="hi"]'
    ).first();

    await expect(hindiLink).toHaveCount(1);

    const hindiUrl = await hindiLink.getAttribute('href');

    expect(hindiUrl).toContain('hi.wikipedia.org');

    console.log('PASS - Hindi language link found');


    // ==========================================
    // STEP 4: English → Hindi
    // ==========================================

    await page.goto(hindiUrl);

    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/hi\.wikipedia\.org/);

    await expect(page.locator('#firstHeading'))
        .toBeVisible();

    const hindiHeading =
        await page.locator('#firstHeading').innerText();

    console.log('PASS - Switched from English to Hindi');
    console.log(`Hindi article: ${hindiHeading}`);


    // ==========================================
    // STEP 5: Find French language link
    // ==========================================

    const frenchLink = page.locator(
        'a.interlanguage-link-target[lang="fr"]'
    ).first();

    await expect(frenchLink).toHaveCount(1);

    const frenchUrl = await frenchLink.getAttribute('href');

    expect(frenchUrl).toContain('fr.wikipedia.org');

    console.log('PASS - French language link found');


    // ==========================================
    // STEP 6: Hindi → French
    // ==========================================

    await page.goto(frenchUrl);

    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/fr\.wikipedia\.org/);

    await expect(page.locator('#firstHeading'))
        .toBeVisible();

    const frenchHeading =
        await page.locator('#firstHeading').innerText();

    console.log('PASS - Switched from Hindi to French');
    console.log(`French article: ${frenchHeading}`);


    // ==========================================
    // FINAL RESULT
    // ==========================================

    console.log(
        'TC-03 Multi-Language Switching completed successfully'
    );

    // Keep browser open temporarily
    await page.waitForTimeout(5000);
});