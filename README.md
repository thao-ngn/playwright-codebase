# playwright-codebase

Playwright automation tests for **WP-Admin** at `pw-practice-dev.playwrightvn.com/wp-admin`, written in TypeScript using the Page Object Model (POM).

## Design Documentation

The analysis and design decisions made before implementation are documented in `project-documentations/`:

| # | File | Content |
|---|---|---|
| 1 | [01-website-feature.md](./project-documentations/01-website-feature.md) | Website feature analysis and testing notes |
| 2 | [02-folder-design.md](./project-documentations/02-folder-design.md) | Project folder structure |
| 3 | [03-pom-design.md](./project-documentations/03-pom-design.md) | Page Object Model design |
| 4 | [04-utils-design.md](./project-documentations/04-utils-design.md) | Utility function design |
| 5 | [05-fixture-design.md](./project-documentations/05-fixture-design.md) | Test fixture design |
| 6 | [06-coding-convention-design.md](./project-documentations/06-coding-convention-design.md) | Project coding conventions |

## Folder Structure

```
playwright-codebase/
├── project-documentations/   # Design documentation (see the table above)
├── tests/                    # End-to-end test specs
├── report/                   # HTML report generated after tests run
├── api/                      # REST API helpers for seeding and cleaning up data
├── pages/                    # Page Object Model classes
├── fixtures/                 # Custom Playwright fixtures
├── utils/                    # Helper functions
├── test-data/                # Static test data
├── environment/              # Environment configuration and sample variables
├── .github/workflows/        # CI pipeline (GitHub Actions)
├── .env                      # Environment variables (DO NOT commit)
├── playwright.config.ts
└── package.json
```

## Environment Setup

Create a `.env` file in the project root from `.env.example`, then provide the test URL and account credentials. Do not commit `.env` or credentials:

```powershell
Copy-Item .env.example .env
```

The default `BASE_URL` points to the practice WP-Admin site. Set `ADMIN_USER` and `ADMIN_PASS` to an account on that site before running tests that require authentication.

## Requirements
- Node.js >= 20
- npm

## Installation

```bash
git clone <repo-url>
cd playwright-codebase
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run a specific test file
npm test -- tests/e2e/auth/login.spec.ts

# Run in UI mode (interactive debugging)
npm run test:ui

# Run with a visible browser
npm run test:headed

# Open the HTML report after the test run
npm run test:report
```

## CI/CD

The pipeline runs automatically through GitHub Actions and is configured in [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml).

## Coding Conventions

[06-coding-convention-design.md](./project-documentations/06-coding-convention-design.md) - naming, async/await, assertions, locator strategy, and more.