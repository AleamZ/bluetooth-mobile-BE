# Database Schema Documentation

Tài liệu tổng hợp toàn bộ cấu trúc database cho dự án Bluetooth Mobile Backend.

## Tổng Quan

Database sử dụng **MongoDB** với **Mongoose ODM**. Tất cả các collection đều có:
- `timestamps: true` (tự động thêm `createdAt` và `updatedAt`)
- `versionKey: false` (không có `__v`)

---

## 1. User Collection

**Collection Name:** `users`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `username` | String | ✅ | ✅ | - | Tên đăng nhập |
| `password` | String | ✅ | ❌ | - | Mật khẩu (đã hash) |
| `email` | String | ❌ | ❌ | - | Email |
| `phone` | String | ❌ | ❌ | - | Số điện thoại |
| `address` | String | ❌ | ❌ | - | Địa chỉ |
| `avatar` | String | ❌ | ❌ | - | URL ảnh đại diện |
| `role` | String (Enum) | ✅ | ❌ | `CUSTOMER` | Vai trò: `admin`, `staff`, `customer` |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Enums

**RoleEnum:**
- `ADMIN = "admin"`
- `STAFF = "staff"`
- `CUSTOMER = "customer"`

---

## 2. Category Collection

**Collection Name:** `categories`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `name` | String | ✅ | ✅ | - | Tên danh mục |
| `url` | String | ✅ | ✅ | - | URL slug |
| `imageLogo` | String | ❌ | ❌ | - | URL logo |
| `isDeleted` | Boolean | ✅ | ❌ | `false` | Đã xóa (soft delete) |
| `subCategories` | Array[ObjectId] | ✅ | ❌ | `[]` | Danh sách sub categories (ref: Category) |
| `parentId` | ObjectId | ❌ | ❌ | `null` | ID category cha (ref: Category) |
| `order` | Number | ✅ | ❌ | `1` | Thứ tự hiển thị |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Relationships
- `subCategories`: Self-reference to Category
- `parentId`: Self-reference to Category

---

## 3. Brand Collection

**Collection Name:** `brands`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `name` | String | ✅ | ✅ | - | Tên thương hiệu |
| `logo` | String | ❌ | ❌ | - | URL logo |
| `isDeleted` | Boolean | ✅ | ❌ | `false` | Đã xóa (soft delete) |
| `categoryIds` | Array[ObjectId] | ✅ | ❌ | `[]` | Danh sách categories (ref: Category) |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Relationships
- `categoryIds`: References to Category

---

## 4. Product Collection

**Collection Name:** `products`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `name` | String | ✅ | ❌ | - | Tên sản phẩm |
| `categoryId` | ObjectId | ✅ | ❌ | - | ID category (ref: Category) |
| `brandId` | ObjectId | ✅ | ❌ | - | ID brand (ref: Brand) |
| `description` | String | ✅ | ❌ | `""` | Mô tả sản phẩm |
| `infoProduct` | String | ✅ | ❌ | `""` | Thông tin sản phẩm |
| `price` | Number | Conditional | ❌ | - | Giá gốc (required nếu không có variants) |
| `salePrice` | Number | ❌ | ❌ | `0` | Giá khuyến mãi |
| `stock` | Number | ✅ | ❌ | - | Tổng số lượng tồn kho |
| `status` | String (Enum) | ✅ | ❌ | `AVAILABLE` | Trạng thái sản phẩm |
| `imageThumbnailUrl` | String | ✅ | ❌ | - | URL ảnh thumbnail |
| `imageUrls` | Array[String] | ❌ | ❌ | `[]` | Danh sách URL ảnh |
| `isDeleted` | Boolean | ✅ | ❌ | `false` | Đã xóa (soft delete) |
| `variants` | Array[Variant] | ❌ | ❌ | `[]` | Danh sách biến thể |
| `specifications` | Array[Specification] | ✅ | ❌ | `[]` | Thông số kỹ thuật |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Variant Sub-Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `attributes` | Map<String, String> | ✅ | - | Thuộc tính (màu sắc, dung lượng, v.v.) |
| `price` | Number | ✅ | - | Giá của variant |
| `salePrice` | Number | ❌ | `0` | Giá khuyến mãi |
| `status` | String (Enum) | ❌ | `AVAILABLE` | Trạng thái |
| `stock` | Number | ✅ | - | Số lượng tồn kho |

