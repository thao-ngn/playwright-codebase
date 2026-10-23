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
  // Seed the user through the API (faster and more reliable) instead of creating it through the UI.
  testUser: async ({ request }, use) => {
    const userData = {
      username: randomUsername(),
      email: randomEmail(),
      password: randomPassword(),
    };
    const created = await createUserViaApi(request, userData);

    await use({ ...userData, id: created.id });

    // Runs after the test, whether it passes or fails.
    await deleteUserViaApi(request, created.id);
  },
});

export { expect } from '@playwright/test';
