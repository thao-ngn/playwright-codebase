import { test as base } from '@playwright/test';
import { randomEmail, randomUsername, randomPassword } from '@utils/data-generator';
import { createUserViaApi, deleteUserViaApi } from '@utils/api-helper';

type TestUser = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type UserFixtures = {
  testUser: TestUser;
};

export const test = base.extend<UserFixtures>({
  // Seed user qua API (nhanh, ổn định) thay vì tạo qua UI
  testUser: async ({ request }, use) => {
    const userData = {
      username: randomUsername(),
      email: randomEmail(),
      password: randomPassword(),
    };
    const created = await createUserViaApi(request, userData);

    await use({ ...userData, id: created.id });

    // Chạy sau khi test dùng xong fixture, kể cả khi test fail
    await deleteUserViaApi(request, created.id);
  },
});

export { expect } from '@playwright/test';
