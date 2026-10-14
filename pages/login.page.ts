import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private usernameInput = () => this.page.getByLabel('Username or Email Address');
  private passwordInput = () => this.page.getByLabel('Password', { exact: true });
  private submitButton = () => this.page.getByRole('button', { name: 'Log In' });
  private errorNotice = () => this.page.locator('#login_error');
  private rememberMeCheckbox = () => this.page.getByLabel('Remember Me');
  private lostPasswordLink = () => this.page.getByRole('link', { name: 'Lost your password?' });
  private recoveryUsernameInput = () => this.page.getByLabel('Username or Email Address');

  async goto(): Promise<void> {
    await super.goto('/wp-login.php');
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput().fill(password);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.submitButton().click();
  }

  async setRememberMe(checked: boolean): Promise<void> {
    await this.rememberMeCheckbox().setChecked(checked);
  }

  rememberMeCheckboxLocator() {
    return this.rememberMeCheckbox();
  }

  async openPasswordRecovery(): Promise<void> {
    await this.lostPasswordLink().click();
  }

  recoveryUsernameInputLocator() {
    return this.recoveryUsernameInput();
  }

  async getErrorMessage(): Promise<string> {
    await expect(this.errorNotice()).toBeVisible();
    return (await this.errorNotice().innerText()).trim();
  }
}
