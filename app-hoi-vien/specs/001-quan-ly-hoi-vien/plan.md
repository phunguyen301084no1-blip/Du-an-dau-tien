# Implementation Plan: Quản lý hội viên 24 FIT

**Branch**: `001-quan-ly-hoi-vien` | **Date**: 2026-11-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-quan-ly-hoi-vien/spec.md`

## Summary

Một trang web duy nhất (HTML + JavaScript thuần) chạy trên điện thoại, gồm 4 tab: Tổng quan, Hội viên, Điểm danh, Gói tập. Dữ liệu lưu trong kho dữ liệu riêng của trang khi chạy trên claude.ai (chỉ người được chia sẻ mới đọc/ghi); mở ngoài claude.ai thì lưu trong trình duyệt. Logic tính hạn, trạng thái và doanh thu tách thành hàm thuần, kiểm thử bằng Node.

## Technical Context

**Language/Version**: HTML5, CSS, JavaScript (ES2020), không bước build phức tạp

**Primary Dependencies**: Không có thư viện ngoài

**Storage**: Kho dữ liệu `db` của artifact claude.ai (tài liệu JSON, cập nhật tức thì giữa các thiết bị); dự phòng `localStorage` khi mở file ngoài claude.ai

**Testing**: `node --test` chạy trên các hàm thuần trong `src/logic.js`

**Target Platform**: Trình duyệt điện thoại (Safari iOS, Chrome Android) và máy tính

**Project Type**: Ứng dụng web một trang

**Performance Goals**: Mở trang và hiện danh sách < 2 giây với 500 hội viên; tìm kiếm phản hồi ngay khi gõ

**Constraints**: Một file trang, không máy chủ riêng; dùng được bằng một tay ở 400 px

**Scale/Scope**: Vài trăm hội viên, vài nghìn lượt điểm danh mỗi năm (dưới giới hạn 25.000 tài liệu)

## Constitution Check

| Nguyên tắc | Kế hoạch đáp ứng | Kết quả |
|---|---|---|
| I. Dùng được trên điện thoại | Bố cục một cột, thanh tab dưới đáy, nút ≥ 44 px | ✅ |
| II. Đơn giản trước | Một trang, không thư viện, không máy chủ | ✅ |
| III. Không mất dữ liệu | Mỗi lần ghi hiện "Đã lưu" hoặc lỗi; xóa hai bước; khoản thu tách khỏi hội viên | ✅ |
| IV. Logic được kiểm thử | `src/logic.js` + `tests/logic.test.js` | ✅ |
| V. Tiếng Việt mặc định | Giao diện tiếng Việt, `vi-VN`, tìm không dấu | ✅ |
| Ràng buộc quyền dữ liệu | Quy tắc kho: đọc và ghi từ mức Contributor trở lên | ✅ |

Kiểm tra lại sau Phase 1: không phát sinh vi phạm.

## Project Structure

### Documentation (this feature)

```text
specs/001-quan-ly-hoi-vien/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/ui.md
└── tasks.md
```

### Source Code

```text
app-hoi-vien/
├── src/
│   ├── logic.js        # hàm thuần: cộng tháng, trạng thái, doanh thu, bỏ dấu
│   └── app.html        # giao diện + lưu trữ
├── tests/
│   └── logic.test.js   # node --test
├── build.py            # ghép logic.js vào app.html → dist/index.html
└── dist/
    └── index.html      # bản phát hành một file
```

**Structure Decision**: Một dự án duy nhất. Logic tách file để kiểm thử bằng Node; bản phát hành ghép thành một file vì trang trên claude.ai là một file tự chứa.

## Complexity Tracking

Không có vi phạm cần giải trình.
