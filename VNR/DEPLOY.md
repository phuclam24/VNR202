# 🚀 Hướng dẫn Deploy lên Vercel

Có **3 cách** deploy, xếp theo độ dễ:

---

## ✅ CÁCH 1: Vercel CLI (nhanh nhất — 5 phút)

Không cần GitHub, không cần đẩy code đi đâu. Vercel tự build và cho URL HTTPS ngay.

### Bước 1: Tạo tài khoản Vercel (miễn phí)
- Vào **https://vercel.com/signup**
- Đăng ký bằng **GitHub** hoặc **email** đều được
- Không cần thẻ tín dụng

### Bước 2: Cài Vercel CLI
Mở PowerShell tại thư mục dự án, chạy:

```powershell
npm install -g vercel
```

(Quá trình cài khoảng 30-60 giây)

### Bước 3: Login lần đầu

```powershell
vercel login
```

- Chọn **Continue with Email** → nhập email đã đăng ký Vercel
- Check email, copy mã xác nhận, paste vào PowerShell

### Bước 4: Deploy

Trong thư mục `C:\Users\Administrator\OneDrive\Desktop\VNR`, chạy:

```powershell
vercel
```

Vercel sẽ hỏi vài câu, **bấm Enter để chọn mặc định** hết:

```
? Set up and deploy? → Y (Yes)
? Which scope? → chọn tài khoản của bạn
? Link to existing project? → N (No)
? What's your project's name? → vnr-thuyet-trinh (Enter để lấy tên mặc định)
? In which directory is your code located? → ./  (Enter)
? Override the build settings? → N (No) - Vercel tự nhận Vite
```

Sau ~30-60 giây sẽ có URL dạng:
```
✅ Production: https://vnr-thuyet-trinh-xxx.vercel.app [copied to clipboard]
```

**Mở URL đó = bài thuyết trình của bạn chạy trên internet!**

### Bước 5: Deploy bản chính thức (production)

```powershell
vercel --prod
```

Lệnh này đưa bản dev lên thành production URL ổn định.

### Cập nhật sau này

Mỗi lần sửa code, chạy lại:
```powershell
vercel --prod
```
Vercel sẽ build lại và URL vẫn vậy, chỉ nội dung mới.

---

## ✅ CÁCH 2: Qua GitHub (chuẩn nhất, có CI/CD tự động)

Mỗi lần push code lên GitHub, Vercel tự động deploy lại.

### Bước 1: Tạo repo GitHub
- Vào **https://github.com/new**
- Đặt tên: `vnr-thuyet-trinh` (Private hoặc Public đều được)
- **KHÔNG** tick "Add README" (đã có rồi)
- Bấm **Create repository**

### Bước 2: Push code lên GitHub

Mở PowerShell tại thư mục dự án:

```powershell
git init
git add .
git commit -m "Initial commit - version 2.2"
git branch -M main
git remote add origin https://github.com/<username-cua-ban>/vnr-thuyet-trinh.git
git push -u origin main
```

(Nhập username/password GitHub khi được hỏi. Nếu dùng 2FA thì dùng Personal Access Token.)

### Bước 3: Import vào Vercel

1. Vào **https://vercel.com/new**
2. Bấm **Import Git Repository**
3. Chọn repo `vnr-thuyet-trinh` vừa tạo
4. Framework Preset: **Vite** (Vercel tự nhận)
5. Bấm **Deploy**

Sau ~1 phút có URL production. **Mỗi lần `git push`, Vercel tự deploy lại.**

---

## ✅ CÁCH 3: Drag & Drop (nhanh nhất, không cần tài khoản code)

1. Trong PowerShell tại thư mục dự án, chạy:
   ```powershell
   npm run build
   ```
   → Sinh ra folder `dist\`

2. Vào **https://vercel.com/new**
3. Kéo thả folder `dist\` vào ô "Import Project"
4. Bấm Deploy

⚠️ **Lưu ý**: Cách này chỉ deploy 1 lần. Muốn cập nhật phải build lại và upload lại.

---

## 🌐 Tên miền tùy chỉnh (nếu muốn)

Sau khi deploy, trong Vercel Dashboard → Project → **Settings → Domains**, bạn có thể:
- Dùng domain Vercel miễn phí: `vnr-thuyet-trinh.vercel.app`
- Hoặc trỏ domain riêng (ví dụ `thuyettrinh.vnr.com`) nếu có

---

## 🔧 Troubleshooting

### Lỗi "Build failed"
- Chạy `npm run build` ở local trước, nếu lỗi thì fix ở local rồi deploy lại
- Check log trong Vercel Dashboard → Deployments → click vào deployment bị fail → xem log

### Ảnh Wikimedia không hiện trên web deployed
- Kiểm tra console trình duyệt (F12)
- Ảnh Wikimedia thường không bị block, có thể chỉ là caching CDN của Vercel, refresh sau vài phút

### Sửa code xong không thấy cập nhật
- Bấm **Ctrl + Shift + R** để hard-reload trình duyệt (bypass cache)
- Hoặc vào Vercel Dashboard → Deployments → check build mới nhất có success không

---

## 📋 Tóm tắt

| Cách | Thời gian | Cần gì | Cập nhật tự động? |
|------|-----------|--------|------------------|
| Vercel CLI | 5 phút | Tài khoản Vercel | Phải chạy `vercel --prod` |
| GitHub + Vercel | 10 phút | Tài khoản GitHub + Vercel | ✅ Tự động khi push |
| Drag & Drop | 2 phút | Tài khoản Vercel | ❌ Phải upload lại |

**👉 Khuyến nghị: Cách 1 (Vercel CLI)** cho nhanh, hoặc **Cách 2 (GitHub)** nếu muốn chuẩn chỉnh.