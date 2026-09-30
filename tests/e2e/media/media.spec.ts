import fs from 'fs';
import os from 'os';
import path from 'path';
import { test, expect } from '@fixtures/auth.fixture';
import { MediaPage } from '@pages/media.page';

test.describe('Media Library', () => {
  test('upload file và chỉnh sửa alt text', async ({ authenticatedPage }) => {
    const mediaPage = new MediaPage(authenticatedPage);
    const fileName = `sample-${Date.now()}.png`;
    const filePath = path.join(os.tmpdir(), fileName);

    // Ảnh PNG 1x1px hợp lệ, đủ nhỏ để upload nhanh trong test
    fs.writeFileSync(
      filePath,
      Buffer.from(
        '89504E470D0A1A0A0000000D4948445200000001000000010802000000907753DE0000000A49444154789C6360000002000155A2E3ED0000000049454E44AE426082',
        'hex',
      ),
    );

    await mediaPage.goto();
    await mediaPage.uploadFile(filePath);
    await mediaPage.editAltText(fileName, 'Ảnh mẫu dùng cho test tự động');

    await expect(authenticatedPage.getByLabel('Alternative Text')).toHaveValue('Ảnh mẫu dùng cho test tự động');

    await mediaPage.goto();
    await mediaPage.deleteFile(fileName);
  });
});
