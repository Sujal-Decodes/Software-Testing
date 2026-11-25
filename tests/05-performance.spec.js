const { test, expect } = require('@playwright/test');

const articles = [
    'Software_testing',
    'Artificial_intelligence',
    'Cybersecurity',
    'JavaScript',
    'Python'
];

test.describe('TC-05 - Wikipedia Performance & Runtime Stability', () => {

    for (const article of articles) {

        test(`Performance check - ${article}`, async ({ page }) => {

            const failedRequests = [];
            const consoleErrors = [];

            // Capture failed network requests
            page.on('requestfailed', request => {

                failedRequests.push({
                    url: request.url(),
                    error: request.failure()?.errorText
                });
            });


            // Capture JavaScript console errors
            page.on('console', message => {

                if (message.type() === 'error') {

                    consoleErrors.push(
                        message.text()
                    );
                }
            });


            // Start timing
            const startTime = Date.now();


            // Open article
            await page.goto(
                `https://en.wikipedia.org/wiki/${article}`,
                {
                    waitUntil: 'domcontentloaded'
                }
            );


            // Calculate DOM load time
            const domLoadTime = Date.now() - startTime;


            // Get browser performance metrics
            const metrics = await page.evaluate(() => {

                const navigation =
                    performance.getEntriesByType('navigation')[0];

                const paintEntries =
                    performance.getEntriesByType('paint');

                const fcpEntry =
                    paintEntries.find(
                        entry =>
                            entry.name === 'first-contentful-paint'
                    );

                return {

                    domInteractive:
                        navigation?.domInteractive || 0,

                    domComplete:
                        navigation?.domComplete || 0,

                    loadEventEnd:
                        navigation?.loadEventEnd || 0,

                    firstContentfulPaint:
                        fcpEntry?.startTime || 0
                };
            });


            // Count network requests
            const requestCount =
                await page.evaluate(() => {

                    return performance
                        .getEntriesByType('resource')
                        .length;
                });


            // Verify article loaded
            await expect(
                page.locator('#firstHeading')
            ).toBeVisible();


            // Print results
            console.log('');
            console.log('========================================');
            console.log(`ARTICLE: ${article}`);
            console.log('========================================');

            console.log(
                `DOM Load Time        : ${domLoadTime} ms`
            );

            console.log(
                `DOM Interactive      : ${Math.round(metrics.domInteractive)} ms`
            );

            console.log(
                `DOM Complete         : ${Math.round(metrics.domComplete)} ms`
            );

            console.log(
                `Load Event End       : ${Math.round(metrics.loadEventEnd)} ms`
            );

            console.log(
                `First Contentful Paint: ${Math.round(metrics.firstContentfulPaint)} ms`
            );

            console.log(
                `Network Requests     : ${requestCount}`
            );

            console.log(
                `Failed Requests      : ${failedRequests.length}`
            );

            console.log(
                `JavaScript Errors    : ${consoleErrors.length}`
            );


            // Display failed requests
            if (failedRequests.length > 0) {

                console.log('');
                console.log('Failed network requests:');

                for (const request of failedRequests) {

                    console.log(
                        `${request.url} → ${request.error}`
                    );
                }
            }


            // Display JavaScript errors
            if (consoleErrors.length > 0) {

                console.log('');
                console.log('JavaScript console errors:');

                for (const error of consoleErrors) {

                    console.log(error);
                }
            }


            console.log('========================================');


            // Basic stability assertions
            expect(
                failedRequests.length,
                'Network requests failed'
            ).toBe(0);

            expect(
                consoleErrors.length,
                'JavaScript console errors detected'
            ).toBe(0);


            console.log(
                `PASS - ${article} performance/stability check completed`
            );
        });
    }
});