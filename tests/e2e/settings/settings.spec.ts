import { test, expect } from '@fixtures/auth.fixture';
import { SettingsPage } from '@pages/settings.page';

test.describe('Settings - Permalinks', () => {
  // Đổi Permalinks ảnh hưởng toàn site nên luôn khôi phục mặc định sau mỗi test
  test.afterEach(async ({ authenticatedPage }) => {
    const settingsPage = new SettingsPage(authenticatedPage);
    await settingsPage.gotoPermalinks();
    await settingsPage.resetToDefault();
  });

  test('đổi permalink structure sang Post name', async ({ authenticatedPage }) => {
    const settingsPage = new SettingsPage(authenticatedPage);

    await settingsPage.gotoPermalinks();
    await settingsPage.updatePermalink('Post name');

    await expect(authenticatedPage.getByText('Permalink structure updated.')).toBeVisible();
  });
});
