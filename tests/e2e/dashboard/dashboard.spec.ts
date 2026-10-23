import { test, expect } from '@fixtures/auth.fixture';
import { DashboardPage } from '@pages/dashboard.page';

test.describe('Dashboard', () => {
  test('redirects unauthenticated users to login when opening the dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.goto();

    await expect(page).toHaveURL(/wp-login\.php/);
  });

  test('shows the main widgets after login', async ({ authenticatedPage }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);

    await dashboardPage.goto();
    await dashboardPage.waitForWidgetsLoaded();

    await expect(authenticatedPage.getByText('At a Glance')).toBeVisible();
    await expect(authenticatedPage.getByText('Activity')).toBeVisible();
    await expect(authenticatedPage.getByText('Quick Draft')).toBeVisible();
    await expect(authenticatedPage.getByText('WordPress Events and News')).toBeVisible();
  });

  test('shows the input fields and save button in Quick Draft', async ({ authenticatedPage }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);

    await dashboardPage.goto();
    await dashboardPage.waitForWidgetsLoaded();

    await expect(dashboardPage.quickDraftTitleInput()).toBeVisible();
    await expect(dashboardPage.quickDraftContentInput()).toBeVisible();
    await expect(dashboardPage.quickDraftSaveButton()).toBeEnabled();
  });
});
