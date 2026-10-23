import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';
import { requiredEnv } from '@environment/config';

test.describe('Login', () => {
  test('logs in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(requiredEnv('ADMIN_USER'), requiredEnv('ADMIN_PASS'));

    await expect(page).toHaveURL(/wp-admin/);
    await dashboardPage.waitForWidgetsLoaded();
  });

  test('shows an error when the password is incorrect', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(requiredEnv('ADMIN_USER'), 'wrong-password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
  });

  test('does not log in when the username and password are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(page).toHaveURL(/wp-login\.php/);
  });

  test('does not log in when the username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', 'sample-password');

    await expect(page).toHaveURL(/wp-login\.php/);
  });

  test('shows an error when the username does not exist', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('nonexistent-login-user', 'sample-password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
    await expect(page).toHaveURL(/wp-login\.php/);
  });
});
