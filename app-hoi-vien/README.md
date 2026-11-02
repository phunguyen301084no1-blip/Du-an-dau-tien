# App hội viên 24 FIT

Sổ quản lý hội viên cho phòng tập 24 FIT (ấp Hiệp Tâm A): gói tập, ngày hết hạn, điểm danh, thu tiền, khách tập thử cần gọi chốt.

Làm theo quy trình **Spec Kit** (Spec → Plan → Tasks → Implement):

| Bước | File |
|---|---|
| Luật chung | `.specify/memory/constitution.md` |
| Spec (làm gì, vì sao) | `specs/001-quan-ly-hoi-vien/spec.md` |
| Plan (làm bằng gì) | `specs/001-quan-ly-hoi-vien/plan.md`, `research.md`, `data-model.md` |
| Tasks (danh sách việc) | `specs/001-quan-ly-hoi-vien/tasks.md` |
| Code | `src/logic.js`, `src/app.html` → `dist/index.html` |

```bash
node --test tests/logic.test.js   # kiểm thử logic ngày và tiền
python3 build.py                  # đóng gói dist/index.html
```

Mở `dist/index.html` bằng trình duyệt để dùng thử (dữ liệu lưu trong trình duyệt). Bản chính chạy trên claude.ai, dữ liệu dùng chung nhiều máy.
