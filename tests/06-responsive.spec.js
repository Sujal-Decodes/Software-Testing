const { test, expect } = require('@playwright/test');

const viewports = [
    {
        name: 'Desktop',
        width: 1366,
        height: 768
    },
    {
        name: 'Tablet',
        width: 768,
        height: 1024
    },
    {
        name: 'Mobile',
        width: 390,
        height: 844
    }
];

test.describe('TC-06 - Wikipedia Responsive UI Testing', () => {

    for (const viewport of viewports) {

        test(`Responsive UI - ${viewport.name}`, async ({ page }) => {

            // Set viewport size
            await page.setViewportSize({
                width: viewport.width,
                height: viewport.height
            });

            console.log('');
            console.log('========================================');
            console.log(`VIEWPORT: ${viewport.name}`);
            console.log(`SIZE: ${viewport.width} x ${viewport.height}`);
            console.log('========================================');

            // Open Wikipedia
            await page.goto(
                'https://en.wikipedia.org/wiki/Software_testing',
                {
                    waitUntil: 'domcontentloaded'
                }
            );

            // 1. Verify article heading
            const heading = page.locator('#firstHeading');

            await expect(heading)
                .toContainText('Software testing');

            console.log(
                'PASS - Article heading is visible'
            );

            // 2. Check horizontal overflow
            const dimensions = await page.evaluate(() => {

                return {
                    documentWidth:
                        document.documentElement.scrollWidth,

                    viewportWidth:
                        window.innerWidth
                };
            });

            console.log(
                `Document width: ${dimensions.documentWidth}px`
            );

            console.log(
                `Viewport width: ${dimensions.viewportWidth}px`
            );

            expect(
                dimensions.documentWidth,
                'Horizontal overflow detected'
            ).toBeLessThanOrEqual(
                dimensions.viewportWidth + 1
            );

            console.log(
                'PASS - No horizontal page overflow detected'
            );

            // 3. Verify main article content
            const mainContent =
                page.locator('#mw-content-text');

            await expect(mainContent)
                .toBeVisible();

            console.log(
                'PASS - Main article content is visible'
            );

            // 4. Verify heading is inside the viewport
            const headingPosition =
                await heading.boundingBox();

            expect(
                headingPosition,
                'Article heading has no visible position'
            ).not.toBeNull();

            expect(
                headingPosition.y,
                'Article heading is outside the viewport'
            ).toBeGreaterThanOrEqual(0);

            expect(
                headingPosition.y,
                'Article heading is below the viewport'
            ).toBeLessThan(
                viewport.height
            );

            console.log(
                'PASS - Article heading is positioned inside viewport'
            );

            // 5. Verify body has usable width
            const bodyWidth = await page.locator('body')
                .evaluate(element => element.clientWidth);

            console.log(
                `Body width: ${bodyWidth}px`
            );

            expect(
                bodyWidth,
                'Body width is invalid'
            ).toBeGreaterThan(0);

            console.log(
                'PASS - Page body has valid responsive width'
            );

            console.log('');
            console.log(
                `PASS - ${viewport.name} responsive test completed`
            );
            console.log('========================================');
        });
    }
});