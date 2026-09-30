import { test, expect } from '@fixtures/auth.fixture';
import { PostsPage } from '@pages/posts.page';
import { randomPostTitle } from '@utils/data-generator';

test.describe('Posts CRUD', () => {
  test('tạo mới, tìm kiếm và xoá một post', async ({ authenticatedPage }) => {
    const postsPage = new PostsPage(authenticatedPage);
    const title = randomPostTitle();

    await postsPage.goto();
    await postsPage.createPost(title, 'Nội dung test được sinh tự động.');

    await postsPage.goto();
    await postsPage.searchPost(title);
    await expect(authenticatedPage.getByText(title)).toBeVisible();

    await postsPage.deletePost(title);
    await expect(authenticatedPage.getByText(title)).not.toBeVisible();
  });

  test('bulk delete nhiều post cùng lúc', async ({ authenticatedPage }) => {
    const postsPage = new PostsPage(authenticatedPage);
    const titles = [randomPostTitle(), randomPostTitle()];

    for (const title of titles) {
      await postsPage.goto();
      await postsPage.createPost(title, 'Nội dung test bulk delete.');
    }

    await postsPage.goto();
    await postsPage.bulkDelete(titles);

    for (const title of titles) {
      await expect(authenticatedPage.getByText(title)).not.toBeVisible();
    }
  });
});
