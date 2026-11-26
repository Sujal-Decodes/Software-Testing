# Software Testing Project

Automated UI testing of Wikipedia using **Playwright** and JavaScript.

## Overview

This project contains browser-based automated tests for Wikipedia. The tests are written with Playwright Test and are organized in the `tests/` directory. Test data is stored in `test-data/`.

## Project Structure

```text
Software-Testing/
├── test-data/           # Test data used by the test suite
├── tests/               # Playwright test specifications
├── .gitignore
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Locked dependency versions
├── playwright.config.js # Playwright configuration
└── README.md
```

## Prerequisites

Install the following before running the tests:

- [Node.js](https://nodejs.org/) and npm
- [Google Chrome](https://www.google.com/chrome/) installed on your computer

The Playwright configuration uses the `chrome` channel, so Google Chrome must be installed.

## Setup

1. Clone the repository:

   ```powershell
   git clone https://github.com/Sujal-Decodes/Software-Testing.git
   ```

2. Open the project directory:

   ```powershell
   cd Software-Testing
   ```

3. Install the project dependencies:

   ```powershell
   npm install
   ```

4. Install the Playwright browser dependencies if needed:

   ```powershell
   npx playwright install
   ```

## Running Tests

Run the full test suite:

```powershell
npx playwright test
```

Run tests using one worker:

```powershell
npx playwright test --workers=1
```

Run tests in the configured Chrome project with the browser visible:

```powershell
npx playwright test --workers=1 --project=chrome --headed
```

Run a specific test file:

```powershell
npx playwright test tests/<test-file-name>.spec.js
```

Replace `<test-file-name>.spec.js` with the name of a test file in the `tests/` directory.

## Test Report

The project is configured to use Playwright’s HTML reporter. After a test run, open the report with:

```powershell
npx playwright show-report
```

## Troubleshooting

### `Cannot find module '@playwright/test'`

Make sure your terminal is in the project directory and install the dependencies:

```powershell
npm install
```

If the error continues, install the test package directly:

```powershell
npm install --save-dev @playwright/test
```

### Chrome does not launch

Confirm that Google Chrome is installed. The configured project uses the `chrome` browser channel.

## Notes

- Run the commands from the repository root—the directory containing `package.json`.
- `node_modules/` is created locally by `npm install` and should not be committed to Git.
- Test results can vary if the website changes or limits automated requests. A network or rate-limit response does not necessarily indicate a failure in the test code.

## Author

**Sujal-Decodes**
