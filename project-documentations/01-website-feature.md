# Website Feature Analysis — WP-Admin (pw-practice-dev.playwrightvn.com)

> Purpose: Document the main WP-Admin features to test, along with observations and challenges found during exploration and manual testing. This document informs the POM (03) and Fixture (05) designs.

## 1. Login
- URL: `/wp-login.php`
- Actions: Sign in with a username and password, select "Remember Me", and recover a forgotten password.
- Notes:
  - Successful login redirects to `/wp-admin/`. Wait for network idle because the dashboard loads many widgets.
  - Three consecutive incorrect passwords may trigger rate limiting. Use isolated test data and avoid repeatedly submitting invalid credentials in CI.

## 2. Dashboard
- Widgets: "At a Glance", "Activity", "Quick Draft", and "WordPress Events and News".
- Notes:
  - Widgets load asynchronously (AJAX). Do not assert immediately after page load; wait for the specific widget to appear.
  - Users can customize widget positions by dragging and dropping. Avoid relying on fixed DOM positions.

## 3. Posts
- Actions: Create, edit, move to Trash, restore, permanently delete, search, filter by category or tag, and perform bulk actions (such as deleting multiple posts or changing their status).
- Notes:
  - The Gutenberg block editor loads more slowly than list pages; use a suitable timeout.
  - Publishing takes two steps: click "Publish" to open the confirmation panel, then click "Publish" again.

## 4. Media Library
- Actions: Upload and delete files, edit metadata (alt text and caption), and filter by file type.
- Notes:
  - Upload uses a hidden file input (`<input type="file" hidden>`); use `setInputFiles`.
  - Image resizing may take time after upload. Wait for the loading spinner to disappear before expecting the item in the grid.

## 5. Pages
- Similar to Posts, but without categories or tags. Pages also have "Page Attributes" (parent page, template, and order).

## 6. Comments
- Actions: Approve, mark as spam, reply, delete, and perform bulk actions.
- Note: A newly provisioned test environment may have no comments. Seed comments before testing.

## 7. Users
- Actions: Create users, edit profiles, change roles, delete users, and change passwords.
- Notes:
  - Deleting a user prompts whether to reassign their content to another user or delete it. Cover both cases.
  - This area has a separate API test suite (see the API documentation in `project-documentations`), so UI tests can reuse data from API tests.

## 8. Plugins
- Actions: Activate or deactivate plugins, delete plugins, and install new plugins.
- Note: Activating or deactivating a plugin may trigger a redirect or an error if plugins conflict. Avoid installing arbitrary plugins in the test environment.

## 9. Settings
- Subpages: General, Writing, Reading, Discussion, and Permalinks.
- Note: Changing Permalinks can affect every URL on the site. Test carefully and restore the default value after each test (using `afterEach`).

## Suggested Test Priorities
1. Login (the foundation for all other flows)
2. Users (API tests already exist; extend coverage to the UI)
3. Posts (core functionality with the most actions)
4. Media, Pages, and Comments
5. Plugins and Settings (higher risk and site-wide impact; test last and clean up carefully)