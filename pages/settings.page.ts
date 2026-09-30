import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SettingsPage extends BasePage {
  private permalinkOption = (structure: string) => this.page.getByRole('radio', { name: structure });
  private customStructureInput = () => this.page.getByLabel('Custom Structure');
  private saveButton = () => this.page.getByRole('button', { name: 'Save Changes' });

  async gotoPermalinks(): Promise<void> {
    await super.goto('/wp-admin/options-permalink.php');
  }

  async updatePermalink(structure: string): Promise<void> {
    const option = this.permalinkOption(structure);
    if (await option.count()) {
      await option.check();
    } else {
      await this.permalinkOption('Custom Structure').check();
      await this.customStructureInput().fill(structure);
    }
    await this.saveButton().click();
    await expect(this.page.getByText('Permalink structure updated.')).toBeVisible();
  }

  // Đổi Permalinks ảnh hưởng toàn site nên luôn có cách khôi phục về mặc định (Plain)
  async resetToDefault(): Promise<void> {
    await this.updatePermalink('Plain');
  }
}
