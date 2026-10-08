playwright-codebase/
├── project-documentations/     # Các file thiết kế (01-06)
├── tests/
│   ├── e2e/                    # Test UI, tổ chức theo module
│   │   ├── auth/
│   │   │   └── login.spec.ts
│   │   ├── posts/
│   │   │   └── posts-crud.spec.ts
│   │   ├── media/
│   │   ├── users/
│   │   └── settings/
│   └── api/                    # Test API (nếu có), vd user-management
│       └── users.api.spec.ts
├── api/                        # REST API client/helpers dùng để seed và cleanup
│   └── wordpress-api.ts
├── pages/                      # Page Object Model classes
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   ├── posts.page.ts
│   ├── users.page.ts
│   └── ...
├── fixtures/
│   ├── auth.fixture.ts
│   └── user.fixture.ts
├── utils/
│   ├── data-generator.ts       # sinh random email/username...
│   ├── api-helper.ts           # re-export tương thích các API helper
│   └── wait-helper.ts
├── test-data/
│   ├── users.json              # dữ liệu mẫu user, không chứa thông tin đăng nhập
│   └── posts.json              # dữ liệu mẫu post
├── environment/
│   ├── config.ts               # cấu hình URL và truy cập biến môi trường
│   ├── .env.example            # mẫu biến môi trường; copy ra .env ở root
│   └── README.md               # hướng dẫn cấu hình môi trường
├── .env                        # KHÔNG push lên repo
├── .gitignore
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md