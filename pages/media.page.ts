import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class MediaPage extends BasePage {
  private fileInput = () => this.page.locator('input[type="file"]');
  private uploadingSpinner = () => this.page.locator('.media-item.uploading');
  private mediaItem = (fileName: string) => this.page.locator('.media-item', { hasText: fileName });
  private deleteLink = (fileName: string) => this.mediaItem(fileName).getByRole('link', { name: 'Delete Permanently' });
  private altTextInput = () => this.page.getByLabel('Alternative Text');
  private updateButton = () => this.page.getByRole('button', { name: 'Update' });

  async goto(): Promise<void> {
    await super.goto('/wp-admin/upload.php');
  }

  async uploadFile(filePath: string): Promise<void> {
    // Input file bị ẩn nên phải dùng setInputFiles thay vì click + chọn file qua dialog OS
    await this.fileInput().setInputFiles(filePath);
    await this.uploadingSpinner().waitFor({ state: 'detached' });
  }

  async deleteFile(fileName: string): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.deleteLink(fileName).click();
    await expect(this.mediaItem(fileName)).toHaveCount(0);
  }

  async editAltText(fileName: string, text: string): Promise<void> {
    await this.mediaItem(fileName).click();
    await this.altTextInput().fill(text);
    await this.updateButton().click();
  }
}
