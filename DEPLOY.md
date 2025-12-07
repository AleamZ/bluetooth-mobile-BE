# Hướng Dẫn Deploy Backend lên Server với PM2 và Cloudflare Tunnel

## Mục Lục
1. [Kết nối và chuẩn bị Server](#phần-1--kết-nối-và-chuẩn-bị-server)
2. [Clone Backend & Cài Dependency](#phần-2--clone-backend--cài-dependency)
3. [Tạo File .ENV](#phần-3--tạo-file-env)
4. [Build & Chạy Backend](#phần-4--build--chạy-backend)
5. [Chạy Backend vĩnh viễn bằng PM2](#phần-5--chạy-backend-vĩnh-viễn-bằng-pm2)
6. [Public Backend ra HTTPS bằng Cloudflare Tunnel](#phần-6--public-backend-ra-https-bằng-cloudflare-tunnel-free)
7. [Chạy Cloudflare Tunnel vĩnh viễn bằng PM2](#phần-7--chạy-cloudflare-tunnel-vĩnh-viễn-bằng-pm2)
8. [Kết nối Vercel và Fix CORS](#phần-8--kết-nối-vercel-và-fix-cors)
9. [Check Log & Quản lý Hệ thống](#phần-9--check-log--quản-lý-hệ-thống)

---

## PHẦN 1 — KẾT NỐI VÀ CHUẨN BỊ SERVER

### 1. Kết nối SSH vào server

Trên máy Windows mở **CMD / PowerShell**:

```bash
ssh root@223.130.11.14
```

Nhập mật khẩu → vào được server.

### 2. Update hệ thống

```bash
apt update && apt upgrade -y
```

### 3. Cài NodeJS & npm (khuyến nghị Node 18+)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
```

**Kiểm tra:**

```bash
node -v
npm -v
```

### 4. Cài Git

```bash
apt install git -y
```

---

## PHẦN 2 — CLONE BACKEND & CÀI DEPENDENCY

### 5. Clone source code backend

```bash
git clone <link-repo-backend>
cd Bluetooth-Web-Backend
```

> **Lưu ý:** Thay `<link-repo-backend>` bằng link repository thực tế của bạn.

### 6. Cài thư viện

```bash
npm install
```

---

## PHẦN 3 — TẠO FILE .ENV

### 7. Tạo file .env

```bash
nano .env
```

**Ví dụ nội dung:**

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=super_secret_key_change_this_in_production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Lưu:**
- `CTRL + O` → `Enter`
- `CTRL + X`

**Kiểm tra:**

```bash
ls -la | grep .env
cat .env
```

---

## PHẦN 4 — BUILD & CHẠY BACKEND

### 8. Build TypeScript

```bash
npm run build
```

Kiểm tra thư mục `dist/` đã được tạo:

```bash
ls -la dist/
```

### 9. Test chạy dev (tùy chọn)

```bash
npm run dev
```

Nếu lỗi types → fix module hoặc thêm file `.d.ts`.

---

## PHẦN 5 — CHẠY BACKEND VĨNH VIỄN BẰNG PM2

### 10. Cài PM2

```bash
npm install -g pm2
```

### 11. Chạy backend bằng PM2

**Cách 1: Sử dụng ecosystem.config.js (Khuyến nghị)**

```bash
npm run pm2:start
```

**Cách 2: Chạy trực tiếp**

```bash
pm2 start dist/index.js --name bluetooth-backend
```

**Lưu cấu hình PM2:**

```bash
pm2 save
pm2 startup
```

Copy dòng lệnh PM2 đưa ra → dán chạy tiếp → rồi:

```bash
pm2 save
```

**Kiểm tra:**

```bash
pm2 status
```

✅ Nếu thấy `bluetooth-backend` là **online** là OK.

### 12. Test API local

```bash
curl http://localhost:5000/category/get-format-menu
```

✅ Ra JSON = backend OK.

---

## PHẦN 6 — PUBLIC BACKEND RA HTTPS BẰNG CLOUDFLARE TUNNEL (FREE)

### 13. Cài Cloudflared

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared-linux-amd64.deb
```

**Kiểm tra:**

```bash
cloudflared --version
```

### 14. Test chạy tunnel thủ công

```bash
cloudflared tunnel --url http://localhost:5000
```

Sẽ hiện:

```
https://xxxxx.trycloudflare.com
```

**Test:**

```bash
curl https://xxxxx.trycloudflare.com/category/get-format-menu
```

✅ Nếu ra JSON là OK.

> **Lưu ý:** Domain này sẽ thay đổi mỗi lần restart. Để có domain cố định, cần setup Cloudflare Tunnel với domain riêng.

---

## PHẦN 7 — CHẠY CLOUDFLARE TUNNEL VĨNH VIỄN BẰNG PM2

### 15. Tạo file script tunnel

```bash
cd ~
nano cloudflared-tunnel.sh
```

**Dán vào:**

```bash
#!/bin/bash
# Script để chạy Cloudflare Tunnel và lưu URL vào file
cloudflared tunnel --url http://localhost:5000 2>&1 | tee ~/cloudflare-tunnel.log | grep -oP 'https://[a-zA-Z0-9-]+\.trycloudflare\.com' | head -1 > ~/cloudflare-url.txt &
```

**Hoặc đơn giản hơn (khuyến nghị):**

```bash
#!/bin/bash
cloudflared tunnel --url http://localhost:5000
```

> **Lưu ý:** URL sẽ xuất hiện trong logs khi tunnel khởi động. Xem phần 17 để biết cách lấy URL.

**Lưu → phân quyền:**

```bash
chmod +x cloudflared-tunnel.sh
```

### 16. Chạy tunnel bằng PM2

```bash
pm2 start ~/cloudflared-tunnel.sh --name cloudflare-tunnel --interpreter bash
pm2 save
pm2 startup
```

Copy dòng lệnh PM2 đưa ra → chạy → rồi:

```bash
pm2 save
```

### 17. Kiểm tra tunnel và lấy URL

**Bước 1: Kiểm tra tunnel đang chạy**

```bash
pm2 status
```

✅ Nếu thấy `cloudflare-tunnel` là **online** là OK.

**Bước 2: Xem logs để tìm URL**

```bash
pm2 logs cloudflare-tunnel --lines 100
```

Hoặc xem logs real-time:

```bash
pm2 logs cloudflare-tunnel --raw
```

**Bước 3: Tìm URL trong logs**

URL thường xuất hiện với format `https://xxxxx.trycloudflare.com`. Tìm bằng cách:

```bash
pm2 logs cloudflare-tunnel | grep -i "trycloudflare"
```

Hoặc xem toàn bộ logs và tìm dòng có chứa `https://`:

```bash
pm2 logs cloudflare-tunnel --lines 200 | grep "https://"
```

**Bước 4: Nếu không thấy URL trong logs**

Có thể URL chỉ xuất hiện khi tunnel khởi động. Thử restart và xem logs ngay:

```bash
pm2 restart cloudflare-tunnel
pm2 logs cloudflare-tunnel --lines 50 --raw
```

**Bước 5: Cách khác - Chạy tunnel trực tiếp để lấy URL**

Nếu vẫn không thấy, chạy tunnel trực tiếp một lần để lấy URL:

```bash
# Stop tunnel trong PM2 tạm thời
pm2 stop cloudflare-tunnel

# Chạy tunnel trực tiếp để xem URL
cloudflared tunnel --url http://localhost:5000
```

Sẽ hiện URL ngay, ví dụ:
```
+--------------------------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable): |
|  https://xxxxx.trycloudflare.com                                                           |
+--------------------------------------------------------------------------------------------+
```

**Copy URL này**, sau đó:
- Nhấn `CTRL + C` để dừng
- Chạy lại với PM2:

```bash
pm2 start cloudflare-tunnel
pm2 save
```

✅ Đây là domain backend HTTPS chính thức.

---

## PHẦN 8 — KẾT NỐI VERCEL VÀ FIX CORS

### 18. Cập nhật CORS trong Backend

Đảm bảo file `src/index.ts` có cấu hình CORS đúng:

```typescript
const corsOptions = {
  origin: [
    "https://www.bluetoothmobile.vn",
    "http://localhost:5173",
    "https://bluetooth-mobile-fe-git-main-aleamzs-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
```

**Rebuild và restart:**

```bash
npm run build
pm2 restart bluetooth-backend
```

### 19. Đổi API trên frontend (Vercel)

Từ:

```
http://223.130.11.14:5000
```

Thành:

```
https://meaningful-dee-variations-macintosh.trycloudflare.com
```

Push code → Redeploy Vercel.

✅ Hết lỗi:
- `strict-origin-when-cross-origin`
- `CORS`
- `Mixed content`

---

## PHẦN 9 — CHECK LOG & QUẢN LÝ HỆ THỐNG

### 20. Xem log backend

```bash
pm2 logs bluetooth-backend
```

Xem log real-time:

```bash
pm2 logs bluetooth-backend --lines 100
```

### 21. Xem log Cloudflare tunnel

```bash
pm2 logs cloudflare-tunnel
```

### 22. Restart khi cần

```bash
pm2 restart bluetooth-backend
pm2 restart cloudflare-tunnel
```

### 23. Các lệnh PM2 hữu ích khác

**Xem thông tin chi tiết:**

```bash
pm2 info bluetooth-backend
pm2 monit
```

**Stop/Start:**

```bash
pm2 stop bluetooth-backend
pm2 start bluetooth-backend
```

**Xóa khỏi PM2:**

```bash
pm2 delete bluetooth-backend
```

**Xem tất cả processes:**

```bash
pm2 list
```

---

## ✅ TỔNG KẾT SAU KHI HOÀN TẤT

| Hạng mục | Trạng thái |
|----------|------------|
| Backend NodeJS | ✅ Online |
| PM2 | ✅ Auto restart |
| Cloudflare Tunnel | ✅ HTTPS Active |
| CORS | ✅ Configured |
| Frontend Integration | ✅ Connected |

---

## 🔧 Troubleshooting

### Backend không start

1. Kiểm tra log:
   ```bash
   pm2 logs bluetooth-backend --err
   ```

2. Kiểm tra port đã được sử dụng:
   ```bash
   netstat -tulpn | grep 5000
   ```

3. Kiểm tra file .env:
   ```bash
   cat .env
   ```

### Cloudflare Tunnel không hoạt động

1. Kiểm tra backend đang chạy:
   ```bash
   curl http://localhost:5000
   ```

2. Kiểm tra tunnel có đang chạy:
   ```bash
   pm2 status cloudflare-tunnel
   ```

3. Restart tunnel:
   ```bash
   pm2 restart cloudflare-tunnel
   ```

4. Xem log chi tiết:
   ```bash
   pm2 logs cloudflare-tunnel --lines 100
   ```

5. Tìm URL trong logs:
   ```bash
   pm2 logs cloudflare-tunnel | grep -i "trycloudflare\|https://"
   ```

6. Nếu không thấy URL, chạy tunnel trực tiếp để debug:
   ```bash
   pm2 stop cloudflare-tunnel
   cloudflared tunnel --url http://localhost:5000
   ```
   (Sau khi thấy URL, nhấn CTRL+C và chạy lại với PM2)

### Không thấy URL Cloudflare Tunnel trong PM2 logs

**Giải pháp 1: Xem logs với nhiều dòng hơn**
```bash
pm2 logs cloudflare-tunnel --lines 200
```

**Giải pháp 2: Tìm URL bằng grep**
```bash
pm2 logs cloudflare-tunnel | grep "https://.*trycloudflare"
```

**Giải pháp 3: Xem logs real-time khi restart**
```bash
pm2 restart cloudflare-tunnel
pm2 logs cloudflare-tunnel --raw
```

**Giải pháp 4: Chạy tunnel trực tiếp để lấy URL**
```bash
pm2 stop cloudflare-tunnel
cloudflared tunnel --url http://localhost:5000
# Copy URL hiển thị, sau đó CTRL+C và chạy lại với PM2
pm2 start cloudflare-tunnel
```

### CORS Error

1. Kiểm tra origin trong `src/index.ts`
2. Rebuild và restart:
   ```bash
   npm run build
   pm2 restart bluetooth-backend
   ```

---

## 📝 Lưu ý Quan Trọng

1. **Domain Cloudflare Tunnel:** Domain `trycloudflare.com` sẽ thay đổi mỗi lần restart. Để có domain cố định, cần đăng ký Cloudflare account và setup tunnel với domain riêng.

2. **Bảo mật:** 
   - Đổi `JWT_SECRET` thành giá trị mạnh trong production
   - Không commit file `.env` lên Git
   - Giới hạn CORS origin chỉ các domain cần thiết

3. **Monitoring:** 
   - Thường xuyên check log để phát hiện lỗi sớm
   - Setup monitoring tool nếu cần (PM2 Plus, New Relic, etc.)

4. **Backup:** 
   - Backup file `.env` và database định kỳ
   - Lưu lại các cấu hình quan trọng

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- Log PM2: `pm2 logs`
- Log hệ thống: `journalctl -u pm2-root`
- Network: `netstat -tulpn`

