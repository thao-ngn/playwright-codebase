# Utilities Design

> Purpose: List shared utility functions to avoid duplicating code across tests.

## 1. `data-generator.ts` — Generate Test Data
```ts
export function randomEmail(prefix = 'testuser'): string {
  return `${prefix}_${Date.now()}@example.com`;
}

export function randomUsername(prefix = 'user'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export function randomPostTitle(): string {
  return `Test Post ${Date.now()}`;
}
```
- Principle: All test data must be **unique** (use timestamps or random values) to avoid conflicts during parallel runs or reruns.

## 2. `api-helper.ts` — Seed and Clean Up Data Through the API
```ts
export async function createUserViaApi(request: APIRequestContext, userData: UserPayload) {
  const res = await request.post('/wp-json/wp/v2/users', { data: userData });
  await expect(res).toBeOK(); // Assert before reading the value to avoid unclear errors when the response fails.
  return res.json();
}

export async function deleteUserViaApi(request: APIRequestContext, userId: number) {
  await request.delete(`/wp-json/wp/v2/users/${userId}`, {
    data: { force: true, reassign: 1 },
  });
}

export async function loginViaApi(request: APIRequestContext, username: string, password: string) {
  // Retrieve a token/cookie for storageState or subsequent API calls.
}
```
- Main purpose: **Seed data quickly through the API** instead of creating it through the UI. This keeps UI tests focused on the behavior under test and reduces execution time.
- Always clean up created data in `afterEach`/`afterAll` to avoid leaving residual data in a shared test environment.

## 3. `wait-helper.ts` — Shared Wait Helpers
```ts
export async function waitForWpNotice(page: Page, text?: string) {
  const notice = page.locator('.notice, .updated');
  await notice.waitFor({ state: 'visible' });
  if (text) await expect(notice).toContainText(text);
}
```
- Use this when WP-Admin displays a banner notification after an action (save, delete, update, and so on).

## General Utility Guidelines
- Do not import Playwright `test`/`expect` directly into pure data-generator functions. Keep them framework-agnostic so they can be unit-tested independently if needed.
- Give each function clear input and output types to prevent subtle errors when it is used in multiple places.
- Do not put complex business logic in utilities. Logic tightly coupled to a specific page belongs in its Page class (see `03-pom-design.md`).