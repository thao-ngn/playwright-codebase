---
name: create-testscript
description: Create or update Playwright end-to-end test scripts in this TypeScript Page Object Model repository. Use when asked to add, generate, or modify a test script.
---

# Tạo Playwright test script

Tạo test script đúng cấu trúc và quy ước của repository, ưu tiên test ổn định, độc lập và dễ bảo trì.

## Trước khi viết test

1. Đọc `project-documentations/01-website-feature.md` để hiểu hành vi và rủi ro của tính năng.
2. Đọc `project-documentations/03-pom-design.md`, `project-documentations/05-fixture-design.md` và `project-documentations/06-coding-convention-design.md`.
3. Xem một test gần với chức năng cần làm trong `tests/e2e/`, Page Object tương ứng trong `pages/` và fixture cần dùng trong `fixtures/`.
4. Kiểm tra cấu hình trong `playwright.config.ts` và alias/import hiện có trước khi chọn lệnh chạy hoặc cách import.

## Vị trí và cách đặt tên

- Đặt UI end-to-end test trong `tests/e2e/<module>/`.
- Dùng tên file `kebab-case.spec.ts`, mô tả chức năng được kiểm thử, ví dụ `posts-crud.spec.ts`.
- Nhóm các test liên quan bằng `test.describe()`; mỗi `test()` chỉ kiểm tra một hành vi hoặc một luồng nghiệp vụ rõ ràng.
- Dùng tên test mô tả kết quả mong đợi. Theo ngôn ngữ và cách đặt tên hiện có trong module.

## Viết test

- Import `test` và `expect` từ `@fixtures/auth.fixture` cho luồng cần đăng nhập sẵn. Với luồng đăng nhập, xác thực thất bại hoặc cần trạng thái chưa đăng nhập, dùng fixture Playwright phù hợp như `@playwright/test`.
- Thao tác trang qua Page Object trong `pages/`. Nếu thiếu hành vi cần thiết, thêm method và locator vào Page Object phù hợp thay vì đưa chi tiết thao tác DOM vào test.
- Dùng locator ưu tiên theo thứ tự: `getByRole`, `getByLabel`, `getByText`, `getByTestId`, CSS; chỉ dùng XPath khi không có lựa chọn phù hợp.
- Luôn `await` cho thao tác bất đồng bộ của Playwright; không trộn `.then()` với `async/await`.
- Dùng web-first assertions như `toBeVisible()`, `toHaveText()`, `toHaveURL()` và `toBeEnabled()`. Tránh đọc trạng thái trước rồi so sánh thủ công.
- Mỗi test phải tự thiết lập dữ liệu và trạng thái cần thiết; không dựa vào thứ tự chạy hay dữ liệu do test khác tạo.
- Tạo dữ liệu duy nhất bằng helper hiện có trong `utils/` khi cần. Ưu tiên seed/cleanup qua API hoặc fixture hiện có; nếu test tạo dữ liệu qua UI thì dọn dẹp dữ liệu đó để không làm bẩn môi trường.
- Không hard-code URL, tài khoản hoặc bí mật môi trường trong test. Tái sử dụng biến môi trường và fixtures hiện có; không thêm hoặc ghi giá trị bí mật vào repository.
- Với các thao tác có ảnh hưởng rộng hoặc khó khôi phục (ví dụ thay đổi Settings), xác định cách khôi phục trạng thái trong cùng test/fixture trước khi triển khai.

## Mẫu cấu trúc

```ts
import { test, expect } from '@fixtures/auth.fixture';
import { PostsPage } from '@pages/posts.page';
import { randomPostTitle } from '@utils/data-generator';

test.describe('Posts', () => {
  test('tạo post mới và hiển thị trong danh sách', async ({ authenticatedPage }) => {
    const postsPage = new PostsPage(authenticatedPage);
    const title = randomPostTitle();

    await postsPage.goto();
    await postsPage.createPost(title, 'Nội dung test.');

    await postsPage.goto();
    await postsPage.searchPost(title);
    await expect(authenticatedPage.getByText(title)).toBeVisible();

    await postsPage.deletePost(title);
  });
});
```

Điều chỉnh mẫu theo module và APIs thực tế trong repository; không sao chép một luồng ví dụ khi nó không phù hợp với yêu cầu.

## Xác minh sau khi viết

1. Chạy test vừa tạo bằng `npx playwright test <đường-dẫn-file>`.
2. Nếu test cần tài khoản, trình duyệt hoặc website không khả dụng, không giả định test đã pass; nêu rõ phần chưa xác minh và lỗi/điều kiện bị thiếu.
3. Nếu không thể chạy test tích hợp, kiểm tra ít nhất test được nhận diện bằng `npx playwright test <đường-dẫn-file> --list`.
4. Báo ngắn gọn file đã thêm/sửa và kết quả xác minh.
