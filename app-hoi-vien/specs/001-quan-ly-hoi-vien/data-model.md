# Data Model: Quản lý hội viên 24 FIT

Mỗi thực thể là một tài liệu JSON trong một bộ sưu tập của kho dữ liệu. Ngày lưu dạng chuỗi `YYYY-MM-DD` theo giờ Việt Nam.

## hoivien/{id}
| Trường | Kiểu | Ràng buộc |
|---|---|---|
| ten | chuỗi | bắt buộc, 1–80 ký tự |
| sdt | chuỗi | tùy chọn, chỉ chữ số, 9–11 số; cảnh báo nếu trùng |
| ghichu | chuỗi | tùy chọn, ≤ 200 ký tự |
| taoLuc | số (ms) | tự điền |

## goi/{id}
| Trường | Kiểu | Ràng buộc |
|---|---|---|
| ten | chuỗi | bắt buộc |
| donVi | "ngay" \| "thang" | bắt buộc |
| soLuong | số nguyên | ≥ 1 |
| gia | số (VND) | ≥ 0 |
| thu | boolean | true = gói tập thử |
| thuTu | số | thứ tự hiển thị |

Mặc định: Tập thử 3 ngày (0 ₫, thu=true), 1 tháng (300.000 ₫), 3 tháng (800.000 ₫), 6 tháng (1.500.000 ₫), 12 tháng (2.800.000 ₫). Giá là mẫu, chủ phòng sửa.

## the/{id} (thẻ tập)
| Trường | Kiểu | Ràng buộc |
|---|---|---|
| hoivienId | chuỗi | bắt buộc |
| goiId, goiTen | chuỗi | chụp lại tên gói lúc bán |
| thu | boolean | sao từ gói |
| batDau, hetHan | ngày | hetHan ≥ batDau |
| taoLuc | số (ms) | |

## diemdanh/{YYYY-MM-DD_hoivienId}
| Trường | Kiểu |
|---|---|
| hoivienId | chuỗi |
| ngay | ngày |
| hetHanLucDo | boolean (ghi lại nếu điểm danh khi đã hết hạn) |

## thu/{id} (khoản thu)
| Trường | Kiểu | Ràng buộc |
|---|---|---|
| hoivienId, hoivienTen | chuỗi | tên chụp lại để doanh thu còn đọc được khi xóa hội viên |
| theId | chuỗi | |
| goiTen | chuỗi | |
| soTien | số (VND) | ≥ 0 |
| ngay | ngày | |

## Trạng thái hội viên (tính ra, không lưu)

```
hanCuoi = max(the.hetHan của hội viên)
không có thẻ          → "Chưa có gói"
hôm nay > hanCuoi     → "Hết hạn"   (nếu thẻ cuối là thẻ thử → thuộc "Cần gọi chốt")
thẻ còn hiệu lực là thử → "Đang tập thử"
hanCuoi − hôm nay ≤ 7 → "Sắp hết hạn"
ngược lại             → "Còn hạn"
```

## Quy tắc truy cập kho

Đọc và ghi từ mức Contributor (`interact`) trở lên; người chỉ xem không thấy dữ liệu.
