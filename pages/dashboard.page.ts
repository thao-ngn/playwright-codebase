import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private atAGlanceWidget = () => this.page.locator('#dashboard_right_now');
  private activityWidget = () => this.page.locator('#dashboard_activity');
  private quickDraftWidget = () => this.page.locator('#dashboard_quick_press');
  private eventsWidget = () => this.page.locator('#dashboard_primary');
  private accountMenu = () => this.page.getByRole('link', { name: /^Howdy,/ });
  private logoutLink = () => this.page.getByRole('link', { name: 'Log Out' });

  async goto(): Promise<void> {
    await super.goto('/wp-admin/');
  }

  async logout(): Promise<void> {
    await this.accountMenu().hover();
    await this.logoutLink().click();
  }

  quickDraftTitleInput() {
    return this.quickDraftWidget().getByPlaceholder('Title');
  }

  quickDraftContentInput() {
    return this.quickDraftWidget().getByPlaceholder('Content');
  }

  quickDraftSaveButton() {
    return this.quickDraftWidget().getByRole('button', { name: 'Save Draft' });
  }

  // Widgets load asynchronously (AJAX), so wait for each widget instead of relying on a general page load state.
  async waitForWidgetsLoaded(): Promise<void> {
    await expect(this.atAGlanceWidget()).toBeVisible();
    await expect(this.activityWidget()).toBeVisible();
    await expect(this.quickDraftWidget()).toBeVisible();
    await expect(this.eventsWidget()).toBeVisible();
  }
}
