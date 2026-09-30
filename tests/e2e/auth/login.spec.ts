import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';

test.describe('Login', () => {
  test('đăng nhập thành công với tài khoản hợp lệ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);

    await expect(page).toHaveURL(/wp-admin/);
    await dashboardPage.waitForWidgetsLoaded();
  });

  test('hiển thị lỗi khi đăng nhập sai mật khẩu', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, 'wrong-password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
  });
});
