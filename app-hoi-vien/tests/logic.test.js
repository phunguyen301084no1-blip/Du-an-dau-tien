const test = require("node:test");
const assert = require("node:assert/strict");
const L = require("../src/logic.js");

test("cộng tháng thường", () => {
  assert.equal(L.tinhHetHan("2026-11-02", { donVi: "thang", soLuong: 1 }), "2026-12-01");
  assert.equal(L.tinhHetHan("2026-11-02", { donVi: "thang", soLuong: 3 }), "2027-02-01");
  assert.equal(L.tinhHetHan("2026-01-01", { donVi: "thang", soLuong: 12 }), "2026-12-31");
});

test("ngày 31 sang tháng ít ngày", () => {
  assert.equal(L.addMonths("2026-01-31", 1), "2026-02-28");
  assert.equal(L.addMonths("2028-01-31", 1), "2028-02-29");
  assert.equal(L.tinhHetHan("2026-01-31", { donVi: "thang", soLuong: 1 }), "2026-02-27");
});

test("gói theo ngày", () => {
  assert.equal(L.tinhHetHan("2026-10-30", { donVi: "ngay", soLuong: 3 }), "2026-11-01");
  assert.equal(L.tinhHetHan("2026-12-31", { donVi: "ngay", soLuong: 1 }), "2026-12-31");
});

test("gia hạn nối tiếp khi còn hạn, từ hôm nay khi hết hạn", () => {
  const the = [{ hetHan: "2026-11-20" }];
  assert.equal(L.batDauGiaHan(the, "2026-11-02"), "2026-11-21");
  assert.equal(L.batDauGiaHan([{ hetHan: "2026-10-01" }], "2026-11-02"), "2026-11-02");
  assert.equal(L.batDauGiaHan([], "2026-11-02"), "2026-11-02");
});

test("trạng thái", () => {
  const h = "2026-11-02";
  assert.equal(L.trangThai([], h).ma, "chua");
  assert.equal(L.trangThai([{ hetHan: "2026-12-01", thu: false, batDau: "2026-11-02" }], h).ma, "con");
  assert.equal(L.trangThai([{ hetHan: "2026-11-09", thu: false, batDau: "2026-10-10" }], h).ma, "sap");
  assert.equal(L.trangThai([{ hetHan: "2026-11-02", thu: false, batDau: "2026-10-03" }], h).ma, "sap");
  assert.equal(L.trangThai([{ hetHan: "2026-11-01", thu: false, batDau: "2026-10-02" }], h).ma, "het");
  assert.equal(L.trangThai([{ hetHan: "2026-11-03", thu: true, batDau: "2026-11-01" }], h).ma, "thu");
});

test("cần gọi chốt", () => {
  const h = "2026-11-02";
  assert.equal(L.canGoiChot([{ hetHan: "2026-11-01", thu: true, batDau: "2026-10-30" }], h), true);
  assert.equal(L.canGoiChot([{ hetHan: "2026-11-01", thu: true, batDau: "2026-10-30" }, { hetHan: "2026-12-01", thu: false, batDau: "2026-11-02" }], h), false);
  assert.equal(L.canGoiChot([{ hetHan: "2026-11-03", thu: true, batDau: "2026-11-01" }], h), false);
});

test("doanh thu theo tháng", () => {
  const thu = [{ soTien: 300000, ngay: "2026-11-02" }, { soTien: 250000, ngay: "2026-11-30" }, { soTien: 800000, ngay: "2026-10-15" }];
  assert.equal(L.doanhThuThang(thu, "2026-11"), 550000);
  assert.equal(L.doanhThuThang(thu, "2026-10"), 800000);
  assert.equal(L.thangTruoc("2026-01"), "2025-12");
});

test("bỏ dấu tiếng Việt", () => {
  assert.equal(L.boDau("Nguyễn Văn Đạt"), "nguyen van dat");
  assert.ok(L.khop({ ten: "Nguyễn Văn A", sdt: "0901234567" }, "van a"));
  assert.ok(L.khop({ ten: "Nguyễn Văn A", sdt: "0901234567" }, "090 123"));
  assert.ok(!L.khop({ ten: "Trần B", sdt: "0911" }, "van"));
});

test("số ngày còn lại và định dạng", () => {
  assert.equal(L.soNgay("2026-11-02", "2026-11-09"), 7);
  assert.equal(L.ngayVN("2026-11-02"), "02/11/2026");
  assert.equal(L.tien(300000), "300.000 ₫");
});
