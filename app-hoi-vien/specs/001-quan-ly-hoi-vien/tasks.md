---
description: "Task list for Quản lý hội viên 24 FIT"
---

# Tasks: Quản lý hội viên 24 FIT

**Input**: Design documents from `/specs/001-quan-ly-hoi-vien/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui.md

**Tests**: Có, cho logic ngày và tiền (constitution nguyên tắc IV).

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup

- [x] T001 Tạo cấu trúc thư mục `src/`, `tests/`, `dist/` trong app-hoi-vien/
- [x] T002 [P] Viết `build.py` ghép `src/logic.js` vào `src/app.html` → `dist/index.html`

---

## Phase 2: Foundational

**⚠️ Phải xong trước mọi user story**

- [x] T003 Viết kiểm thử `tests/logic.test.js`: cộng tháng (kể cả ngày 31), gói theo ngày, gia hạn nối tiếp, trạng thái, doanh thu theo tháng, bỏ dấu
- [x] T004 Viết `src/logic.js`: `addMonths`, `tinhHetHan`, `batDauGiaHan`, `trangThai`, `doanhThuThang`, `boDau`, `canGoiChot` cho tới khi T003 đạt
- [x] T005 Khung `src/app.html`: token màu, thanh tab dưới đáy 4 tab, thông báo "Đã lưu"/lỗi
- [x] T006 Lớp lưu trữ trong `src/app.html`: kho `db` (onSnapshot từng bộ sưu tập, hẹn giờ 10 giây) và dự phòng `localStorage`; hàm `luu`, `xoa`
- [x] T007 Tạo 5 gói mặc định khi kho trống (ghi một lần sau khi kho trả lời lần đầu)

**Checkpoint**: Kiểm thử đạt, trang mở được, đổi tab được.

---

## Phase 3: User Story 1 - Ghi hội viên và bán gói (P1) 🎯 MVP

**Goal**: Thêm hội viên, bán gói, thấy hạn và trạng thái.

**Independent Test**: Thêm A với gói 1 tháng → nhãn Còn hạn, hạn đúng.

- [x] T008 [US1] Tab Hội viên: ô tìm (không dấu), danh sách nhãn trạng thái + hạn, sắp xếp theo hạn
- [x] T009 [US1] Biểu mẫu Thêm/Sửa hội viên, cảnh báo trùng SĐT
- [x] T010 [US1] Hồ sơ hội viên: bán/gia hạn gói (ngày bắt đầu sửa được, nối tiếp nếu còn hạn), lịch sử thẻ
- [x] T011 [US1] Xóa hội viên hai bước (giữ khoản thu)

---

## Phase 4: User Story 2 - Điểm danh (P2)

**Independent Test**: Điểm danh A hai lần → một lượt; B hết hạn → cảnh báo.

- [x] T012 [US2] Tab Điểm danh: ô tìm lớn, nút Điểm danh, mã tài liệu `ngày_id` chống trùng
- [x] T013 [US2] Cảnh báo hết hạn + nút gia hạn nhanh, xác nhận vẫn ghi lượt
- [x] T014 [US2] Danh sách đã điểm danh hôm nay

---

## Phase 5: User Story 3 - Thu tiền, doanh thu (P3)

**Independent Test**: Bán 2 gói → doanh thu tháng = tổng.

- [x] T015 [US3] Ghi khoản thu khi bán gói (số tiền sửa được)
- [x] T016 [US3] Tab Tổng quan: 4 ô số (còn hạn, sắp hết, lượt hôm nay, thu tháng này so tháng trước)
- [x] T017 [P] [US3] Tab Gói tập: sửa giá, thời hạn, thêm gói

---

## Phase 6: User Story 4 - Khách tập thử (P4)

**Independent Test**: Khách thử từ 3 ngày trước → nằm trong Cần gọi chốt.

- [x] T018 [US4] Mục "Cần nhắc" ở Tổng quan: sắp hết hạn + cần gọi chốt, SĐT hiện rõ, nút Sao chép

---

## Phase 7: Polish

- [x] T019 Chế độ tối, kiểm tra 400 px, focus bàn phím
- [x] T020 Chạy `node --test`, đóng gói, xem trang, chạy quickstart.md
- [x] T021 Phát hành trang, kiểm tra kho dữ liệu, đẩy lên GitHub

## Dependencies

Setup → Foundational → US1 → (US2, US3 song song) → US4 → Polish. US4 dùng dữ liệu thẻ của US1.

## Parallel Example

T002 song song với T003. T017 song song với T015–T016 (khác khu vực giao diện).

## Implementation Strategy

MVP = Phase 1–3 (thay sổ tay ghi hạn). Sau đó thêm điểm danh, thu tiền, tập thử. Bản này làm trọn cả 7 phase trong một lần.
