# playwright-codebase

Bộ test automation bằng [Playwright](https://playwright.dev/) cho trang **WP-Admin** tại `pw-practice-dev.playwrightvn.com/wp-admin`, viết bằng TypeScript theo mô hình Page Object Model (POM).

## Tài liệu thiết kế

Toàn bộ quá trình phân tích và thiết kế trước khi code được ghi lại trong `project-documentations/`:

| # | File | Nội dung |
|---|---|---|
| 1 | [01-website-feature.md](./project-documentations/01-website-feature.md) | Khảo sát các tính năng của website, lưu ý khi test |
| 2 | [02-folder-design.md](./project-documentations/02-folder-design.md) | Thiết kế cấu trúc thư mục project |
| 3 | [03-pom-design.md](./project-documentations/03-pom-design.md) | Thiết kế Page Object Model |
| 4 | [04-utils-design.md](./project-documentations/04-utils-design.md) | Thiết kế các hàm tiện ích (utils) |
| 5 | [05-fixture-design.md](./project-documentations/05-fixture-design.md) | Thiết kế fixture dùng trong test |
| 6 | [06-coding-convention-design.md](./project-documentations/06-coding-convention-design.md) | Coding convention dùng trong project |

## Cấu trúc thư mục

```
playwright-codebase/
├── project-documentations/   # Tài liệu thiết kế (xem bảng trên)
├── tests/                    # Test spec (e2e, api)
├── pages/                    # Page Object Model classes
├── fixtures/                 # Custom Playwright fixtures
├── utils/                    # Helper functions
├── test-data/                # Dữ liệu test tĩnh
├── .github/workflows/        # CI pipeline (GitHub Actions)
├── .env                      # Biến môi trường (KHÔNG commit)
├── playwright.config.ts
└── package.json
```

## Yêu cầu môi trường
- Node.js >= 18
- npm

## Cài đặt

```bash
git clone <repo-url>
cd playwright-codebase
npm install
npx playwright install
```

## Chạy test

```bash
# Chạy toàn bộ test
npx playwright test

# Chạy 1 file test cụ thể
npx playwright test tests/e2e/auth/login.spec.ts

# Chạy với UI mode (debug trực quan)
npx playwright test --ui

# Xem report sau khi chạy
npx playwright show-report
```

## CI/CD

Pipeline chạy tự động qua GitHub Actions, cấu hình tại [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml).

## Coding convention

[06-coding-convention-design.md](./project-documentations/06-coding-convention-design.md) - quy tắc đặt tên, async/await, assertion, locator strategy...