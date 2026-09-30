import { Page } from '@playwright/test';
import { waitForWpNotice } from '@utils/wait-helper';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForToast(message?: string): Promise<void> {
    await waitForWpNotice(this.page, message);
  }
}
