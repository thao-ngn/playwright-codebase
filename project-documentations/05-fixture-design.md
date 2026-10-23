# Fixture Design

> Purpose: Design custom fixtures that simplify test setup and cleanup and reuse authenticated sessions.

## 1. `auth.fixture.ts` — Pre-authenticated Page
```ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await use(page);
    // No cleanup is needed; the session ends when the context closes.
  },
});

export { expect } from '@playwright/test';
```
- Scope: **test-level** (a new session for each test). This is simple and easy to debug, at the cost of speed.
- Future improvement: Use `storageState` to save a session after logging in once and reuse it across tests, significantly reducing execution time.

## 2. `user.fixture.ts` — Seed a User Through the API Before the Test and Clean It Up Afterwards
```ts
type UserFixtures = {
  testUser: { id: number; username: string; email: string; password: string };
};

export const test = base.extend<UserFixtures>({
  testUser: async ({ request }, use) => {
    const userData = {
      username: randomUsername(),
      email: randomEmail(),
      password: 'TestPass123!',
    };
    const created = await createUserViaApi(request, userData);

    await use({ ...userData, id: created.id });

    // Cleanup runs after the test, whether it passes or fails.
    await deleteUserViaApi(request, created.id);
  },
});
```
- Scope: **test-level**, because each test usually needs its own user to avoid conflicts during parallel execution.
- The fixture cleans up automatically through Playwright's `use()` mechanism (code after `use()` runs whether the test passes or fails).

## 3. Combining Multiple Fixtures
```ts
export const test = mergeTests(authTest, userTest);
```
- This lets a test file import a single `test` object that provides both `authenticatedPage` and `testUser`.

## General Guidelines
- Fixtures should **clean up after themselves** so tests do not have to remember to delete data manually.
- Prefer seeding data through the **API** (faster and more reliable) rather than through the UI in a fixture.
- Name fixtures after what they provide (`testUser`), not what they do (`createUser`).