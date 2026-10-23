import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { requiredEnv } from '@environment/config';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  // Test-level scope: each test gets a new login session, which is simple and easy to debug.
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(requiredEnv('ADMIN_USER'), requiredEnv('ADMIN_PASS'));
    await use(page);
    // No cleanup is needed; the session expires when the context closes.
  },
});

export { expect } from '@playwright/test';