### Specification Sub-Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nameGroup` | String | ✅ | Tên nhóm thông số |
| `specificationsSub` | Array[SpecificationSub] | ✅ | Danh sách thông số con |

### SpecificationSub Sub-Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | String | ✅ | Tên thông số |
| `value` | String | ✅ | Giá trị thông số |

### Enums

**ProductStatus:**
- `AVAILABLE = "available"`
- `OUT_OF_STOCK = "out_of_stock"`
- `DISCONTINUED = "discontinued"`
- `UNAVAILABLE = "UNAVAILABLE"`

### Relationships
- `categoryId`: Reference to Category
- `brandId`: Reference to Brand

### Notes
- `price` is required only if `variants` array is empty or undefined
- If product has variants, price should be set on variant level

---

## 5. ProductVariant Collection

**Collection Name:** `productvariants`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `productId` | ObjectId | ✅ | ❌ | - | ID sản phẩm (ref: Product) |
| `variantName` | String | ✅ | ❌ | - | Tên biến thể |
| `attributes` | Object | ✅ | ❌ | - | Thuộc tính (key-value pairs) |
| `quantity` | Number | ✅ | ❌ | - | Số lượng |
| `price` | Number | ✅ | ❌ | - | Giá |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Relationships
- `productId`: Reference to Product

---

## 6. ProductSpecification Collection

**Collection Name:** `productspecifications`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `categoryId` | String | ✅ | ❌ | - | ID category |
| `groupName` | String | ✅ | ❌ | - | Tên nhóm |
| `specifications` | Array[SpecificationItem] | ✅ | ❌ | `[]` | Danh sách thông số |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### SpecificationItem Sub-Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | ✅ | Auto | Primary key |
| `name` | String | ✅ | - | Tên thông số |
| `checkedFilter` | Boolean | ❌ | `false` | Được dùng để filter |

---

## 7. Order Collection

**Collection Name:** `orders`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `userId` | ObjectId | ✅ | ❌ | - | ID user (ref: User) |
| `productId` | ObjectId | ✅ | ❌ | - | ID sản phẩm (ref: Product) |
| `variantId` | ObjectId | ❌ | ❌ | - | ID variant (ref: ProductVariant) |
| `quantity` | Number | ✅ | ❌ | - | Số lượng |
| `numberCode` | String | ✅ | ✅ | - | Mã đơn hàng (unique) |
| `customerName` | String | ✅ | ❌ | - | Tên khách hàng |
| `address` | String | ✅ | ❌ | - | Địa chỉ giao hàng |
| `phone` | String | ✅ | ❌ | - | Số điện thoại |
| `totalPrice` | Number | ✅ | ❌ | - | Tổng tiền |
| `isPaid` | Boolean | ✅ | ❌ | `false` | Đã thanh toán |
| `status` | String (Enum) | ✅ | ❌ | `PENDING` | Trạng thái đơn hàng |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Enums

**StatusOrder:**
- `PENDING = "pending"`
- `APPROVED = "approved"`
- `CANCELED = "canceled"`
- `DELIVERED = "delivered"`
- `DELIVERY_FAILED = "delivery_failed"`
- `REFUNDED = "refunded"`
- `DONE = "done"`

### Relationships
- `userId`: Reference to User
- `productId`: Reference to Product
- `variantId`: Reference to ProductVariant (optional)

---

## 8. ShoppingCart Collection

**Collection Name:** `shoppingcarts`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `userId` | ObjectId | ✅ | ❌ | - | ID user (ref: User) |
| `products` | Array[CartProduct] | ✅ | ❌ | `[]` | Danh sách sản phẩm trong giỏ |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### CartProduct Sub-Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `productId` | String | ✅ | ID sản phẩm |
| `variantId` | String | ✅ | ID variant |
| `quantity` | Number | ✅ | Số lượng (min: 1) |
| `totalPrice` | Number | ✅ | Tổng tiền |

