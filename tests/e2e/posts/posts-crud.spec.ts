import { test, expect } from '@fixtures/auth.fixture';
import { test as unauthenticatedTest } from '@playwright/test';
import { PostsPage } from '@pages/posts.page';
import { randomPostTitle, randomUsername } from '@utils/data-generator';

test.describe('Posts', () => {
  test('creates, searches for, and deletes a post', async ({ authenticatedPage }) => {
    const postsPage = new PostsPage(authenticatedPage);
    const title = randomPostTitle();

    await postsPage.goto();
    await postsPage.createPost(title, 'Automatically generated test content.');

    await postsPage.goto();
    await postsPage.searchPost(title);
    await expect(authenticatedPage.getByText(title)).toBeVisible();

    await postsPage.deletePost(title);
    await expect(authenticatedPage.getByText(title)).not.toBeVisible();
  });

  test('bulk deletes multiple posts', async ({ authenticatedPage }) => {
    const postsPage = new PostsPage(authenticatedPage);
    const titles = [randomPostTitle(), randomPostTitle()];

    for (const title of titles) {
      await postsPage.goto();
      await postsPage.createPost(title, 'Bulk delete test content.');
    }

    await postsPage.goto();
    await postsPage.bulkDelete(titles);

    for (const title of titles) {
      await expect(authenticatedPage.getByText(title)).not.toBeVisible();
    }
  });
});

test.describe('Posts abnormal cases', () => {
  test('shows an empty state when a search has no matching posts', async ({ authenticatedPage }) => {
    const postsPage = new PostsPage(authenticatedPage);
    const missingTitle = `${randomPostTitle()} ${randomUsername()}`;

    await postsPage.goto();
    await postsPage.searchPost(missingTitle);

    await expect(postsPage.noPostsFoundMessageLocator()).toBeVisible();
  });

  unauthenticatedTest('redirects unauthenticated users to login when opening the Posts list', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();

    await expect(page).toHaveURL(/wp-login\.php/);
  });
});
