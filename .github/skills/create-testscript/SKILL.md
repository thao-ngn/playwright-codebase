---
name: create-testscript
description: Create or update Playwright end-to-end test scripts in this TypeScript Page Object Model repository. Use when asked to add, generate, or modify a test script.
---

# Create a Playwright Test Script

Create test scripts that follow the repository's structure and conventions, prioritizing stability, independence, and maintainability.

## Before Writing Tests

1. Read `project-documentations/01-website-feature.md` to understand the feature's behavior and risks.
2. Read `project-documentations/03-pom-design.md`, `project-documentations/05-fixture-design.md`, and `project-documentations/06-coding-convention-design.md`.
3. Review a related test in `tests/e2e/`, its Page Object in `pages/`, and any required fixtures in `fixtures/`.
4. Check `playwright.config.ts` and existing aliases/imports before choosing a test command or import style.

## Location and Naming

- Place UI end-to-end tests in `tests/e2e/<module>/`.
- Use a descriptive `kebab-case.spec.ts` filename, such as `posts-crud.spec.ts`.
- Group related tests with `test.describe()`; each `test()` should cover one behavior or clear business flow.
- Name tests after their expected outcomes. Follow the language and naming conventions used in the module.

## Writing Tests

- Import `test` and `expect` from `@fixtures/auth.fixture` for flows that require an authenticated session. For login flows, failed authentication, or unauthenticated states, use an appropriate Playwright fixture such as `@playwright/test`.
- Interact with pages through Page Objects in `pages/`. If a required behavior is missing, add a method and locator to the appropriate Page Object instead of putting DOM interaction details in the test.
- Prefer locators in this order: `getByRole`, `getByLabel`, `getByText`, `getByTestId`, then CSS. Use XPath only when no suitable alternative exists.
- Always `await` asynchronous Playwright actions; do not mix `.then()` with `async/await`.
- Use web-first assertions such as `toBeVisible()`, `toHaveText()`, `toHaveURL()`, and `toBeEnabled()`. Avoid reading state and comparing it manually.
- Each test must establish its own required data and state; do not rely on execution order or data created by another test.
- Generate unique data with existing helpers in `utils/` when needed. Prefer seeding and cleanup through existing APIs or fixtures. If a test creates data through the UI, clean it up to avoid polluting the environment.
- Do not hard-code URLs, accounts, or environment secrets in tests. Reuse existing environment variables and fixtures; never add or write secret values to the repository.
- For actions with broad impact or difficult recovery (for example, changing Settings), determine how to restore the state in the same test or fixture before implementation.

## Example Structure

```ts
import { test, expect } from '@fixtures/auth.fixture';
import { PostsPage } from '@pages/posts.page';
import { randomPostTitle } from '@utils/data-generator';

test.describe('Posts', () => {
  test('creates a post and shows it in the list', async ({ authenticatedPage }) => {
    const postsPage = new PostsPage(authenticatedPage);
    const title = randomPostTitle();

    await postsPage.goto();
    await postsPage.createPost(title, 'Automated test content.');

    await postsPage.goto();
    await postsPage.searchPost(title);
    await expect(authenticatedPage.getByText(title)).toBeVisible();

    await postsPage.deletePost(title);
  });
});
```

Adapt the example to the module and APIs actually used in the repository; do not copy a flow that does not fit the requirement.

## Verification

1. Run the new test with `npx playwright test <file-path>`.
2. If the test requires an unavailable account, browser, or website, do not assume it passed; clearly state what could not be verified and the error or missing prerequisite.
3. If the integration test cannot run, at minimum confirm that Playwright discovers it with `npx playwright test <file-path> --list`.
4. Briefly report the files added or changed and the verification results.
