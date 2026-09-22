# Coding Convention

> Mục đích: thống nhất quy tắc viết code trong toàn bộ project để dễ đọc, dễ maintain.

## 1. Đặt tên
- File test: `kebab-case.spec.ts` (vd `posts-crud.spec.ts`)
- File page object: `kebab-case.page.ts`, class dùng `PascalCase` (vd `PostsPage`)
- Biến, hàm: `camelCase`
- Hằng số toàn cục: `UPPER_SNAKE_CASE`
- Locator private trong Page class: đặt tên theo phần tử, không theo hành động (vd `submitButton`, không phải `clickSubmit`)

## 2. Async/await
- Luôn dùng `await` cho mọi Playwright action (click, fill, goto...) — không bỏ sót, tránh race condition
- Không dùng `.then()` trộn với `async/await` trong cùng 1 hàm

## 3. Assertion
- Ưu tiên **web-first assertion** của Playwright: `toBeVisible()`, `toBeEnabled()`, `toHaveText()`... thay vì lấy giá trị ra rồi so sánh bằng `toEqual()`
  ```ts
  // Nên
  await expect(page.getByRole('button')).toBeVisible();

  // Tránh
  const isVisible = await page.getByRole('button').isVisible();
  expect(isVisible).toEqual(true);
  ```
- Assert response API (`toBeOK()`, status code) **trước khi** dùng giá trị từ response, để lỗi báo đúng chỗ thay vì crash mơ hồ ở dòng sau

## 4. TypeScript
- Bật `strict: true` trong `tsconfig.json`
- Hạn chế dùng `any`; nếu bắt buộc dùng definite assignment assertion (`!`), phải có comment giải thích lý do
- Định nghĩa `type`/`interface` cho mọi payload API và dữ liệu test phức tạp

## 5. Test structure
- Mỗi test độc lập, không phụ thuộc thứ tự chạy của test khác
- Dùng `test.describe` để nhóm theo chức năng, `test.beforeEach`/`afterEach` cho setup/cleanup lặp lại
- Không hard-code dữ liệu môi trường (URL, tài khoản) trong test — lấy từ `.env` qua `process.env`

## 6. Locator
- Thứ tự ưu tiên: `getByRole` > `getByLabel` > `getByText` > `getByTestId` > CSS > XPath (hạn chế tối đa)
- Không dùng locator dựa vào vị trí DOM dễ đổi (nth-child...) trừ khi không còn lựa chọn khác

## 7. Git & commit
- Nhánh: `feature/<ten-tinh-nang>`, `fix/<mo-ta-loi>`
- Commit message: dạng `<type>: <mô tả ngắn>` (vd `feat: add login page object`, `fix: flaky wait in posts test`)
- Không commit file `.env`, `node_modules`, report/output test