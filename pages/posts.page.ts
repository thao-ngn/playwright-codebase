import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class PostsPage extends BasePage {
  private addNewButton = () => this.page.getByRole('link', { name: 'Add New Post' });
  private titleInput = () => this.page.getByLabel('Add title');
  private contentEditor = () => this.page.locator('.block-editor-writing-flow');
  private publishButton = () => this.page.getByRole('button', { name: 'Publish', exact: true });
  private searchInput = () => this.page.getByPlaceholder('Search posts');
  private searchSubmitButton = () => this.page.getByRole('button', { name: 'Search Posts' });
  private postRow = (title: string) => this.page.getByRole('row', { name: title });
  private trashLink = (title: string) => this.postRow(title).getByRole('link', { name: 'Trash' });
  private rowCheckbox = (title: string) => this.postRow(title).getByRole('checkbox');
  private bulkActionSelect = () => this.page.getByLabel('Select bulk action');
  private applyButton = () => this.page.getByRole('button', { name: 'Apply', exact: true });

  async goto(): Promise<void> {
    await super.goto('/wp-admin/edit.php');
  }

  async createPost(title: string, content: string): Promise<void> {
    await this.addNewButton().click();
    await this.titleInput().fill(title);
    await this.contentEditor().click();
    await this.page.keyboard.type(content);

    // Nút Publish có 2 bước: click lần 1 mở panel xác nhận, click lần 2 (trong panel) mới thực sự publish
    await this.publishButton().click();
    await this.publishButton().last().click();

    await expect(this.page.getByText('Post published.')).toBeVisible();
  }

  async searchPost(keyword: string): Promise<void> {
    await this.searchInput().fill(keyword);
    await this.searchSubmitButton().click();
  }

  async deletePost(title: string): Promise<void> {
    await this.postRow(title).hover();
    await this.trashLink(title).click();
    await expect(this.page.getByText('Post moved to the Trash.')).toBeVisible();
  }

  async bulkDelete(titles: string[]): Promise<void> {
    for (const title of titles) {
      await this.rowCheckbox(title).check();
    }
    await this.bulkActionSelect().selectOption('Move to Trash');
    await this.applyButton().click();
  }
}
