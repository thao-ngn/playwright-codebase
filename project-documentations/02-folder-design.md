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
│   ├── api-helper.ts           # gọi API để seed/cleanup data
│   └── wait-helper.ts
├── test-data/
│   └── users.json
├── .env                        # KHÔNG push lên repo
├── .gitignore
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md