
const { test, expect } = require('@playwright/test');

test('TC-01 - Wikipedia Multiple Link and Tab Reliability', async ({ browser }) => {

    const context = await browser.newContext();

    try {

        // ========================================
        // STEP 1 - Open main Wikipedia article
        // ========================================

        const mainPage = await context.newPage();

        await mainPage.goto(
            'https://en.wikipedia.org/wiki/Software_testing',
            { waitUntil: 'domcontentloaded' }
        );

        const mainHeading = mainPage.locator('#firstHeading');

        await expect(mainHeading)
            .toContainText('Software testing');

        console.log('PASS - Main Software Testing article opened');


        // ========================================
        // STEP 2 - Define 12 article tabs
        // ========================================

        const articles = [
            {
                name: 'Unit testing',
                url: 'https://en.wikipedia.org/wiki/Unit_testing',
                expectedHeading: 'Unit testing'
            },
            {
                name: 'Integration testing',
                url: 'https://en.wikipedia.org/wiki/Integration_testing',
                expectedHeading: 'Integration testing'
            },
            {
                name: 'System testing',
                url: 'https://en.wikipedia.org/wiki/System_testing',
                expectedHeading: 'System testing'
            },
            {
                name: 'Regression testing',
                url: 'https://en.wikipedia.org/wiki/Regression_testing',
                expectedHeading: 'Regression testing'
            },
            {
                name: 'Acceptance testing',
                url: 'https://en.wikipedia.org/wiki/Acceptance_testing',
                expectedHeading: 'Acceptance testing'
            },
            {
                name: 'Performance testing',
                url: 'https://en.wikipedia.org/wiki/Software_performance_testing',
                expectedHeading: 'Software performance testing'
            },
            {
                name: 'Test automation',
                url: 'https://en.wikipedia.org/wiki/Test_automation',
                expectedHeading: 'Test automation'
            },
            {
                name: 'Exploratory testing',
                url: 'https://en.wikipedia.org/wiki/Exploratory_testing',
                expectedHeading: 'Exploratory testing'
            },
            {
                name: 'Security testing',
                url: 'https://en.wikipedia.org/wiki/Security_testing',
                expectedHeading: 'Security testing'
            },
            {
                name: 'Usability testing',
                url: 'https://en.wikipedia.org/wiki/Usability_testing',
                expectedHeading: 'Usability testing'
            },
            {
                name: 'Database testing',
                url: 'https://en.wikipedia.org/wiki/Database_testing',
                expectedHeading: 'Database testing'
            },
            {
                name: 'Software quality',
                url: 'https://en.wikipedia.org/wiki/Software_quality',
                expectedHeading: 'Software quality'
            }
        ];


        // ========================================
        // STEP 3 - Open articles in separate tabs
        // ========================================

        const pages = [];

        for (const article of articles) {

            const newPage = await context.newPage();

            await newPage.goto(
                article.url,
                { waitUntil: 'domcontentloaded' }
            );

            pages.push({
                page: newPage,
                article: article
            });

            console.log(`Opened tab: ${article.name}`);
        }

        expect(pages.length).toBe(12);

        console.log(`Additional tabs opened: ${pages.length}`);
        console.log(`Total pages including original: ${pages.length + 1}`);


        // ========================================
        // STEP 4 - Verify each tab's article
        // ========================================

        for (const item of pages) {

            await item.page.bringToFront();

            const heading = item.page.locator('#firstHeading');

            await expect(heading)
                .toBeVisible();

            await expect(heading)
                .toHaveText(item.article.expectedHeading);

            const currentUrl = item.page.url();

            expect(currentUrl)
                .toContain('en.wikipedia.org/wiki/');

            console.log(
                `PASS - ${item.article.name}: heading and URL verified`
            );
        }


        // ========================================
        // STEP 5 - Verify original tab remains usable
        // ========================================

        await mainPage.bringToFront();

        await expect(mainPage.locator('#firstHeading'))
            .toContainText('Software testing');

        await expect(mainPage)
            .toHaveURL(/\/wiki\/Software_testing$/);

        console.log(
            'PASS - Original Software Testing tab still works'
        );


        // ========================================
        // STEP 6 - Final summary
        // ========================================

        console.log('');
        console.log('========================================');
        console.log('  TC-01 MULTI-TAB RELIABILITY SUMMARY');
        console.log('========================================');
        console.log(`Article tabs opened: ${pages.length}`);
        console.log(`Total pages: ${pages.length + 1}`);
        console.log(`Article tabs verified: ${pages.length}`);
        console.log('Original tab verified: PASS');
        console.log('========================================');

        await mainPage.waitForTimeout(2000);

    } finally {

        await context.close();

    }
});