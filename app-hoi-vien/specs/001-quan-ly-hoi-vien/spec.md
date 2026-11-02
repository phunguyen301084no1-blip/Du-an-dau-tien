# Feature Specification: Quản lý hội viên 24 FIT

**Feature Branch**: `001-quan-ly-hoi-vien`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "App quản lý hội viên cho phòng tập 24 FIT (ấp Hiệp Tâm A): hội viên, gói tập, ngày hết hạn, điểm danh, thu tiền. Có chương trình tập thử 3 ngày."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ghi hội viên và bán gói tập (Priority: P1)

Chủ phòng tập thêm một người mới (tên, số điện thoại), chọn gói tập (1 tháng, 3 tháng, tập thử 3 ngày…), và app tự tính ngày hết hạn. Danh sách hội viên cho thấy ai còn hạn, ai sắp hết, ai đã hết.

**Why this priority**: Đây là lý do chính để có app: biết ai đang tập và hạn đến bao giờ, thay cho sổ tay.

**Independent Test**: Thêm một hội viên với gói 1 tháng bắt đầu hôm nay, thấy họ trong danh sách với ngày hết hạn đúng và nhãn "Còn hạn".

**Acceptance Scenarios**:

1. **Given** chưa có hội viên nào, **When** chủ phòng nhập "Nguyễn Văn A, 0901234567" và chọn gói 1 tháng từ 02/11/2026, **Then** danh sách hiện A với hạn 01/12/2026 và nhãn "Còn hạn".
2. **Given** A còn 5 ngày, **When** mở danh sách, **Then** A mang nhãn "Sắp hết hạn" và nằm trong mục cần nhắc.
3. **Given** A đã hết hạn, **When** chủ phòng gia hạn thêm gói 1 tháng, **Then** hạn mới tính từ hôm nay; nếu còn hạn thì cộng nối tiếp vào hạn cũ.
4. **Given** có 50 hội viên, **When** gõ "090" hoặc "Văn A" vào ô tìm, **Then** chỉ còn những người khớp.

---

### User Story 2 - Điểm danh nhanh ở quầy (Priority: P2)

Khi hội viên tới, chủ phòng tìm tên hoặc số điện thoại và bấm "Điểm danh". App báo ngay người đó còn hạn hay không.

**Why this priority**: Việc làm nhiều lần mỗi ngày; giúp phát hiện người hết hạn vẫn tới tập.

**Independent Test**: Điểm danh một hội viên còn hạn và một người hết hạn; thấy lượt tập ghi lại và cảnh báo cho người hết hạn.

**Acceptance Scenarios**:

1. **Given** A còn hạn, **When** bấm Điểm danh, **Then** lượt tập hôm nay được ghi và hiện "Đã điểm danh".
2. **Given** B hết hạn, **When** bấm Điểm danh, **Then** app cảnh báo "Hết hạn" và gợi ý gia hạn; vẫn cho ghi lượt nếu chủ phòng xác nhận.
3. **Given** A đã điểm danh hôm nay, **When** bấm lại, **Then** không ghi trùng.

---

### User Story 3 - Thu tiền và xem doanh thu tháng (Priority: P3)

Mỗi lần bán hoặc gia hạn gói, app ghi khoản thu theo giá gói (sửa được nếu giảm giá). Trang tổng quan cho thấy doanh thu tháng này và tháng trước.

**Why this priority**: Biết tiền vào mà không cần sổ riêng; cần sau khi đã có hội viên và gói.

**Independent Test**: Bán 2 gói trong tháng, thấy tổng doanh thu tháng bằng tổng 2 khoản.

**Acceptance Scenarios**:

1. **Given** gói 1 tháng giá 300.000 ₫, **When** bán cho A, **Then** khoản thu 300.000 ₫ được ghi ngày hôm nay.
2. **Given** chủ phòng giảm còn 250.000 ₫, **When** lưu, **Then** khoản thu ghi 250.000 ₫.
3. **Given** có khoản thu trong tháng 11, **When** mở tổng quan, **Then** thấy doanh thu tháng 11 và số gói đã bán.

---

### User Story 4 - Theo dõi khách tập thử 3 ngày (Priority: P4)

Khách tập thử được ghi với gói "Tập thử 3 ngày" (0 ₫). Sau khi hết 3 ngày, họ hiện trong mục "Cần gọi chốt" kèm số điện thoại để chủ phòng liên hệ mời đăng ký.

**Why this priority**: Chương trình tập thử 3 ngày là ưu đãi chính đang quảng cáo; theo dõi giúp chuyển khách thử thành hội viên.

**Independent Test**: Ghi một khách tập thử từ 3 ngày trước, thấy họ trong mục "Cần gọi chốt".

**Acceptance Scenarios**:

