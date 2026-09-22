# Fixture Design

> Mục đích: thiết kế các custom fixture giúp test setup/cleanup gọn gàng, tái sử dụng session đăng nhập.

## 1. `auth.fixture.ts` — page đã đăng nhập sẵn
```ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await use(page);
    // không cần cleanup — session hết khi context đóng
  },
});

export { expect } from '@playwright/test';
```
- Scope: **test-level** (mỗi test một session mới) — đơn giản, dễ debug, đánh đổi tốc độ
- Cải tiến sau này: dùng `storageState` để lưu session đã login 1 lần, tái sử dụng cho nhiều test → giảm thời gian chạy đáng kể

## 2. `user.fixture.ts` — seed user qua API trước khi test, cleanup sau
```ts
type UserFixtures = {
  testUser: { id: number; username: string; email: string; password: string };
};

export const test = base.extend<UserFixtures>({
  testUser: async ({ request }, use) => {
    const userData = {
      username: randomUsername(),
      email: randomEmail(),
      password: 'TestPass123!',
    };
    const created = await createUserViaApi(request, userData);

    await use({ ...userData, id: created.id });

    // Cleanup: chạy sau khi test dùng xong fixture, kể cả khi test fail
    await deleteUserViaApi(request, created.id);
  },
});
```
- Scope: **test-level**, vì mỗi test thường cần user riêng để tránh đụng dữ liệu giữa các test chạy song song
- Fixture tự cleanup nhờ cơ chế `use()` của Playwright (code sau `use()` luôn chạy dù test pass/fail)

## 3. Kết hợp nhiều fixture
```ts
export const test = mergeTests(authTest, userTest);
```
- Cho phép 1 file test import 1 `test` object duy nhất nhưng có cả `authenticatedPage` và `testUser`

## Nguyên tắc chung
- Fixture nên **tự cleanup**, không để test phải nhớ xoá dữ liệu thủ công
- Ưu tiên seed dữ liệu qua **API** (nhanh, ổn định) hơn là qua UI trong fixture
- Đặt tên fixture rõ nghĩa theo "nó là cái gì" (`testUser`) chứ không phải "nó làm gì" (`createUser`)