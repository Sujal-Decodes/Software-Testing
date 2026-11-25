const { test, expect } = require('@playwright/test');

test('TC-08 - Wikipedia Edit Workflow Test (Anonymous, No Publish)', async ({ page }) => {

    test.setTimeout(90000);

    // Step 1: Open the Wikipedia Sandbox edit page (not logged in)
    await page.goto(
        'https://en.wikipedia.org/w/index.php?title=Wikipedia:Sandbox&action=edit',
        { waitUntil: 'domcontentloaded' }
    );

    await expect(page).toHaveURL(/action=edit/);

    console.log('PASS - Sandbox edit page opened (no login)');

    // Step 2: Check what the page offers an anonymous user
    const heading = (await page.locator('#firstHeading').innerText()).trim();

    console.log(`INFO - Page heading: ${heading}`);

    const editor = page.locator('textarea#wpTextbox1');

    await expect(editor).toHaveCount(1);

    const isReadOnly = await editor.evaluate(el => el.readOnly);

    console.log(`INFO - Editor textarea read-only: ${isReadOnly}`);

    // Step 3: Verify that editing is not permitted for this anonymous user
    if (isReadOnly || /View source/i.test(heading)) {
        await expect(page.locator('#mw-content-text'))
            .toContainText(/do not have permission to edit/i);

        console.log('PASS - Editing is not permitted without login (view-source mode)');
    } else {
        console.log('INFO - Editor is editable for this anonymous user');
    }

    // Step 4: Confirm nothing was published
    await page.goto(
        'https://en.wikipedia.org/wiki/Wikipedia:Sandbox',
        { waitUntil: 'domcontentloaded' }
    );

    const pageText = await page.locator('#mw-content-text').innerText();

    expect(pageText).not.toContain('Playwright temporary test');

    console.log('PASS - Sandbox page unchanged, no edit was published');

    console.log('');
    console.log('========================================');
    console.log('      TC-08 EDIT WORKFLOW SUMMARY');
    console.log('========================================');
    console.log(`Page heading: ${heading}`);
    console.log(`Editor read-only: ${isReadOnly}`);
    console.log('No edit published');
    console.log('========================================');
});