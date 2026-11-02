# 24 FIT Apps Constitution

## Core Principles

### I. Dùng được ngay trên điện thoại
Mọi màn hình chạy tốt ở bề ngang 400 px, thao tác bằng một tay. Chữ và nút đủ lớn để bấm khi đứng ở quầy.

### II. Đơn giản trước
Một trang, không máy chủ riêng, không cài đặt. Chỉ thêm thành phần khi có yêu cầu thật trong spec (YAGNI).

### III. Không mất dữ liệu
Mọi thao tác ghi phải báo rõ đã lưu hay chưa. Xóa phải xác nhận trong app. Doanh thu đã ghi không bị đổi khi xóa hội viên.

### IV. Logic ngày và tiền phải được kiểm thử
Các hàm tính hạn, trạng thái, doanh thu là hàm thuần, có kiểm thử tự động chạy được trước khi phát hành.

### V. Tiếng Việt là mặc định
Giao diện, định dạng ngày (dd/mm/yyyy), tiền (VND) và tìm kiếm không dấu theo thói quen người Việt.

## Ràng buộc

- Chỉ lưu tên, số điện thoại, ghi chú của hội viên; không lưu thông tin nhạy cảm khác.
- Dữ liệu chỉ chủ phòng và người được chủ phòng chia sẻ mới đọc và sửa được.

## Quy trình

Spec → Plan → Tasks → Implement theo Spec Kit. Mỗi thay đổi lớn cập nhật spec trước khi sửa code.

## Governance

Constitution này đứng trên các quy ước khác của dự án. Sửa đổi phải ghi lý do và tăng phiên bản.

**Version**: 1.0.0 | **Ratified**: 2026-11-02 | **Last Amended**: 2026-11-02
