# Website Feature Analysis — WP-Admin (pw-practice-dev.playwrightvn.com)

> Mục đích: ghi lại các tính năng chính của trang WP-Admin cần test, cùng những lưu ý/khó khăn gặp phải trong quá trình khảo sát và test thử bằng tay. File này là input cho việc thiết kế POM (03) và Fixture (05).

## 1. Đăng nhập (Login)
- URL: `/wp-login.php`
- Action: đăng nhập bằng username/password, "Remember Me", quên mật khẩu
- Lưu ý:
  - Sau khi login thành công, redirect về `/wp-admin/` — cần chờ network idle vì trang load nhiều widget dashboard
  - Sai mật khẩu 3 lần liên tiếp có thể bị giới hạn (rate limit) → cần tách test data, không spam login sai trong CI

## 2. Dashboard
- Các widget: "At a Glance", "Activity", "Quick Draft", "WordPress Events and News"
- Lưu ý:
  - Các widget load bất đồng bộ (AJAX) → không nên assert ngay khi trang vừa load xong, cần đợi widget cụ thể xuất hiện
  - Vị trí widget có thể bị người dùng kéo-thả tuỳ chỉnh → không nên dựa vào vị trí DOM cố định

## 3. Posts
- Action: tạo mới, sửa, xoá (chuyển vào Trash), khôi phục, xoá vĩnh viễn, tìm kiếm, lọc theo category/tag, bulk action (xoá nhiều, đổi trạng thái nhiều)
- Lưu ý:
  - Trình soạn thảo Gutenberg (block editor) load chậm hơn các trang list — cần timeout riêng
  - Nút "Publish" có 2 bước (click Publish → hiện popup confirm → click Publish lần nữa)

## 4. Media Library
- Action: upload file, xoá file, chỉnh sửa metadata (alt text, caption), lọc theo loại file
- Lưu ý:
  - Upload dùng input file ẩn (`<input type="file" hidden>`) → cần dùng `setInputFiles`
  - Sau khi upload xong có thời gian xử lý resize ảnh (spinner loading) trước khi item xuất hiện trong grid

## 5. Pages
- Tương tự Posts nhưng không có category/tag, có thêm "Page Attributes" (parent page, template, order)

## 6. Comments
- Action: duyệt (approve), đánh dấu spam, trả lời, xoá, bulk action
- Lưu ý: danh sách comment có thể trống ở môi trường test mới dựng → cần seed dữ liệu comment trước khi test

## 7. Users
- Action: tạo user mới, sửa profile, đổi role, xoá user, đổi mật khẩu
- Lưu ý:
  - Xoá user có popup hỏi "gán lại nội dung cho user khác hay xoá luôn" → cần xử lý 2 trường hợp
  - Đây là khu vực đang có test suite API riêng (xem `project-documentations` phần API) nên phần UI có thể tái sử dụng data từ API test

## 8. Plugins
- Action: activate/deactivate, xoá plugin, cài plugin mới
- Lưu ý: activate/deactivate có thể trigger redirect hoặc thông báo lỗi nếu plugin conflict — môi trường test không nên cài plugin thật ngẫu nhiên

## 9. Settings
- Các trang con: General, Writing, Reading, Discussion, Permalinks
- Lưu ý: đổi Permalinks có thể ảnh hưởng đến toàn bộ URL của site → cẩn thận khi test, nên restore lại giá trị mặc định sau khi test (dùng `afterEach`)

## Độ ưu tiên test (đề xuất)
1. Login (nền tảng cho mọi flow khác)
2. Users (đã có sẵn API test, mở rộng sang UI)
3. Posts (chức năng lõi, nhiều thao tác nhất)
4. Media, Pages, Comments
5. Plugins, Settings (rủi ro cao, ảnh hưởng toàn site — làm sau cùng, cẩn thận cleanup)