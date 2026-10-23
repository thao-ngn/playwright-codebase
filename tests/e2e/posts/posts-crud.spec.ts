import { test, expect } from '@fixtures/auth.fixture';
import { PostsPage } from '@pages/posts.page';
import { randomPostTitle } from '@utils/data-generator';

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
