import { Page, expect } from '@playwright/test';

// WP-Admin often displays a banner notice or toast after an action (save, delete, update, and so on).
export async function waitForWpNotice(page: Page, text?: string): Promise<void> {
  const notice = page.locator('.notice, .updated').first();
  await notice.waitFor({ state: 'visible' });
  if (text) {
    await expect(notice).toContainText(text);
  }
}

export async function waitForSpinnerToDisappear(page: Page, selector = '.spinner'): Promise<void> {
  const spinner = page.locator(selector);
  if (await spinner.count()) {
    await spinner.waitFor({ state: 'hidden' });
  }
}
