import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  // Scope test-level: mỗi test một session đăng nhập mới, đơn giản và dễ debug
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await use(page);
    // Không cần cleanup, session hết hạn khi context đóng
  },
});

export { expect } from '@playwright/test';
