const { test, expect } = require('@playwright/test');

test('TC-04 - Wikipedia Internal Link Integrity Testing', async ({ page, request }) => {

    // ============================================================
    // STEP 1: Open Wikipedia Software Testing article
    // ============================================================

    await page.goto(
        'https://en.wikipedia.org/wiki/Software_testing'
    );

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('#firstHeading'))
        .toContainText('Software testing');

    console.log('PASS - Software Testing article opened');


    // ============================================================
    // STEP 2: Collect links from article content
    // ============================================================

    const allLinks = await page.locator(
        '#mw-content-text a[href]'
    ).evaluateAll(elements => {

        return elements
            .map(element => element.href)
            .filter(href => href);
    });

    console.log(
        `Total article links found: ${allLinks.length}`
    );


    // ============================================================
    // STEP 3: Keep only normal English Wikipedia article links
    // ============================================================

    const internalLinks = allLinks.filter(url => {

        try {

            const parsedUrl = new URL(url);

            return (
                parsedUrl.hostname === 'en.wikipedia.org' &&
                parsedUrl.pathname.startsWith('/wiki/') &&
                !parsedUrl.pathname.includes(':') &&
                !parsedUrl.hash
            );

        } catch {

            return false;
        }
    });


    // ============================================================
    // STEP 4: Remove duplicate links
    // ============================================================

    const uniqueLinks = [
        ...new Set(internalLinks)
    ];

    console.log(
        `Total unique Wikipedia article links found: ${uniqueLinks.length}`
    );


    // ============================================================
    // STEP 5: Select links for testing
    // ============================================================

    const linksToCheck = uniqueLinks.slice(0, 20);

    console.log(
        `Checking ${linksToCheck.length} internal links`
    );


    // ============================================================
    // STEP 6: Check each link
    // ============================================================

    const results = [];

    for (const url of linksToCheck) {

        try {

            const response = await request.get(url, {
                timeout: 10000
            });

            const status = response.status();

            results.push({
                url: url,
                status: status
            });

            console.log(
                `${status} - ${url}`
            );

        } catch (error) {

            results.push({
                url: url,
                status: 'ERROR'
            });

            console.log(
                `ERROR - ${url}`
            );
        }
    }


    // ============================================================
    // STEP 7: Classify results
    // ============================================================

    const validLinks = results.filter(result => {

        return (
            typeof result.status === 'number' &&
            result.status >= 200 &&
            result.status < 400
        );
    });


    const rateLimitedLinks = results.filter(result => {

        return result.status === 429;
    });


    const failedLinks = results.filter(result => {

        return (
            result.status === 'ERROR' ||
            (
                typeof result.status === 'number' &&
                result.status >= 400 &&
                result.status !== 429
            )
        );
    });


    // ============================================================
    // STEP 8: Display test summary
    // ============================================================

    console.log('');
    console.log('========================================');
    console.log('        LINK INTEGRITY TEST SUMMARY');
    console.log('========================================');

    console.log(
        `Links checked       : ${results.length}`
    );

    console.log(
        `Valid links         : ${validLinks.length}`
    );

    console.log(
        `Rate limited (429)  : ${rateLimitedLinks.length}`
    );

    console.log(
        `Failed links        : ${failedLinks.length}`
    );

    console.log('========================================');


    // ============================================================
    // STEP 9: Display rate-limited links
    // ============================================================

    if (rateLimitedLinks.length > 0) {

        console.log('');
        console.log('Rate-limited links (HTTP 429):');

        for (const link of rateLimitedLinks) {

            console.log(
                `429 - ${link.url}`
            );
        }

        console.log(
            'HTTP 429 indicates server rate limiting, not a broken link.'
        );
    }


    // ============================================================
    // STEP 10: Display actual failed links
    // ============================================================

    if (failedLinks.length > 0) {

        console.log('');
        console.log('Actual failed links:');

        for (const link of failedLinks) {

            console.log(
                `${link.status} - ${link.url}`
            );
        }
    }


    // ============================================================
    // STEP 11: Make sure links were actually tested
    // ============================================================

    expect(
        results.length,
        'No Wikipedia internal links were found to test'
    ).toBeGreaterThan(0);


    // ============================================================
    // STEP 12: Make sure at least one link responded successfully
    // ============================================================

    expect(
        validLinks.length,
        'No links returned a successful HTTP response'
    ).toBeGreaterThan(0);


    // ============================================================
    // STEP 13: Fail only for genuine link/request failures
    // ============================================================

    expect(
        failedLinks.length,
        'Broken or failed Wikipedia links were detected'
    ).toBe(0);


    // ============================================================
    // FINAL RESULT
    // ============================================================

    console.log('');
    console.log(
        'TC-04 completed successfully'
    );

    console.log(
        'Wikipedia internal links were tested successfully.'
    );

    if (rateLimitedLinks.length > 0) {

        console.log(
            `Note: ${rateLimitedLinks.length} links were rate-limited (HTTP 429) and could not be conclusively checked.`
        );
    }
});