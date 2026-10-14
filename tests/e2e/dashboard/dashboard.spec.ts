import { test, expect } from '@fixtures/auth.fixture';
import { DashboardPage } from '@pages/dashboard.page';

test.describe('Dashboard', () => {
  test('hiển thị các widget chính sau khi đăng nhập', async ({ authenticatedPage }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);

    await dashboardPage.goto();
    await dashboardPage.waitForWidgetsLoaded();

    await expect(authenticatedPage.getByText('At a Glance')).toBeVisible();
    await expect(authenticatedPage.getByText('Activity')).toBeVisible();
    await expect(authenticatedPage.getByText('Quick Draft')).toBeVisible();
    await expect(authenticatedPage.getByText('WordPress Events and News')).toBeVisible();
  });

  test('hiển thị các trường nhập và nút lưu trong Quick Draft', async ({ authenticatedPage }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);

    await dashboardPage.goto();
    await dashboardPage.waitForWidgetsLoaded();

    await expect(dashboardPage.quickDraftTitleInput()).toBeVisible();
    await expect(dashboardPage.quickDraftContentInput()).toBeVisible();
    await expect(dashboardPage.quickDraftSaveButton()).toBeEnabled();
  });
});
