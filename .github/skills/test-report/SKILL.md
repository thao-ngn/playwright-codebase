---
name: test-report
description: Generate, locate, and open the Playwright HTML test report in the report folder after tests run.
---

# View the Playwright Test Report

Use this skill when running tests, opening the HTML report, or checking test results in the repository.

## Generate the Report

1. Check `playwright.config.ts` to confirm that the HTML reporter writes to `report/`.
2. Run the tests requested by the user:

   ```bash
   npx playwright test
   ```

   Pass a test path or Playwright options to run only a subset of tests.
3. Confirm that the test command completed. Do not treat an old report as the result of the current run if the tests stopped before generating a new report.

## Open and Read the Report

- Open the latest report with:

  ```bash
  npx playwright show-report report
  ```
- Check the total number of tests and the passed, failed, and skipped statuses. Open failed tests and inspect their errors, steps, attachments, or traces when available.
- If `report/index.html` is missing, state that the report was not generated and describe the error or condition that prevented the test run from completing. Do not assume the tests passed.
- Do not modify or delete test results to make the report show a successful status.

## Report the Results

Summarize the command run, the actual status, and the report location (`report/index.html`). Separately note failed tests, skipped tests, and any environment limitations that affected the results.