### Relationships
- `userId`: Reference to User

---

## 9. Promotion Collection

**Collection Name:** `promotions`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `nameEvent` | String | ✅ | ❌ | - | Tên sự kiện |
| `imageHeader` | String | ✅ | ❌ | - | URL ảnh header |
| `banner` | String | ✅ | ❌ | - | URL banner |
| `listProducts` | Array[String] | ✅ | ❌ | `[]` | Danh sách ID sản phẩm (ref: Product) |
| `listImageEvent` | Array[String] | ✅ | ❌ | `[]` | Danh sách URL ảnh sự kiện |
| `background` | String | ✅ | ❌ | - | Màu nền |
| `colorNavigation` | String | ✅ | ❌ | - | Màu navigation |
| `startDate` | String | ✅ | ❌ | - | Ngày bắt đầu |
| `endDate` | String | ✅ | ❌ | - | Ngày kết thúc |
| `discountType` | String (Enum) | ✅ | ❌ | - | Loại giảm giá |
| `discountPercent` | Number | Conditional | ❌ | - | Phần trăm giảm (required nếu discountType = PERCENTAGE) |
| `discountMoney` | Number | Conditional | ❌ | - | Số tiền giảm (required nếu discountType = MONEY) |
| `isShow` | Boolean | ✅ | ❌ | `false` | Hiển thị |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Enums

**DiscountType:**
- `PERCENTAGE = "percentage"`
- `MONEY = "money"`

### Relationships
- `listProducts`: References to Product

### Notes
- `discountPercent` is required if `discountType === PERCENTAGE`
- `discountMoney` is required if `discountType === MONEY`

---

## 10. Feedback Collection

**Collection Name:** `feedbacks`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `userId` | ObjectId | ✅ | ❌ | - | ID user (ref: User) |
| `productId` | ObjectId | ✅ | ❌ | - | ID sản phẩm (ref: Product) |
| `comment` | String | ✅ | ❌ | - | Nội dung đánh giá |
| `rating` | Number | ✅ | ❌ | `0` | Điểm đánh giá (0-5) |
| `image` | Array[String] | ✅ | ❌ | `[]` | Danh sách URL ảnh |
| `isHide` | Boolean | ✅ | ❌ | `false` | Ẩn đánh giá |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Relationships
- `userId`: Reference to User
- `productId`: Reference to Product

---

## 11. MainBanner Collection

**Collection Name:** `mainbanners`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `order` | Number | ✅ | ❌ | `1` | Thứ tự hiển thị |
| `url` | String | ✅ | ✅ | - | URL khi click vào banner |
| `image` | String | ✅ | ❌ | - | URL ảnh banner |
| `title` | String | ✅ | ❌ | - | Tiêu đề banner |
| `label` | String | ✅ | ❌ | - | Nhãn banner |
| `isShow` | Boolean | ✅ | ❌ | `true` | Hiển thị |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

---

## 12. SubBanner Collection

**Collection Name:** `subbanners`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `order` | Number | ✅ | ❌ | `1` | Thứ tự hiển thị |
| `url` | String | ✅ | ✅ | - | URL khi click vào banner |
| `image` | String | ✅ | ❌ | - | URL ảnh banner |
| `isShow` | Boolean | ✅ | ❌ | `true` | Hiển thị |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

---

## 13. Blog Collection

**Collection Name:** `blogs`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `title` | String | ✅ | ✅ | - | Tiêu đề bài viết |
| `content` | String | ✅ | ✅ | - | Nội dung bài viết |
| `categoryNewId` | String | ✅ | ❌ | - | ID category (ref: CategoryNew) |
| `tags` | Array[String] | ✅ | ❌ | `[]` | Danh sách tags |
| `image` | String | ✅ | ❌ | `null` | URL ảnh |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Relationships
- `categoryNewId`: Reference to CategoryNew

