# Hướng Dẫn Migration sang NestJS

Hướng dẫn chi tiết để migrate backend từ Express + TypeScript sang NestJS.

## 📋 Mục Lục

1. [Setup NestJS Project](#1-setup-nestjs-project)
2. [Cài đặt Dependencies](#2-cài-đặt-dependencies)
3. [Cấu trúc Project](#3-cấu-trúc-project)
4. [Migration Database Models](#4-migration-database-models)
5. [Migration Controllers](#5-migration-controllers)
6. [Migration Services](#6-migration-services)
7. [Migration DTOs](#7-migration-dtos)
8. [Migration Routes](#8-migration-routes)
9. [Authentication & Authorization](#9-authentication--authorization)
10. [File Upload](#10-file-upload)

---

## 1. Setup NestJS Project

### Tạo project mới

```bash
npm i -g @nestjs/cli
nest new bluetooth-backend-nestjs
cd bluetooth-backend-nestjs
```

### Cấu trúc thư mục khuyến nghị

```
src/
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/
├── database/
│   └── schemas/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── categories/
│   ├── products/
│   ├── orders/
│   └── ...
└── main.ts
```

---

## 2. Cài đặt Dependencies

```bash
# Core NestJS
npm install @nestjs/core @nestjs/common @nestjs/platform-express

# Database
npm install @nestjs/mongoose mongoose

# Validation
npm install class-validator class-transformer

# Authentication
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install bcryptjs
npm install -D @types/bcryptjs @types/passport-jwt

# File Upload
npm install @nestjs/platform-express multer
npm install multer-storage-cloudinary cloudinary
npm install -D @types/multer

# Utilities
npm install dotenv
npm install uuid
npm install -D @types/uuid

# Socket.IO (nếu cần)
npm install @nestjs/websockets socket.io
```

---

## 3. Cấu trúc Project

### Module Structure Example

Mỗi feature sẽ có module riêng:

```
modules/
└── products/
    ├── products.module.ts
    ├── products.controller.ts
    ├── products.service.ts
    ├── dto/
    │   ├── create-product.dto.ts
    │   └── update-product.dto.ts
    └── schemas/
        └── product.schema.ts
```

---

## 4. Migration Database Models

### Ví dụ: User Schema

**File: `src/database/schemas/user.schema.ts`**

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleEnum } from '../../common/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  avatar?: string;

  @Prop({ 
    type: String, 
    enum: Object.values(RoleEnum), 
    default: RoleEnum.CUSTOMER 
  })
  role: RoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Ví dụ: Product Schema với Nested Objects

**File: `src/database/schemas/product.schema.ts`**

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductStatus } from '../../common/enums/product-status.enum';

export type ProductDocument = Product & Document;

@Schema({ _id: false })
export class Variant {
  @Prop({ type: Map, of: String, required: true })
  attributes: Map<string, string>;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  salePrice?: number;

  @Prop({ 
    type: String, 
    enum: Object.values(ProductStatus), 
    default: ProductStatus.AVAILABLE 
  })
  status?: ProductStatus;

  @Prop({ required: true })
  stock: number;
}

@Schema({ _id: false })
export class SpecificationSub {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  value: string;
}

@Schema({ _id: false })
export class Specification {
  @Prop({ required: true })
  nameGroup: string;

  @Prop({ type: [SpecificationSub], required: true })
  specificationsSub: SpecificationSub[];
}

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brandId: Types.ObjectId;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  infoProduct: string;

  @Prop({ 
    required: function() {
      return !this.variants || this.variants.length === 0;
    }
  })
  price?: number;

  @Prop({ default: 0 })
  salePrice?: number;

  @Prop({ type: [Variant] })
  variants?: Variant[];

  @Prop({ required: true })
  stock: number;

  @Prop({ 
    type: String, 
    enum: Object.values(ProductStatus), 
    default: ProductStatus.AVAILABLE 
  })
  status: ProductStatus;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ required: true })
  imageThumbnailUrl: string;

  @Prop({ type: [String] })
  imageUrls?: string[];

  @Prop({ type: [Specification], default: [] })
  specifications: Specification[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
```

---

## 5. Migration Controllers

### Ví dụ: Product Controller

**File: `src/modules/products/products.controller.ts`**

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../../common/enums/role.enum';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('get-all')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('get-active')
  findActive() {
    return this.productsService.findActive();
  }

  @Get('get-product-id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.STAFF)
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.STAFF)
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Put('delete-soft')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.STAFF)
  softDelete(@Body('id') id: string) {
    return this.productsService.softDelete(id);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.STAFF)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
```

---

## 6. Migration Services

### Ví dụ: Product Service

**File: `src/modules/products/products.service.ts`**

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../database/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findActive(): Promise<Product[]> {
    return this.productModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return updatedProduct;
  }

  async softDelete(id: string): Promise<Product> {
    return this.update(id, { isDeleted: true } as UpdateProductDto);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
```

---

## 7. Migration DTOs

### Ví dụ: Create Product DTO

**File: `src/modules/products/dto/create-product.dto.ts`**

```typescript
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../../../common/enums/product-status.enum';

class VariantDto {
  @IsNotEmpty()
  attributes: Record<string, string>;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}

class SpecificationSubDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

class SpecificationDto {
  @IsString()
  @IsNotEmpty()
  nameGroup: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecificationSubDto)
  specificationsSub: SpecificationSubDto[];
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  brandId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  infoProduct?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @IsOptional()
  variants?: VariantDto[];

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsString()
  @IsNotEmpty()
  imageThumbnailUrl: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecificationDto)
  @IsOptional()
  specifications?: SpecificationDto[];
}
```

---

## 8. Migration Routes

Routes trong NestJS được định nghĩa trong `@Controller()` decorator, không cần file routes riêng.

### Main App Module

**File: `src/app.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
// ... other modules

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductsModule,
    CategoriesModule,
    // ... other modules
  ],
})
export class AppModule {}
```

---

## 9. Authentication & Authorization

### JWT Strategy

**File: `src/modules/auth/strategies/jwt.strategy.ts`**

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username, role: payload.role };
  }
}
```

### JWT Auth Guard

**File: `src/modules/auth/guards/jwt-auth.guard.ts`**

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### Roles Guard

**File: `src/modules/auth/guards/roles.guard.ts`**

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../../common/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### Roles Decorator

**File: `src/modules/auth/decorators/roles.decorator.ts`**

```typescript
import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../../common/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
```

---

## 10. File Upload

### Upload Module

**File: `src/modules/upload/upload.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MulterModule.register({
      storage: cloudinaryStorage({
        cloudinary: {
          v2: cloudinary.v2,
        },
        params: {
          folder: 'WEBBLUETOOTH',
          allowedFormats: ['jpg', 'png', 'jpeg'],
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
```

### Upload Controller

**File: `src/modules/upload/upload.controller.ts`**

```typescript
import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadSingle(file);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images', 10))
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadMultiple(files);
  }
}
```

---

## 📝 Checklist Migration

- [ ] Setup NestJS project
- [ ] Cài đặt tất cả dependencies
- [ ] Tạo database schemas cho tất cả models
- [ ] Migration tất cả DTOs
- [ ] Migration tất cả services
- [ ] Migration tất cả controllers
- [ ] Setup authentication & authorization
- [ ] Setup file upload
- [ ] Setup CORS
- [ ] Setup error handling
- [ ] Setup validation pipes
- [ ] Test tất cả endpoints
- [ ] Update environment variables
- [ ] Deploy

---

## 🔗 Tài Liệu Tham Khảo

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Mongoose](https://docs.nestjs.com/techniques/mongodb)
- [Class Validator](https://github.com/typestack/class-validator)
- [Class Transformer](https://github.com/typestack/class-transformer)





