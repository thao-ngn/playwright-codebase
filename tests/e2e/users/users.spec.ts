import { test, expect } from '@fixtures/index';
import { UsersPage } from '@pages/users.page';
import { randomEmail, randomUsername, randomPassword } from '@utils/data-generator';
import { requiredEnv } from '@environment/config';

test.describe('Users', () => {
  test('chuyển người dùng chưa đăng nhập về login khi mở danh sách Users', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goto();

    await expect(page).toHaveURL(/wp-login\.php/);
  });

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

  test('từ chối tạo user với email sai định dạng', async ({ authenticatedPage }) => {
    const usersPage = new UsersPage(authenticatedPage);

    await usersPage.goto();
    await usersPage.attemptCreateUser({
      username: randomUsername(),
      email: 'invalid-email',
      password: randomPassword(),
      role: 'Subscriber',
    });

    await expect(usersPage.emailInputLocator()).toHaveAttribute('type', 'email');
    await expect(authenticatedPage).toHaveURL(/user-new\.php/);
    await expect(authenticatedPage.getByText('New user created.')).not.toBeVisible();
  });

  test('từ chối tạo user với username đã tồn tại', async ({ authenticatedPage }) => {
    const usersPage = new UsersPage(authenticatedPage);

    await usersPage.goto();
    await usersPage.attemptCreateUser({
      username: requiredEnv('ADMIN_USER'),
      email: randomEmail(),
      password: randomPassword(),
      role: 'Subscriber',
    });

    await expect(usersPage.creationErrorNoticeLocator()).toBeVisible();
  });

  test('từ chối tạo user với email đã được sử dụng', async ({ authenticatedPage, testUser }) => {
    const usersPage = new UsersPage(authenticatedPage);

    await usersPage.goto();
    await usersPage.attemptCreateUser({
      username: randomUsername(),
      email: testUser.email,
      password: randomPassword(),
      role: 'Subscriber',
    });

    await expect(usersPage.creationErrorNoticeLocator()).toBeVisible();
  });

  test('xoá user đã seed qua API và gán nội dung cho admin', async ({ authenticatedPage, testUser }) => {
    const usersPage = new UsersPage(authenticatedPage);

    await usersPage.goto();
    await usersPage.deleteUser(testUser.username, requiredEnv('ADMIN_USER'));
    await expect(authenticatedPage.getByText(testUser.username)).not.toBeVisible();
  });
});
