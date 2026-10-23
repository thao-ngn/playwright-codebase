import fs from 'fs';
import os from 'os';
import path from 'path';
import { test, expect } from '@fixtures/auth.fixture';
import { MediaPage } from '@pages/media.page';

test.describe('Media Library', () => {
  test('rejects uploading a file with an unsupported format', async ({ authenticatedPage }) => {
    const mediaPage = new MediaPage(authenticatedPage);
    const filePath = path.join(os.tmpdir(), `unsupported-${Date.now()}.exe`);

    fs.writeFileSync(filePath, 'not an image');

    try {
      await mediaPage.goto();
      await mediaPage.uploadFile(filePath);

      await expect(mediaPage.uploadErrorNoticeLocator()).toBeVisible();
    } finally {
      fs.rmSync(filePath, { force: true });
    }
  });

  test('uploads a file and edits its alt text', async ({ authenticatedPage }) => {
    const mediaPage = new MediaPage(authenticatedPage);
    const fileName = `sample-${Date.now()}.png`;
    const filePath = path.join(os.tmpdir(), fileName);

    // This valid 1x1px PNG is small enough for a fast test upload.
    fs.writeFileSync(
      filePath,
      Buffer.from(
        '89504E470D0A1A0A0000000D4948445200000001000000010802000000907753DE0000000A49444154789C6360000002000155A2E3ED0000000049454E44AE426082',
        'hex',
      ),
    );

    await mediaPage.goto();
    await mediaPage.uploadFile(filePath);
    await mediaPage.editAltText(fileName, 'Sample image for automated testing');

    await expect(authenticatedPage.getByLabel('Alternative Text')).toHaveValue('Sample image for automated testing');

    await mediaPage.goto();
    await mediaPage.deleteFile(fileName);
  });
});

test.describe('Media Library access control', () => {
  test('redirects unauthenticated users to login when opening the Media Library', async ({ page }) => {
    const mediaPage = new MediaPage(page);

    await mediaPage.goto();

    await expect(page).toHaveURL(/wp-login\.php/);
  });
});
