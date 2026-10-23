import { test, expect } from '@fixtures/auth.fixture';
import { SettingsPage } from '@pages/settings.page';

test.describe('Settings', () => {
  test.afterEach(async ({ authenticatedPage }) => {
    const settingsPage = new SettingsPage(authenticatedPage);
    await settingsPage.gotoPermalinks();
    await settingsPage.resetToDefault();
  });

  test('changes the permalink structure to Post name', async ({ authenticatedPage }) => {
    const settingsPage = new SettingsPage(authenticatedPage);

    await settingsPage.gotoPermalinks();
    await settingsPage.updatePermalink('Post name');

    await expect(authenticatedPage.getByText('Permalink structure updated.')).toBeVisible();
  });

  test('changes the permalink structure to Day and name', async ({ authenticatedPage }) => {
    const settingsPage = new SettingsPage(authenticatedPage);

    await settingsPage.gotoPermalinks();
    await settingsPage.updatePermalink('Day and name');

    await expect(authenticatedPage.getByText('Permalink structure updated.')).toBeVisible();
  });

  test('removes invalid characters from the custom permalink structure', async ({ authenticatedPage }) => {
    const settingsPage = new SettingsPage(authenticatedPage);

    await settingsPage.gotoPermalinks();
    await settingsPage.updatePermalink('/%postname%!/');

    await expect(settingsPage.customStructureInputLocator()).toHaveValue('/%postname%/');
  });
});

test.describe('Settings access control', () => {
  test('redirects unauthenticated users to login when opening Permalinks', async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.gotoPermalinks();

    await expect(page).toHaveURL(/wp-login\.php/);
  });
});
