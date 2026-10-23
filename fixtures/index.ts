import { mergeTests } from '@playwright/test';
import { test as authTest } from './auth.fixture';
import { test as userTest } from './user.fixture';

// Merge fixtures so a test file can use one `test` object with both authenticatedPage and testUser.
export const test = mergeTests(authTest, userTest);
export { expect } from '@playwright/test';
