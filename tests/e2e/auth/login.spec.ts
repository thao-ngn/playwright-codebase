import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';
import { requiredEnv } from '@environment/config';

test.describe('Login', () => {
  test('đăng nhập thành công với tài khoản hợp lệ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(requiredEnv('ADMIN_USER'), requiredEnv('ADMIN_PASS'));

    await expect(page).toHaveURL(/wp-admin/);
    await dashboardPage.waitForWidgetsLoaded();
  });

  test('hiển thị lỗi khi đăng nhập sai mật khẩu', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(requiredEnv('ADMIN_USER'), 'wrong-password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
  });

  test('không đăng nhập khi bỏ trống username và mật khẩu', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(page).toHaveURL(/wp-login\.php/);
  });

  test('không đăng nhập khi bỏ trống username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', 'sample-password');

    await expect(page).toHaveURL(/wp-login\.php/);
  });

  test('hiển thị lỗi khi username không tồn tại', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('nonexistent-login-user', 'sample-password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
    await expect(page).toHaveURL(/wp-login\.php/);
  });
});
