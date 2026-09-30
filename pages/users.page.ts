import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export type NewUserData = {
  username: string;
  email: string;
  password: string;
  role?: string;
};

export class UsersPage extends BasePage {
  private addNewButton = () => this.page.getByRole('link', { name: 'Add New User' });
  private usernameInput = () => this.page.getByLabel('Username', { exact: true });
  private emailInput = () => this.page.getByLabel('Email', { exact: true });
  private passwordInput = () => this.page.locator('#pass1');
  private roleSelect = () => this.page.getByLabel('Role', { exact: true });
  private addUserSubmitButton = () => this.page.getByRole('button', { name: 'Add New User' });
  private userRow = (username: string) => this.page.getByRole('row', { name: username });
  private deleteLink = (username: string) => this.userRow(username).getByRole('link', { name: 'Delete' });
  private reassignRadio = () => this.page.getByLabel(/Attribute all content to/);
  private reassignSelect = () => this.page.getByLabel('Attribute all content to:');
  private confirmDeleteButton = () => this.page.getByRole('button', { name: 'Confirm Deletion' });
  private roleCheckbox = (username: string) => this.userRow(username).getByRole('checkbox');
  private changeRoleSelect = () => this.page.getByLabel('Change role to…');
  private changeButton = () => this.page.getByRole('button', { name: 'Change', exact: true });

  async goto(): Promise<void> {
    await super.goto('/wp-admin/users.php');
  }

  async createUser(userData: NewUserData): Promise<void> {
    await this.addNewButton().click();
    await this.usernameInput().fill(userData.username);
    await this.emailInput().fill(userData.email);
    await this.passwordInput().fill(userData.password);
    if (userData.role) {
      await this.roleSelect().selectOption(userData.role);
    }
    await this.addUserSubmitButton().click();
    await expect(this.page.getByText('New user created.')).toBeVisible();
  }

  // reassignTo có 2 nhánh: gán lại nội dung cho user khác, hoặc bỏ trống để xoá luôn nội dung
  async deleteUser(username: string, reassignTo?: string): Promise<void> {
    await this.userRow(username).hover();
    await this.deleteLink(username).click();
    if (reassignTo) {
      await this.reassignRadio().check();
      await this.reassignSelect().selectOption(reassignTo);
    }
    await this.confirmDeleteButton().click();
  }

  async changeRole(username: string, role: string): Promise<void> {
    await this.roleCheckbox(username).check();
    await this.changeRoleSelect().selectOption(role);
    await this.changeButton().click();
    await expect(this.page.getByText('Changed role')).toBeVisible();
  }
}
