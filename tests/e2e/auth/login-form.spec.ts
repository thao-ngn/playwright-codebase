import { expect, test } from '@playwright/test';

test.describe('Login form', () => {
  test('shows the username, password, and submit controls', async ({ page }) => {
    await page.goto('https://pw-practice-dev.playwrightvn.com/wp-login.php');

    await expect(page.getByLabel('Username or Email Address')).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });

  test('masks the password as it is entered', async ({ page }) => {
    await page.goto('https://pw-practice-dev.playwrightvn.com/wp-login.php');
    const passwordInput = page.getByLabel('Password', { exact: true });

    await passwordInput.fill('sample-password');

    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveValue('sample-password');
  });

  test('shows the remember me option and password recovery link', async ({ page }) => {
    await page.goto('https://pw-practice-dev.playwrightvn.com/wp-login.php');

    await expect(page.getByLabel('Remember Me')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Lost your password?' })).toBeVisible();
  });
});
