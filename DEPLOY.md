# GDP Builder — Deploy lên Vercel (Frontend)

## Không cần backend riêng!

Game dùng **Supabase** (miễn phí) thay vì server Node.js:
- Database: PostgreSQL → lưu games, players, scores, leaderboard
- Realtime: tự động cập nhật cho tất cả người chơi khi có thay đổi
- Không cần Railway, không cần VPS, không tốn tiền

---

## Bước 1: Tạo Supabase Project

### 1.1. Đăng ký Supabase
1. Vào https://supabase.com
2. Đăng nhập bằng GitHub (miễn phí)
3. Click **New Project**
4. Đặt tên: `gdp-builder`
5. Database Password: copy lưu lại (cần cho bước sau)
6. Region: chọn gần nhất (Singapore)
7. Click **Create new project**
8. Đợi ~2 phút project tạo xong

### 1.2. Lấy credentials
Sau khi project tạo xong:
1. Vào **Settings** → **API**
2. Copy 2 giá trị:

```
Project URL:     https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 1.3. Chạy SQL Schema
1. Vào Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Copy toàn bộ nội dung file `game-client/supabase-schema.sql` paste vào
4. Click **Run**
5. Thành công → thấy dòng "Success"

### 1.4. Bật Realtime
1. Vào **Database** → **Replication**
2. Tìm bảng: `games`, `players`, `answers`, `leaderboard`
3. Enable tất cả (bật toggle)

---

## Bước 2: Deploy lên Vercel

### 2.1. Cấu hình Environment Variables
Trong Vercel project settings → **Environment Variables**:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` (URL từ bước 1.2) |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (key từ bước 1.2) |
| `VITE_ADMIN_PASSWORD` | `gdpbuilder2024` (hoặc mật khẩu tùy chỉnh) |

### 2.2. Deploy
1. Push code lên GitHub
2. Vercel tự động deploy
3. Xong! Domain: `https://your-app.vercel.app`

---

## Bước 3: Test

### Quản trò (Admin)
1. Mở `https://your-app.vercel.app/admin`
2. Nhập mật khẩu: `gdpbuilder2024`
3. Copy link phòng → gửi cho học sinh
4. Bấm **BẮT ĐẦU GAME**

### Học sinh
1. Mở link từ quản trò (VD: `https://.../?join=abc123`)
2. Nhập tên → Tham gia
3. Đợi câu hỏi

---

## Các lệnh local

```bash
# Cài đặt
cd game-client
npm install

# Chạy dev
npm run dev

# Build
npm run build
```

### Local dev (cần file .env)
```bash
# Tạo file .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASSWORD=gdpbuilder2024

# Chạy
npm run dev
```

---

## Chi phí

| Dịch vụ | Chi phí | Giới hạn |
|---|---|---|
| Vercel (Frontend) | Miễn phí | 100GB bandwidth/tháng |
| Supabase | Miễn phí | 500MB database, 2GB transfer, 50K monthly users |
| **Tổng** | **$0** | Đủ cho 1 lớp ~30 người chơi |

---

## Cách hoạt động

```
Học sinh A ──join──► Supabase (games table)
                                 │
Học sinh B ──join──► Supabase ──┼──► Realtime broadcast
                                 │    (tự động gửi cho tất cả)
Quản trò  ──start──► Supabase ──┘
```

- **Supabase Realtime**: Khi có thay đổi (player tham gia, trả lời, game kết thúc), tất cả người chơi đều nhận được ngay lập tức
- Không cần WebSocket server riêng
- Không cần polling thủ công
- Miễn phí hoàn toàn

---

## Cấu trúc thư mục

```
VNR202/
├── game-client/
│   ├── src/
│   │   ├── App.jsx         # UI chính
│   │   ├── supabase.js     # Supabase client + questions data
│   │   └── index.css       # Styles
│   ├── supabase-schema.sql # Schema để chạy trong Supabase
│   ├── package.json
│   └── vite.config.js
├── game-server/             # (Không cần nữa — xóa được)
└── DEPLOY.md               # File này
```
