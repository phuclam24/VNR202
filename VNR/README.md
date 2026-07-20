# Bài thuyết trình — Đảng lãnh đạo Việt Nam hội nhập và phát triển (2001 – nay)

Ứng dụng web thuyết trình **long-form scrollytelling** xây bằng **React + Vite**, thiết kế theo phong cách **"Prestige Scholar"** (Burgundy + Brass Gold trên nền Alabaster), dành cho bài thuyết trình môn **Lịch sử Đảng Cộng sản Việt Nam**.

---

## 🎯 Đặc điểm (phiên bản 2.2)

- **Trang web dài, dạng scrollytelling** — người xem cuộn xuống để đọc toàn bộ nội dung
- **Sidebar cố định bên trái** với anchor menu, nhảy nhanh giữa các phần
- **5 phần nội dung** theo đúng dàn ý giáo trình + cập nhật 2024
- **Phân chia cho 3 người trình bày** (mapping trong code, không hiển thị trên web):
  - **Người A** — Phần 1 (Bối cảnh) + Phần 2 (Hội nhập quốc tế)
  - **Người B** — Phần 3 (Phát triển nội lực)
  - **Người C** — Phần 4 (Vị thế) + Phần 5 (Bài học & Tổng kết)
- **5 ảnh minh họa Wikimedia Commons chất lượng cao**, chọn theo đúng chủ đề từng phần:
  - Hero: Tháp Rùa, Hồ Hoàn Kiếm
  - Phần 1: Bến Nhà Rồng
  - Phần 2: Trụ sở WTO Geneva
  - Phần 3: Ruộng bậc thang Sa Pa
  - Phần 4: Skyline TP.HCM về đêm
  - Phần 5: Quốc kỳ Việt Nam
- **Theme Prestige Scholar** — Burgundy + Brass Gold + Alabaster — font Playfair Display + Be Vietnam Pro
- **Responsive** — đẹp trên desktop, tablet, mobile

---

## 🚀 Deploy lên Vercel

**👉 Xem hướng dẫn chi tiết từng bước trong [`DEPLOY.md`](./DEPLOY.md)** — có 3 cách (CLI / GitHub / Drag&Drop), kèm troubleshooting.

Tóm tắt nhanh:

```powershell
# Cách nhanh nhất: Vercel CLI
npm install -g vercel
vercel login
vercel --prod
```

URL sẽ là `https://vnr-thuyet-trinh.vercel.app`.

> File `vercel.json` đã có sẵn rewrites cho SPA.

---

## 💻 Chạy local

```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # production build vào dist/
npm run preview    # test bản build
```

---

## 📂 Cấu trúc thư mục

```
VNR/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── README.md
├── DEPLOY.md                 # Hướng dẫn deploy chi tiết
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css        # Theme Prestige Scholar + layout
    ├── data/
    │   ├── presentation.js   # Nội dung 5 phần + metadata
    │   └── images.js         # Danh sách ảnh Wikimedia
    └── components/
        ├── Icons.jsx         # Bộ icon SVG nội bộ
        ├── SmartImage.jsx    # Component ảnh có placeholder
        ├── Sidebar.jsx       # Menu cố định bên trái
        ├── Hero.jsx          # Phần mở đầu
        └── Sections.jsx      # 5 phần nội dung
```

---

## 📚 Tham khảo giáo trình

- Giáo trình Lịch sử Đảng Cộng sản Việt Nam — Chương 3, II, mục 2 (trang 310–393)
- Nội dung được tổng hợp qua NotebookLM từ các nguồn học thuật chính thống