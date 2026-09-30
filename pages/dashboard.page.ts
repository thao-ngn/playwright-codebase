import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private atAGlanceWidget = () => this.page.locator('#dashboard_right_now');
  private activityWidget = () => this.page.locator('#dashboard_activity');
  private quickDraftWidget = () => this.page.locator('#dashboard_quick_press');

  async goto(): Promise<void> {
    await super.goto('/wp-admin/');
  }

  // Các widget load bất đồng bộ (AJAX) nên chờ từng widget xuất hiện thay vì chờ chung load state
  async waitForWidgetsLoaded(): Promise<void> {
    await expect(this.atAGlanceWidget()).toBeVisible();
    await expect(this.activityWidget()).toBeVisible();
    await expect(this.quickDraftWidget()).toBeVisible();
  }
}
