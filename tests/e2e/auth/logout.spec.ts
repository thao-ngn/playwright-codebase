import { test, expect } from '@fixtures/auth.fixture';
import { DashboardPage } from '@pages/dashboard.page';

test.describe('Logout', () => {
  test('logs out and redirects unauthenticated users to login', async ({ authenticatedPage }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);

    await dashboardPage.goto();
    await expect(authenticatedPage).toHaveURL(/wp-admin/);
    await dashboardPage.waitForWidgetsLoaded();
    await dashboardPage.logout();

    await expect(authenticatedPage).toHaveURL(/wp-login\.php/);

    await dashboardPage.goto();

    await expect(authenticatedPage).toHaveURL(/wp-login\.php/);
  });
});
