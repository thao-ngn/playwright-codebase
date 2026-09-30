import { mergeTests } from '@playwright/test';
import { test as authTest } from './auth.fixture';
import { test as userTest } from './user.fixture';

// Gộp fixture để 1 file test dùng chung 1 `test` object nhưng có cả authenticatedPage và testUser
export const test = mergeTests(authTest, userTest);
export { expect } from '@playwright/test';
