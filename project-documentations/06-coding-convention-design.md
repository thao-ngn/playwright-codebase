# Coding Conventions

> Purpose: Standardize coding rules across the project to improve readability and maintainability.

## 1. Naming
- Test files: `kebab-case.spec.ts` (for example, `posts-crud.spec.ts`).
- Page Object files: `kebab-case.page.ts`; classes use `PascalCase` (for example, `PostsPage`).
- Variables and functions: `camelCase`.
- Global constants: `UPPER_SNAKE_CASE`.
- Private locators in Page classes: name them after the element, not the action (for example, `submitButton`, not `clickSubmit`).

## 2. Async/await
- Always use `await` for every Playwright action (click, fill, goto, and so on) to avoid race conditions.
- Do not mix `.then()` with `async/await` in the same function.

## 3. Assertions
- Prefer Playwright **web-first assertions** such as `toBeVisible()`, `toBeEnabled()`, and `toHaveText()` instead of reading a value and comparing it with `toEqual()`.
  ```ts
  // Preferred
  await expect(page.getByRole('button')).toBeVisible();

  // Avoid
  const isVisible = await page.getByRole('button').isVisible();
  expect(isVisible).toEqual(true);
  ```
- Assert API responses (`toBeOK()`, status code) **before** using response values so failures are reported at the source instead of causing unclear errors later.

## 4. TypeScript
- Enable `strict: true` in `tsconfig.json`.
- Avoid `any`. If a definite assignment assertion (`!`) is necessary, add a comment explaining why.
- Define a `type` or `interface` for every API payload and complex test data.

## 5. Test Structure
- Keep each test independent; do not rely on the execution order of other tests.
- Use `test.describe` to group tests by feature and `test.beforeEach`/`afterEach` for repeated setup and cleanup.
- Do not hard-code environment data (URLs, accounts) in tests; read it from `.env` through `process.env`.

## 6. Locators
- Preference order: `getByRole` > `getByLabel` > `getByText` > `getByTestId` > CSS > XPath (use XPath only as a last resort).
- Avoid locators based on unstable DOM positions (such as `nth-child`) unless there is no alternative.

## 7. Git and Commits
- Branches: `feature/<feature-name>`, `fix/<issue-description>`.
- Commit messages: `<type>: <short description>` (for example, `feat: add login page object`, `fix: flaky wait in posts test`).
- Do not commit `.env`, `node_modules`, or test reports/output.