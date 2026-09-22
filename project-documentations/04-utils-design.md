# Utils Design

> Mục đích: liệt kê các hàm tiện ích dùng chung, tránh lặp code giữa các test.

## 1. `data-generator.ts` — sinh dữ liệu test
```ts
export function randomEmail(prefix = 'testuser'): string {
  return `${prefix}_${Date.now()}@example.com`;
}

export function randomUsername(prefix = 'user'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export function randomPostTitle(): string {
  return `Test Post ${Date.now()}`;
}
```
- Nguyên tắc: mọi dữ liệu tạo ra trong test phải **unique** (dùng timestamp/random) để tránh conflict khi chạy song song hoặc chạy lại nhiều lần.

## 2. `api-helper.ts` — gọi API để seed/cleanup dữ liệu
```ts
export async function createUserViaApi(request: APIRequestContext, userData: UserPayload) {
  const res = await request.post('/wp-json/wp/v2/users', { data: userData });
  await expect(res).toBeOK(); // assert trước khi lấy giá trị, tránh lỗi khó hiểu khi response fail
  return res.json();
}

export async function deleteUserViaApi(request: APIRequestContext, userId: number) {
  await request.delete(`/wp-json/wp/v2/users/${userId}`, {
    data: { force: true, reassign: 1 },
  });
}

export async function loginViaApi(request: APIRequestContext, username: string, password: string) {
  // Lấy token/cookie để dùng cho storageState hoặc gọi API tiếp theo
}
```
- Mục đích chính: **seed dữ liệu nhanh qua API** thay vì tạo qua UI (giúp test UI chỉ tập trung vào hành vi cần test, giảm thời gian chạy)
- Luôn cleanup (xoá) dữ liệu đã tạo trong `afterEach`/`afterAll` để tránh rác tồn đọng trên môi trường test dùng chung

## 3. `wait-helper.ts` — các hàm chờ dùng chung
```ts
export async function waitForWpNotice(page: Page, text?: string) {
  const notice = page.locator('.notice, .updated');
  await notice.waitFor({ state: 'visible' });
  if (text) await expect(notice).toContainText(text);
}
```
- Dùng cho các trường hợp WP-Admin hiện thông báo dạng banner sau khi thao tác (save, delete, update...)

## Quy tắc chung cho utils
- Không import Playwright `test`/`expect` trực tiếp vào các hàm thuần data-generator (giữ chúng framework-agnostic, dễ unit test riêng nếu cần)
- Mỗi hàm nên có kiểu dữ liệu rõ ràng (input/output types) để tránh lỗi ngầm khi dùng ở nhiều nơi
- Không đặt logic nghiệp vụ phức tạp trong utils — nếu logic gắn chặt với một trang cụ thể, nó nên nằm trong Page class (xem 03-pom-design.md)