---

## 14. Tag Collection

**Collection Name:** `tags`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `name` | String | ✅ | ✅ | - | Tên tag |
| `numberUsed` | Number | ✅ | ❌ | `1` | Số lần sử dụng |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

---

## 15. ContentCategory Collection

**Collection Name:** `contentcategories`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `categoryId` | String | ✅ | ❌ | - | ID category |
| `content` | String | ✅ | ❌ | - | Nội dung |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

---

## 16. CategoryNew Collection

**Collection Name:** `categorynews`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `name` | String | ✅ | ✅ | - | Tên category |
| `url` | String | ✅ | ✅ | - | URL slug |
| `imageLogo` | String | ❌ | ❌ | - | URL logo |
| `isDeleted` | Boolean | ✅ | ❌ | `false` | Đã xóa (soft delete) |
| `order` | Number | ✅ | ❌ | `1` | Thứ tự hiển thị |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

---

## 17. Repair Collection

**Collection Name:** `repairs`

### Schema

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | Primary key |
| `customerId` | String | ✅ | ❌ | - | ID khách hàng |
| `phoneCustomer` | String | ✅ | ❌ | - | Số điện thoại khách hàng |
| `nameOrder` | String | ✅ | ❌ | - | Tên đơn hàng |
| `descriptionOrder` | String | ❌ | ❌ | - | Mô tả đơn hàng |
| `status` | String (Enum) | ✅ | ❌ | `NEW_ORDER` | Trạng thái |
| `expectedDate` | String | ✅ | ❌ | - | Ngày dự kiến |
| `price` | Number | ✅ | ❌ | `0` | Giá |
| `equipmentRepair` | String | ❌ | ❌ | - | Thiết bị sửa chữa |
| `createdAt` | Date | ✅ | ❌ | Auto | Ngày tạo |
| `updatedAt` | Date | ✅ | ❌ | Auto | Ngày cập nhật |

### Enums

**StatusRepair:**
- `NEW_ORDER = "new order"`
- `UNDER_REPAIR = "under repair"`
- `REPAIR_COMPLETED = "repair completed"`
- `PAYMENT = "payment"`
- `DELIVERED = "delivered"`

---

## Relationships Summary

### User
- Has many: Orders, ShoppingCarts, Feedbacks

### Category
- Has many: Products, SubCategories (self-reference), Brands
- Belongs to: Parent Category (optional)

### Brand
- Has many: Products
- Belongs to many: Categories

### Product
- Belongs to: Category, Brand
- Has many: Variants, Specifications, Orders, Feedbacks

### Order
- Belongs to: User, Product, ProductVariant (optional)

### ShoppingCart
- Belongs to: User
- Has many: Products (embedded)

### Promotion
- Has many: Products

### Feedback
- Belongs to: User, Product

### Blog
- Belongs to: CategoryNew

---

## Indexes

### Recommended Indexes

1. **User:**
   - `username` (unique)
   - `email` (if used for login)

2. **Category:**
   - `name` (unique)
   - `url` (unique)
   - `parentId` (for tree queries)

3. **Product:**
   - `categoryId`
   - `brandId`
   - `name` (text search)
   - `isDeleted`

4. **Order:**
   - `userId`
   - `numberCode` (unique)
   - `status`

5. **ShoppingCart:**
   - `userId`

---

## Migration Notes for NestJS

1. **Use @nestjs/mongoose** for Mongoose integration
2. **Use @Prop()** decorators instead of Schema definitions
3. **Use @Schema()** decorator for schema options
4. **Create DTOs** for validation using class-validator
5. **Use @Type()** from class-transformer for nested objects
6. **Consider using TypeORM** as alternative (requires schema migration)

---

## Common Patterns

1. **Soft Delete:** Most collections use `isDeleted` boolean field
2. **Timestamps:** All collections have `createdAt` and `updatedAt`
3. **Ordering:** Collections with display order use `order` field
4. **Status Enums:** Use string enums for status fields
5. **References:** Use ObjectId with `ref` for relationships





