const { test, expect } = require('@playwright/test');

test('TC-07 - Wikipedia Appearance Mode Testing', async ({ page }) => {

    // ========================================
    // STEP 1 - Open Wikipedia article
    // ========================================

    await page.goto(
        'https://en.wikipedia.org/wiki/Software_testing',
        {
            waitUntil: 'domcontentloaded'
        }
    );

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log(
        'PASS - Software Testing article opened'
    );


    // ========================================
    // STEP 2 - Find Appearance control
    // ========================================

    const appearanceButton = page.getByRole('button', {
        name: /Appearance/i
    }).first();

    await expect(appearanceButton)
        .toBeVisible();

    console.log(
        'PASS - Appearance control is visible'
    );


    // ========================================
    // STEP 3 - Open Appearance menu
    // ========================================

    await appearanceButton.click();

    console.log(
        'PASS - Appearance control opened'
    );


    // ========================================
    // STEP 4 - Find Dark mode option
    // ========================================

    const darkOption = page.locator('label')
        .filter({
            hasText: /^Dark$/i
        })
        .first();

    await expect(darkOption)
        .toBeVisible();

    console.log(
        'PASS - Dark mode option is visible'
    );


    // ========================================
    // STEP 5 - Select Dark mode
    // ========================================

    await darkOption.click();

    console.log(
        'PASS - Dark mode selected'
    );

    await page.waitForTimeout(1000);


    // ========================================
    // STEP 6 - Verify article in Dark mode
    // ========================================

    await expect(page.locator('#firstHeading'))
        .toBeVisible();

    console.log(
        'PASS - Article remains visible in Dark mode'
    );


    // ========================================
    // STEP 7 - Verify Dark mode background
    // ========================================

    const darkBackground =
        await page.evaluate(() => {

            return window.getComputedStyle(
                document.body
            ).backgroundColor;

        });

    console.log(
        `Dark mode body background: ${darkBackground}`
    );

    expect(
        darkBackground,
        'Dark mode background was not applied'
    ).toBe('rgb(32, 33, 34)');

    console.log(
        'PASS - Dark mode background verified'
    );


    // ========================================
    // STEP 8 - Reopen Appearance menu
    // ========================================

    await appearanceButton.click();

    console.log(
        'PASS - Appearance control reopened'
    );


    // ========================================
    // STEP 9 - Find Light mode radio input
    // ========================================

    const lightOption = page.locator(
        '#skin-client-pref-skin-theme-value-day'
    );

    await expect(lightOption)
        .toHaveCount(1);

    console.log(
        'PASS - Light mode control found'
    );


    // ========================================
    // STEP 10 - Select Light mode
    // ========================================
    //
    // Wikipedia keeps this radio input hidden.
    // Playwright therefore cannot use normal
    // click/check actions on it.
    //
    // We trigger the native DOM click event
    // directly. This simulates the browser event
    // on the actual Light mode radio control.
    //

    await lightOption.evaluate((element) => {
        element.click();
    });

    console.log(
        'PASS - Light mode selection event triggered'
    );

    // Allow Wikipedia to apply the theme
    await page.waitForTimeout(1500);


    // ========================================
    // STEP 11 - Verify Light mode was selected
    // ========================================

    const lightSelected =
        await lightOption.isChecked();

    console.log(
        `Light mode radio selected: ${lightSelected}`
    );

    expect(
        lightSelected,
        'Light mode radio was not selected'
    ).toBe(true);

    console.log(
        'PASS - Light mode radio is selected'
    );


    // ========================================
    // STEP 12 - Verify article after restoration
    // ========================================

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log(
        'PASS - Article restored after appearance change'
    );


    // ========================================
    // STEP 13 - Verify Light mode background
    // ========================================

    const lightBackground =
        await page.evaluate(() => {

            return window.getComputedStyle(
                document.body
            ).backgroundColor;

        });

    console.log(
        `Light mode body background: ${lightBackground}`
    );

    expect(
        lightBackground,
        'Light mode background was not restored'
    ).not.toBe('rgb(32, 33, 34)');

    console.log(
        'PASS - Light mode background restored'
    );


    // ========================================
    // STEP 14 - Final article verification
    // ========================================

    const finalHeading =
        await page.locator('#firstHeading')
            .innerText();

    console.log(
        `Final article heading: ${finalHeading}`
    );

    expect(
        finalHeading
    ).toContain('Software testing');

    console.log(
        'PASS - Final article state verified'
    );


    // ========================================
    // FINAL TEST SUMMARY
    // ========================================

    console.log('');
    console.log('========================================');
    console.log('     TC-07 APPEARANCE TEST SUMMARY');
    console.log('========================================');

    console.log(
        'Appearance control opened'
    );

    console.log(
        'Dark mode option verified'
    );

    console.log(
        'Dark mode selected'
    );

    console.log(
        'Dark background verified'
    );

    console.log(
        'Light mode control verified'
    );

    console.log(
        'Light mode selection triggered'
    );

    console.log(
        'Light mode radio verified'
    );

    console.log(
        'Light background restored'
    );

    console.log(
        'Article functionality verified'
    );

    console.log('========================================');

});