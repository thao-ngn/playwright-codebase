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
├── tests/                    # Test spec (e2e, api)
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

Create a `.env` file in the project root from `environment/.env.example`, then provide the test URL and account credentials. Do not commit `.env` or credentials:

```powershell
Copy-Item environment\.env.example .env
```

Example API tests are in `tests/api/` and can be run separately with `npx playwright test tests/api`.

## Requirements
- Node.js >= 18
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
npx playwright test

# Run a specific test file
npx playwright test tests/e2e/auth/login.spec.ts

# Run in UI mode (interactive debugging)
npx playwright test --ui

# Open the HTML report after the test run
npx playwright show-report report
```

## CI/CD

The pipeline runs automatically through GitHub Actions and is configured in [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml).

## Coding Conventions

[06-coding-convention-design.md](./project-documentations/06-coding-convention-design.md) - naming, async/await, assertions, locator strategy, and more.