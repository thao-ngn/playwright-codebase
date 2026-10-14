import { expect, test } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

test.describe('Login form', () => {
  test('shows the username, password, and submit controls', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page.getByLabel('Username or Email Address')).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });

  test('masks the password as it is entered', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const passwordInput = page.getByLabel('Password', { exact: true });

    await loginPage.fillPassword('sample-password');

    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveValue('sample-password');
  });

  test('shows the remember me option and password recovery link', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page.getByLabel('Remember Me')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Lost your password?' })).toBeVisible();
  });

  test('allows the remember me option to be selected', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.setRememberMe(true);

    await expect(loginPage.rememberMeCheckboxLocator()).toBeChecked();
  });

  test('opens the password recovery form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.openPasswordRecovery();

    await expect(page).toHaveURL(/wp-login\.php\?action=lostpassword/);
    await expect(loginPage.recoveryUsernameInputLocator()).toBeVisible();
  });
});
