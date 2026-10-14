# Folder Structure

```text
playwright-codebase/
├── .github/
│   ├── skills/
│   │   ├── create-testscript/
│   │   │   └── SKILL.md
│   │   └── test-report/
│   │       └── SKILL.md
│   └── workflows/
│       └── playwright.yml
├── api/
│   └── wordpress-api.ts          # WordPress REST API helpers
├── environment/
│   └── config.ts                 # Base URL and required environment variables
├── fixtures/
│   ├── auth.fixture.ts           # Authenticated page fixture
│   ├── index.ts                  # Combined fixture exports
│   └── user.fixture.ts           # Test-user fixture
├── pages/
│   ├── base.page.ts
│   ├── dashboard.page.ts
│   ├── login.page.ts
│   ├── media.page.ts
│   ├── posts.page.ts
│   ├── settings.page.ts
│   └── users.page.ts
├── project-documentations/
│   ├── 01-website-feature.md
│   ├── 02-folder-design.md
│   ├── 03-pom-design.md
│   ├── 04-utils-design.md
│   ├── 05-fixture-design.md
│   └── 06-coding-convention-design.md
├── test-data/
│   └── data.txt
├── tests/
│   ├── e2e/
│   │   ├── auth/
│   │   │   ├── login-form.spec.ts
│   │   │   └── login.spec.ts
│   │   ├── dashboard/
│   │   │   └── dashboard.spec.ts
│   │   ├── media/
│   │   │   └── media.spec.ts
│   │   ├── posts/
│   │   │   └── posts-crud.spec.ts
│   │   ├── settings/
│   │   │   └── settings.spec.ts
│   │   └── users/
│   │       └── users.spec.ts
│   └── example.spec.ts
├── utils/
│   ├── api-helper.ts              # API helper exports
│   ├── data-generator.ts          # Unique test data generators
│   └── wait-helper.ts             # Shared wait helpers
├── .env                           # Local environment values; do not commit
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Directory responsibilities

- `tests/e2e/`: UI end-to-end tests grouped by feature.
- `pages/`: Page Object classes that encapsulate page locators and actions.
- `fixtures/`: Reusable Playwright fixtures, including authentication and test users.
- `api/`: WordPress REST API helpers for test setup and cleanup.
- `environment/`: Base URL configuration and access to required environment variables.
- `utils/`: Shared test data generation and wait/API helpers.
- `test-data/`: Static data used by tests.
- `project-documentations/`: Feature analysis, design, and coding conventions.
- `.github/`: Repository-specific skills and CI workflow configuration.

Playwright output such as `report/`, `playwright-report/`, and `test-results/`, along with installed dependencies in `node_modules/`, is generated locally and is not part of the source tree. The `.env` file contains local configuration and must not be committed.
