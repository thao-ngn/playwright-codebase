// Framework-agnostic: không import Playwright test/expect ở đây để có thể unit test riêng nếu cần

export function randomEmail(prefix = 'testuser'): string {
  return `${prefix}_${Date.now()}@example.com`;
}

export function randomUsername(prefix = 'user'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export function randomPassword(): string {
  return `Pw_${Math.random().toString(36).slice(2, 10)}!1`;
}

export function randomPostTitle(): string {
  return `Test Post ${Date.now()}`;
}
