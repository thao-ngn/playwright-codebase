# Page Object Model Design

> Mục đích: thiết kế các Page class, quy tắc locator, và cách test file sẽ gọi vào các Page class.

## Nguyên tắc chung
- Mỗi Page class đại diện cho **một trang/khu vực chức năng** của WP-Admin (map trực tiếp với các mục ở `01-website-feature.md`)
- Test file **không** được truy cập locator trực tiếp — chỉ gọi các action method có tên rõ nghĩa (vd `usersPage.createUser(data)`), Page class chịu trách nhiệm ẩn chi tiết DOM
- Locator ưu tiên theo thứ tự: `getByRole` > `getByLabel` > `getByText` > `getByTestId` > CSS selector (hạn chế) > XPath (tránh dùng, chỉ khi không còn cách khác)
- Mỗi method trả về Promise, luôn có `await` khi gọi các action bất đồng bộ

## BasePage
```ts
// pages/base.page.ts
export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForToast(message?: string) {
    // WP-Admin thường show notice/toast sau action — chờ chung ở đây
  }
}
```

## Danh sách Page class dự kiến

| Page class | Khu vực | Method chính (ví dụ) |
|---|---|---|
| `LoginPage` | Đăng nhập | `login(username, password)`, `getErrorMessage()` |
| `DashboardPage` | Trang chủ admin | `waitForWidgetsLoaded()` |
| `PostsPage` | Posts | `createPost(title, content)`, `deletePost(title)`, `searchPost(keyword)`, `bulkDelete(titles[])` |
| `MediaPage` | Media Library | `uploadFile(filePath)`, `deleteFile(fileName)`, `editAltText(fileName, text)` |
| `UsersPage` | Users | `createUser(userData)`, `deleteUser(username, reassignTo?)`, `changeRole(username, role)` |
| `SettingsPage` | Settings | `updatePermalink(structure)`, `resetToDefault()` |

## Ví dụ chi tiết: LoginPage
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

## Ví dụ dùng trong test
```ts
// tests/e2e/auth/login.spec.ts
test('login thành công với tài khoản hợp lệ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);

  await expect(page).toHaveURL(/wp-admin/);
  await dashboardPage.waitForWidgetsLoaded();
});
```