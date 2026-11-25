
const BASE = 'https://en.wikipedia.org';

// Opens a page with retry support
async function gotoWithRetry(page, url, options = {}) {
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            return await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 60000,
                ...options
            });
        } catch (error) {
            lastError = error;

            if (attempt === 3) {
                throw lastError;
            }

            await page.waitForTimeout(2000);
        }
    }
}

// Sends an HTTP GET request with retry support
async function getWithRetry(request, url, options = {}) {
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await request.get(url, {
                timeout: 60000,
                ...options
            });

            if (response.status() >= 500 && attempt < 3) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                continue;
            }

            return response;
        } catch (error) {
            lastError = error;

            if (attempt === 3) {
                throw lastError;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

// Prints test execution summary
function printSummary(title, details = {}) {
    console.log('');
    console.log('======================================');
    console.log(title);

    for (const [key, value] of Object.entries(details)) {
        console.log(`${key}: ${value}`);
    }

    console.log('======================================');
}

// Export all required functions
module.exports = {
    BASE,
    gotoWithRetry,
    getWithRetry,
    printSummary
};
