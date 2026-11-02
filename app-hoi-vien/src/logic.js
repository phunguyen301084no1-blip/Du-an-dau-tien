/* Hàm thuần cho app hội viên 24 FIT. Ngày dạng "YYYY-MM-DD". */
(function (root) {
  const pad = (n) => String(n).padStart(2, "0");
  const toISO = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
  const parse = (s) => s.split("-").map(Number);
  const daysIn = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();

  function addDays(s, n) {
    const [y, m, d] = parse(s);
    const t = new Date(Date.UTC(y, m - 1, d + n));
    return toISO(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
  }
  function addMonths(s, n) {
    const [y, m, d] = parse(s);
    const total = y * 12 + (m - 1) + n;
    const ny = Math.floor(total / 12), nm = (total % 12) + 1;
    return toISO(ny, nm, Math.min(d, daysIn(ny, nm)));
  }
  function soNgay(a, b) {
    const [y1, m1, d1] = parse(a), [y2, m2, d2] = parse(b);
    return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
  }
  function tinhHetHan(batDau, goi) {
    if (goi.donVi === "ngay") return addDays(batDau, Math.max(1, goi.soLuong) - 1);
    return addDays(addMonths(batDau, goi.soLuong), -1);
  }
  const hanCuoi = (the) => the.reduce((mx, t) => (!mx || t.hetHan > mx ? t.hetHan : mx), null);
  function batDauGiaHan(the, homNay) {
    const h = hanCuoi(the);
    return h && h >= homNay ? addDays(h, 1) : homNay;
  }
  function trangThai(the, homNay) {
    if (!the.length) return { ma: "chua", nhan: "Chưa có gói", han: null };
    const han = hanCuoi(the);
    if (homNay > han) return { ma: "het", nhan: "Hết hạn", han, con: soNgay(homNay, han) };
    const dangChay = the.filter((t) => t.batDau <= homNay && t.hetHan >= homNay);
    const conLai = soNgay(homNay, han);
    if (dangChay.length && dangChay.every((t) => t.thu) && the.every((t) => t.thu || t.hetHan < homNay))
      return { ma: "thu", nhan: "Đang tập thử", han, con: conLai };
    if (conLai <= 7) return { ma: "sap", nhan: "Sắp hết hạn", han, con: conLai };
    return { ma: "con", nhan: "Còn hạn", han, con: conLai };
  }
  function canGoiChot(the, homNay) {
    const thu = the.filter((t) => t.thu);
    if (!thu.length) return false;
    const traPhi = the.some((t) => !t.thu);
    return !traPhi && hanCuoi(thu) < homNay;
  }
  const doanhThuThang = (ds, ym) => ds.filter((x) => (x.ngay || "").startsWith(ym)).reduce((s, x) => s + (Number(x.soTien) || 0), 0);
  function thangTruoc(ym) {
    const [y, m] = ym.split("-").map(Number);
    return m === 1 ? `${y - 1}-12` : `${y}-${pad(m - 1)}`;
  }
  const boDau = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase().trim();
  function khop(hv, q) {
    const k = boDau(q);
    if (!k) return true;
    const so = k.replace(/\s+/g, "");
    if (/^\d+$/.test(so) && (hv.sdt || "").includes(so)) return true;
    return boDau(hv.ten).includes(k);
  }
  const ngayVN = (s) => { if (!s) return ""; const [y, m, d] = parse(s); return `${pad(d)}/${pad(m)}/${y}`; };
  const tien = (n) => (Math.round(Number(n) || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  function homNayVN(now) {
    const t = new Date((now || Date.now()) + 7 * 3600000);
    return toISO(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
  }

  const api = { addDays, addMonths, soNgay, tinhHetHan, hanCuoi, batDauGiaHan, trangThai, canGoiChot, doanhThuThang, thangTruoc, boDau, khop, ngayVN, tien, homNayVN };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.L = api;
})(typeof window !== "undefined" ? window : globalThis);
