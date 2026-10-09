playwright-codebase/
├── .github/
│   ├── skills/
│   │   └── create-testscript/
│   │       └── SKILL.md
│   └── workflows/
│       └── playwright.yml
├── api/
│   └── wordpress-api.ts        # REST API helpers seed/cleanup user và post
├── environment/
│   └── config.ts               # base URL và truy cập biến môi trường
├── project-documentations/     # Tài liệu thiết kế
│   ├── 01-website-feature.md
│   ├── 02-folder-design.md
│   ├── 03-pom-design.md
│   ├── 04-utils-design.md
│   ├── 05-fixture-design.md
│   └── 06-coding-convention-design.md
├── tests/
│   ├── e2e/                    # Test UI, tổ chức theo module
│   │   ├── auth/
│   │   │   ├── login-form.spec.ts
│   │   │   ├── login.spec.ts
│   │   │   └── test.txt
│   │   ├── media/
│   │   │   └── media.spec.ts
│   │   ├── posts/
│   │   │   └── posts-crud.spec.ts
│   │   ├── settings/
│   │   │   └── settings.spec.ts
│   │   └── users/
│   │       └── users.spec.ts
│   └── example.spec.ts
├── pages/                      # Page Object Model
│   ├── base.page.ts
│   ├── dashboard.page.ts
│   ├── login.page.ts
│   ├── media.page.ts
│   ├── posts.page.ts
│   ├── settings.page.ts
│   └── users.page.ts
├── fixtures/
│   ├── auth.fixture.ts
│   ├── index.ts
│   └── user.fixture.ts
├── utils/
│   ├── api-helper.ts           # re-export API helpers tương thích
│   ├── data-generator.ts
│   └── wait-helper.ts
├── .env                        # KHÔNG push lên repo
├── .gitignore
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md

`test-data/` và `tests/api/` chưa tồn tại trong codebase hiện tại nên không được liệt kê. Report, dependencies và kết quả test được tạo tự động, không đưa vào cây source này.