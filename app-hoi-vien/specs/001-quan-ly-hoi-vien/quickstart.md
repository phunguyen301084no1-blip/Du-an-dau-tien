# Quickstart: kiểm tra app hội viên

## Kiểm thử logic

```bash
cd app-hoi-vien
node --test tests/logic.test.js
```
Kỳ vọng: tất cả bài kiểm thử đạt (cộng tháng, cuối tháng, gia hạn nối tiếp, trạng thái, doanh thu, bỏ dấu).

## Đóng gói

```bash
python3 build.py   # ra dist/index.html
```

## Kiểm tra bằng tay (theo spec)

1. Tab Gói tập: thấy 5 gói mặc định.
2. Hội viên → "+ Thêm": "Nguyễn Văn A, 0901234567", gói 1 tháng → nhãn "Còn hạn", hạn = hôm nay + 1 tháng − 1 ngày.
3. Gõ "van a" ở ô tìm → ra Nguyễn Văn A.
4. Điểm danh A hai lần → chỉ một lượt hôm nay.
5. Tổng quan → thu tháng này = 300.000 ₫.
6. Thêm khách tập thử bắt đầu 3 ngày trước → nằm trong "Cần gọi chốt".
7. Mở trang trên thiết bị khác cùng tài khoản → thấy cùng dữ liệu.
