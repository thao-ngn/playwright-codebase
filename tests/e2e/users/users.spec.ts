import { test, expect } from '@fixtures/index';
import { UsersPage } from '@pages/users.page';
import { randomEmail, randomUsername, randomPassword } from '@utils/data-generator';
import { requiredEnv } from '@environment/config';

test.describe('Users', () => {
  test('tạo mới user và đổi role', async ({ authenticatedPage }) => {
    const usersPage = new UsersPage(authenticatedPage);
    const username = randomUsername();

    await usersPage.goto();
    await usersPage.createUser({
      username,
      email: randomEmail(),
      password: randomPassword(),
      role: 'Subscriber',
    });

    await usersPage.changeRole(username, 'Editor');
    await usersPage.deleteUser(username);
  });

  test('xoá user đã seed qua API và gán nội dung cho admin', async ({ authenticatedPage, testUser }) => {
    const usersPage = new UsersPage(authenticatedPage);

    await usersPage.goto();
    await usersPage.deleteUser(testUser.username, requiredEnv('ADMIN_USER'));
    await expect(authenticatedPage.getByText(testUser.username)).not.toBeVisible();
  });
});
