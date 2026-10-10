---
name: test-report
description: Generate, locate, and open the Playwright HTML test report in the report folder after tests run.
---

# Xem Playwright test report

Dùng skill này khi cần chạy test, mở HTML report, hoặc kiểm tra kết quả test trong repository.

## Tạo report

1. Kiểm tra `playwright.config.ts` để xác nhận HTML reporter đang ghi vào `report/`.
2. Chạy test theo phạm vi người dùng yêu cầu:

   ```bash
   npx playwright test
   ```

   Có thể truyền đường dẫn test hoặc các tùy chọn Playwright nếu chỉ cần chạy một phần.
3. Xác nhận lệnh chạy test đã hoàn tất. Không coi report cũ là kết quả của lần chạy hiện tại nếu test bị dừng trước khi tạo report mới.

## Mở và đọc report

- Mở report mới nhất bằng:

  ```bash
  npx playwright show-report report
  ```
- Kiểm tra tổng số test và trạng thái passed, failed, skipped; mở chi tiết các test lỗi và xem error, steps, attachments hoặc trace khi có.
- Nếu không tìm thấy `report/index.html`, nêu rõ report chưa được tạo và báo lỗi/điều kiện khiến lần chạy test không hoàn tất; không tự kết luận test đã pass.
- Không sửa hoặc xóa kết quả test để làm cho report thể hiện trạng thái thành công.

## Báo cáo kết quả

Tóm tắt lệnh chạy, trạng thái thực tế và vị trí report (`report/index.html`). Nêu riêng test thất bại, test bị bỏ qua và các giới hạn môi trường có ảnh hưởng đến kết quả.
