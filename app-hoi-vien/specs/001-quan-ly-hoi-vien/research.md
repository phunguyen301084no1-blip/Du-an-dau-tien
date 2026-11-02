# Research: Quản lý hội viên 24 FIT

## 1. Lưu dữ liệu ở đâu

- **Decision**: Kho `db` của artifact claude.ai, dự phòng `localStorage`.
- **Rationale**: Không cần máy chủ, dữ liệu bền, đồng bộ giữa điện thoại và máy tính, quyền truy cập theo chia sẻ của chủ phòng (FR-010, SC-004).
- **Alternatives considered**: Google Sheets (cần kết nối và quyền riêng, chậm khi bấm điểm danh); chỉ `localStorage` (mất khi xóa trình duyệt, không đồng bộ); máy chủ riêng (trái nguyên tắc II).

## 2. Cách tính ngày hết hạn

- **Decision**: Gói theo tháng: cộng N tháng lịch rồi trừ 1 ngày; nếu ngày bắt đầu không tồn tại ở tháng đích (31 → tháng 30 ngày) thì lấy ngày cuối tháng đó. Gói theo ngày: cộng N−1 ngày (tập thử 3 ngày từ 30/10 → hết 01/11). Gia hạn khi còn hạn: bắt đầu từ ngày sau hạn cũ.
- **Rationale**: Khớp cách phòng tập ở Việt Nam thường tính ("1 tháng từ 02/11 đến hết 01/12").
- **Alternatives considered**: 30 ngày cố định (lệch với lịch, khó giải thích với khách).

## 3. Tìm kiếm tiếng Việt không dấu

- **Decision**: Chuẩn hóa NFD, bỏ dấu kết hợp, đổi đ→d, viết thường; so khớp chuỗi con trên tên và số điện thoại.
- **Rationale**: Gõ nhanh ở quầy không cần bật bộ gõ.

## 4. Chống điểm danh trùng

- **Decision**: Mã tài liệu điểm danh = `YYYY-MM-DD_<mã hội viên>`; ghi lại cùng mã không tạo bản mới.
- **Rationale**: Không cần đọc trước khi ghi, không lệ thuộc thứ tự mạng.

## 5. Mốc "sắp hết hạn" và "cần gọi chốt"

- **Decision**: Sắp hết hạn = còn 0–7 ngày. Cần gọi chốt = khách có thẻ tập thử đã hết và không có thẻ trả phí nào sau đó.
- **Rationale**: Theo spec FR-004, FR-009.
