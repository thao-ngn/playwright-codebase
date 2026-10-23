# Page Object Model Design

> Purpose: Define Page classes, locator conventions, and how test files use Page classes.

## General Principles
- Each Page class represents **one WP-Admin page or functional area**, mapped directly to a section in `01-website-feature.md`.
- Test files **must not** access locators directly. They should call clearly named action methods (for example, `usersPage.createUser(data)`); the Page class encapsulates DOM details.
- Prefer locators in this order: `getByRole` > `getByLabel` > `getByText` > `getByTestId` > CSS selector (sparingly) > XPath (avoid unless no alternative exists).
- Each method returns a Promise. Always `await` asynchronous actions.

## `BasePage`
```ts
// pages/base.page.ts
export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForToast(message?: string) {
    // WP-Admin often displays a notice or toast after an action; wait for it here.
  }
}
```

## Planned Page Classes

| Page class | Area | Main methods (examples) |
|---|---|---|
| `LoginPage` | Login | `login(username, password)`, `getErrorMessage()` |
| `DashboardPage` | Admin dashboard | `waitForWidgetsLoaded()` |
| `PostsPage` | Posts | `createPost(title, content)`, `deletePost(title)`, `searchPost(keyword)`, `bulkDelete(titles[])` |
| `MediaPage` | Media Library | `uploadFile(filePath)`, `deleteFile(fileName)`, `editAltText(fileName, text)` |
| `UsersPage` | Users | `createUser(userData)`, `deleteUser(username, reassignTo?)`, `changeRole(username, role)` |
| `SettingsPage` | Settings | `updatePermalink(structure)`, `resetToDefault()` |

## Detailed Example: `LoginPage`
```ts
// pages/login.page.ts
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private usernameInput = () => this.page.getByLabel('Username or Email Address');
  private passwordInput = () => this.page.getByLabel('Password', { exact: true });
  private submitButton = () => this.page.getByRole('button', { name: 'Log In' });
  private errorNotice = () => this.page.locator('#login_error');

  async goto() {
    await super.goto('/wp-login.php');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.submitButton().click();
  }

  async getErrorMessage() {
    await expect(this.errorNotice()).toBeVisible();
    return this.errorNotice().innerText();
  }
}
```

## Example Usage in a Test
```ts
// tests/e2e/auth/login.spec.ts
test('logs in successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);

  await expect(page).toHaveURL(/wp-admin/);
  await dashboardPage.waitForWidgetsLoaded();
});
```