1. **Given** khách C tập thử từ 30/10, **When** mở app ngày 02/11, **Then** C nằm trong "Cần gọi chốt".
2. **Given** C đã mua gói 1 tháng, **When** mở app, **Then** C không còn trong "Cần gọi chốt".

---

### Edge Cases

- Số điện thoại trùng với hội viên đã có: cảnh báo, gợi ý mở hồ sơ cũ thay vì tạo mới.
- Gia hạn khi còn hạn: hạn mới nối tiếp từ ngày hết hạn cũ, không mất ngày.
- Gói theo tháng bắt đầu ngày 31: hết hạn ngày cuối của tháng sau nếu tháng đó ít ngày hơn.
- Xóa hội viên: phải xác nhận trong app; lịch sử thu tiền vẫn giữ để doanh thu không đổi.
- Mất mạng hoặc kho dữ liệu không trả lời: báo rõ "chưa lưu được", không âm thầm mất dữ liệu.
- Tên tiếng Việt có dấu: tìm kiếm khớp cả khi gõ không dấu ("van a" tìm ra "Văn A").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Chủ phòng MUST thêm, sửa, xóa hội viên với tên (bắt buộc), số điện thoại, ghi chú.
- **FR-002**: App MUST có danh sách gói tập sửa được (tên, thời hạn theo ngày hoặc tháng, giá); mặc định có Tập thử 3 ngày (0 ₫), 1 tháng, 3 tháng, 6 tháng, 12 tháng.
- **FR-003**: Khi bán gói, app MUST tự tính ngày hết hạn; gia hạn khi còn hạn thì nối tiếp hạn cũ.
- **FR-004**: Mỗi hội viên MUST mang một trạng thái: Còn hạn, Sắp hết hạn (≤ 7 ngày), Hết hạn, Đang tập thử.
- **FR-005**: App MUST cho tìm hội viên theo tên (có hoặc không dấu) hoặc số điện thoại.
- **FR-006**: App MUST ghi lượt điểm danh, mỗi người tối đa một lượt mỗi ngày, và cảnh báo khi người đó hết hạn.
- **FR-007**: Mỗi lần bán hoặc gia hạn gói MUST tạo một khoản thu (số tiền sửa được, ngày, gói, hội viên).
- **FR-008**: Trang tổng quan MUST hiện: số hội viên còn hạn, số sắp hết hạn, lượt tập hôm nay, doanh thu tháng này và tháng trước.
- **FR-009**: App MUST có mục "Cần nhắc" gồm người sắp hết hạn và khách tập thử đã quá 3 ngày chưa mua gói, kèm số điện thoại hiện rõ để sao chép.
- **FR-010**: Dữ liệu MUST được lưu bền và chỉ người được chủ phòng chia sẻ mới xem hoặc sửa được.
- **FR-011**: App MUST dùng tốt trên điện thoại (màn hình hẹp khoảng 400 px) bằng một tay.

### Key Entities

- **Hội viên**: một người tập; tên, số điện thoại, ghi chú, ngày tạo.
- **Gói tập**: loại vé bán ra; tên, thời hạn (số ngày hoặc số tháng), giá mặc định.
- **Thẻ tập**: một lần bán gói cho một hội viên; gói, ngày bắt đầu, ngày hết hạn. Hạn hiện tại của hội viên là ngày hết hạn xa nhất trong các thẻ.
- **Lượt điểm danh**: hội viên, ngày.
- **Khoản thu**: số tiền, ngày, hội viên, thẻ tập liên quan.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Thêm một hội viên mới kèm gói tập mất dưới 30 giây.
- **SC-002**: Điểm danh một người (tìm + bấm) mất dưới 5 giây.
- **SC-003**: Chủ phòng trả lời được "tháng này thu bao nhiêu" và "ai sắp hết hạn" chỉ bằng một màn hình, không cần cộng tay.
- **SC-004**: Không mất dữ liệu khi đóng app và mở lại trên thiết bị khác.
- **SC-005**: 100% khách tập thử quá 3 ngày xuất hiện trong mục cần gọi chốt.

## Assumptions

- Người dùng chính là chủ phòng tập (một người hoặc vài nhân viên được chia sẻ quyền), không phải hội viên tự dùng.
- Giá gói chưa biết: app có giá mẫu, chủ phòng sửa lại theo giá thật.
- Tiền tệ VND, ngày theo định dạng Việt Nam (dd/mm/yyyy), giờ Việt Nam.
- Quy mô vài trăm hội viên, vài chục lượt tập mỗi ngày.
- Chưa cần: gửi tin nhắn tự động, thanh toán online, hội viên tự đặt lịch, quản lý huấn luyện viên. Có thể làm ở bản sau.
- Không lưu thông tin nhạy cảm ngoài tên và số điện thoại.
