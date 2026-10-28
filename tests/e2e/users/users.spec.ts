import { test, expect } from '@fixtures/index';
import { UsersPage } from '@pages/users.page';
import { randomEmail, randomUsername, randomPassword } from '@utils/data-generator';
import { requiredEnv } from '@environment/config';

test.describe('Users', () => {
  test('redirects unauthenticated users to login when opening the Users list', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goto();

    await expect(page).toHaveURL(/wp-login\.php/);
  });

  test('creates a user and changes their role', async ({ authenticatedPage }) => {
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

  test('deletes an API-seeded user and reassigns their content to the admin', async ({ authenticatedPage, testUser }) => {
    const usersPage = new UsersPage(authenticatedPage);

    await usersPage.goto();
    await usersPage.deleteUser(testUser.username, requiredEnv('ADMIN_USER'));
    await expect(authenticatedPage.getByText(testUser.username)).not.toBeVisible();
  });
});

test.describe('Users abnormal cases', () => {
  test('rejects creating a user with an invalid email address', async ({ authenticatedPage }) => {
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

  test('rejects creating a user with an existing username', async ({ authenticatedPage }) => {
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

  test('rejects creating a user with an email address that is already in use', async ({ authenticatedPage, testUser }) => {
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
});
