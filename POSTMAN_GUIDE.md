# Hướng Dẫn Sử Dụng Postman Collection

## 📦 Tệp Tin Đã Tạo

1. **Bluetooth-Backend.postman_collection.json** - Collection chứa tất cả các API endpoints
2. **Bluetooth-Backend.postman_environment.json** - Environment variables cho local và production

## 🚀 Cách Import vào Postman

### Bước 1: Import Collection

1. Mở Postman
2. Click **Import** (góc trên bên trái)
3. Chọn file `Bluetooth-Backend.postman_collection.json`
4. Click **Import**

### Bước 2: Import Environment

1. Click **Import** lần nữa
2. Chọn file `Bluetooth-Backend.postman_environment.json`
3. Click **Import**

### Bước 3: Chọn Environment

1. Ở góc trên bên phải, click dropdown **Environments**
2. Chọn **Bluetooth Backend Environment**

## 🔧 Cấu Hình Environment

### Local Development

Mặc định environment đã được set:
- `base_url`: `http://localhost:5000`
- `auth_token`: (sẽ được tự động lưu sau khi login)

### Production

Để chuyển sang production:

1. Click vào **Environments** → **Bluetooth Backend Environment**
2. Sửa `base_url_production` thành URL Cloudflare Tunnel của bạn
3. Tạo environment mới hoặc duplicate và đổi `base_url` thành `base_url_production`

## 🔐 Authentication

### Cách Lấy Token

1. Mở folder **Authentication** trong collection
2. Chạy request **Login** với email và password hợp lệ
3. Token sẽ tự động được lưu vào biến `auth_token` (nhờ Test Script)
4. Các request khác sẽ tự động sử dụng token này

### Manual Token Setup

Nếu muốn set token thủ công:

1. Click vào **Environments** → **Bluetooth Backend Environment**
2. Tìm biến `auth_token`
3. Paste token vào value
4. Save

## 📋 Các Endpoints Chính

### 1. Authentication
- `POST /register` - Đăng ký user mới
- `POST /login` - Đăng nhập (tự động lưu token)
- `POST /register/admin` - Đăng ký admin (cần token)
- `POST /register/staff` - Đăng ký staff (cần token)

### 2. Category
- `GET /category/get-all` - Lấy tất cả categories
- `GET /category/get-active` - Lấy categories đang active
- `GET /category/get-format-menu` - Lấy format menu
- `GET /category/get-category/:categoryId` - Lấy category theo ID
- `POST /category/create` - Tạo category mới (cần token + ADMIN/STAFF)
- `PUT /category/update` - Cập nhật category (cần token + ADMIN/STAFF)

### 3. Product
- `GET /product/get-all` - Lấy tất cả products
- `GET /product/get-active` - Lấy products đang active
- `GET /product/get-product-id/:productId` - Lấy product theo ID
- `GET /product/search?keyword=...` - Tìm kiếm products
- `POST /product/get-filter` - Lọc products
- `POST /product/create` - Tạo product mới (cần token + ADMIN/STAFF)
- `PUT /product/update/:productId` - Cập nhật product (cần token + ADMIN/STAFF)

### 4. Brand
- `GET /brand/get-all` - Lấy tất cả brands
- `GET /brand/get-active` - Lấy brands đang active
- `POST /brand/create` - Tạo brand mới (cần token + ADMIN/STAFF)

### 5. Order
- `POST /order/create` - Tạo order mới (cần token)
- `PUT /order/approve` - Duyệt order (cần token + ADMIN/STAFF)
- `PUT /order/cancel` - Hủy order (cần token)
- `PUT /order/delivery` - Giao hàng (cần token + ADMIN/STAFF)
- `PUT /order/done` - Hoàn thành order (cần token + ADMIN/STAFF)

### 6. Shopping Cart
- `POST /shopping/add-to-cart` - Thêm vào giỏ hàng (cần token)
- `POST /shopping/remove-from-cart` - Xóa khỏi giỏ hàng (cần token)

### 7. Upload
- `POST /upload/single` - Upload 1 ảnh
- `POST /upload/multiple` - Upload nhiều ảnh

### 8. Promotion
- `GET /promotion/get-active` - Lấy promotions đang active
- `POST /promotion/create` - Tạo promotion mới
- `PUT /promotion/update/:promotionId` - Cập nhật promotion
- `DELETE /promotion/delete/:promotionId` - Xóa promotion

## 💡 Tips & Tricks

### 1. Sử dụng Variables trong URL

Thay vì hardcode ID, bạn có thể:
- Tạo biến trong environment: `product_id`, `category_id`
- Sử dụng trong URL: `{{base_url}}/product/get-product-id/{{product_id}}`

### 2. Pre-request Scripts

Thêm script để tự động set giá trị:

```javascript
// Ví dụ: Set random product ID
pm.environment.set("product_id", "507f1f77bcf86cd799439011");
```

### 3. Test Scripts

Kiểm tra response và tự động set variables:

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.data && jsonData.data.id) {
        pm.environment.set("last_created_id", jsonData.data.id);
    }
}
```

### 4. Collection Runner

Chạy nhiều requests cùng lúc:
1. Click **Collections** → Chọn collection
2. Click **Run** (góc trên)
3. Chọn requests muốn chạy
4. Click **Run Bluetooth Mobile Backend API**

## 🔍 Debugging

### Xem Request/Response

1. Mở **Console** trong Postman (View → Show Postman Console)
2. Chạy request
3. Xem chi tiết request headers, body, response

### Kiểm Tra Token

1. Mở **Environments** → **Bluetooth Backend Environment**
2. Kiểm tra giá trị `auth_token`
3. Nếu rỗng, chạy lại request **Login**

## 📝 Lưu Ý

1. **Token Expiry**: Token có thể hết hạn, cần login lại
2. **CORS**: Đảm bảo backend đã config CORS đúng
3. **File Upload**: Khi upload ảnh, chọn tab **Body** → **form-data** → chọn file
4. **Environment Variables**: Luôn check environment đang active

## 🆘 Troubleshooting

### Lỗi 401 Unauthorized
- Kiểm tra token có hợp lệ không
- Chạy lại request **Login** để lấy token mới

### Lỗi 403 Forbidden
- Kiểm tra user có đủ quyền (ADMIN/STAFF) không
- Đăng nhập bằng tài khoản có quyền phù hợp

### Lỗi 404 Not Found
- Kiểm tra `base_url` trong environment
- Kiểm tra endpoint path có đúng không

### Lỗi CORS
- Đảm bảo backend đang chạy
- Kiểm tra CORS config trong `src/index.ts`

## 📚 Tài Liệu Tham Khảo

- [Postman Documentation](https://learning.postman.com/docs/)
- [Postman Variables](https://learning.postman.com/docs/sending-requests/variables/)
- [Postman Scripts](https://learning.postman.com/docs/writing-scripts/intro-to-scripts/)


