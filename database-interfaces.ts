/**
 * Database Interfaces for NestJS Migration
 * 
 * This file contains all TypeScript interfaces matching the MongoDB schema.
 * Use these interfaces when migrating to NestJS with @nestjs/mongoose
 */

import { Document, Types } from 'mongoose';

// ============================================================================
// ENUMS
// ============================================================================

export enum RoleEnum {
  ADMIN = 'admin',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

export enum ProductStatus {
  AVAILABLE = 'available',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued',
  UNAVAILABLE = 'UNAVAILABLE',
}

export enum StatusOrder {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELED = 'canceled',
  DELIVERED = 'delivered',
  DELIVERY_FAILED = 'delivery_failed',
  REFUNDED = 'refunded',
  DONE = 'done',
}

export enum DiscountType {
  PERCENTAGE = 'percentage',
  MONEY = 'money',
}

export enum StatusRepair {
  NEW_ORDER = 'new order',
  UNDER_REPAIR = 'under repair',
  REPAIR_COMPLETED = 'repair completed',
  PAYMENT = 'payment',
  DELIVERED = 'delivered',
}

// ============================================================================
// SUB-INTERFACES
// ============================================================================

export interface Variant {
  attributes: Record<string, string>;
  price: number;
  salePrice?: number;
  status?: ProductStatus;
  stock: number;
}

export interface SpecificationSub {
  key: string;
  value: string;
}

export interface Specification {
  nameGroup: string;
  specificationsSub: SpecificationSub[];
}

export interface CartProduct {
  productId: string;
  variantId: string;
  quantity: number;
  totalPrice: number;
}

export interface SpecificationItem {
  _id?: Types.ObjectId;
  name: string;
  checkedFilter: boolean;
}

// ============================================================================
// MAIN INTERFACES
// ============================================================================

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  url: string;
  imageLogo?: string;
  isDeleted: boolean;
  subCategories: Types.ObjectId[];
  parentId: Types.ObjectId | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrand extends Document {
  _id: Types.ObjectId;
  name: string;
  logo?: string;
  isDeleted: boolean;
  categoryIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  categoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  description: string;
  infoProduct: string;
  price?: number;
  salePrice?: number;
  variants?: Variant[];
  stock: number;
  status: ProductStatus;
  isDeleted: boolean;
  imageThumbnailUrl: string;
  imageUrls?: string[];
  specifications: Specification[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductVariant extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  variantName: string;
  attributes: Record<string, string>;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductSpecification extends Document {
  _id: Types.ObjectId;
  categoryId: string;
  groupName: string;
  specifications: SpecificationItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId?: Types.ObjectId;
  quantity: number;
  numberCode: string;
  customerName: string;
  address: string;
  phone: string;
  totalPrice: number;
  isPaid: boolean;
  status: StatusOrder;
  createdAt: Date;
  updatedAt: Date;
}

export interface IShoppingCart extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: CartProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPromotion extends Document {
  _id: Types.ObjectId;
  nameEvent: string;
  imageHeader: string;
  banner: string;
  listProducts: string[];
  listImageEvent: string[];
  background: string;
  colorNavigation: string;
  startDate: string;
  endDate: string;
  discountType: DiscountType;
  discountPercent?: number;
  discountMoney?: number;
  isShow: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeedback extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  comment: string;
  rating: number;
  image: string[];
  isHide: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMainBanner extends Document {
  _id: Types.ObjectId;
  order: number;
  url: string;
  image: string;
  title: string;
  label: string;
  isShow: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubBanner extends Document {
  _id: Types.ObjectId;
  order: number;
  url: string;
  image: string;
  isShow: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlog extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  categoryNewId: string;
  tags: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITag extends Document {
  _id: Types.ObjectId;
  name: string;
  numberUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentCategory extends Document {
  _id: Types.ObjectId;
  categoryId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryNew extends Document {
  _id: Types.ObjectId;
  name: string;
  url: string;
  imageLogo?: string;
  isDeleted: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRepair extends Document {
  _id: Types.ObjectId;
  customerId: string;
  phoneCustomer: string;
  nameOrder: string;
  descriptionOrder?: string;
  status: StatusRepair;
  expectedDate: string;
  price: number;
  equipmentRepair?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// DTOs for NestJS (Example)
// ============================================================================

export class CreateUserDto {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role?: RoleEnum;
}

export class CreateCategoryDto {
  name: string;
  url: string;
  imageLogo?: string;
  parentId?: string;
  order?: number;
}

export class CreateProductDto {
  name: string;
  categoryId: string;
  brandId: string;
  description: string;
  infoProduct?: string;
  price?: number;
  salePrice?: number;
  stock: number;
  status?: ProductStatus;
  imageThumbnailUrl: string;
  imageUrls?: string[];
  variants?: Variant[];
  specifications?: Specification[];
}

export class CreateOrderDto {
  userId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  customerName: string;
  address: string;
  phone: string;
  totalPrice: number;
}

// ============================================================================
// Collection Names (for reference)
// ============================================================================

export const COLLECTION_NAMES = {
  USER: 'users',
  CATEGORY: 'categories',
  BRAND: 'brands',
  PRODUCT: 'products',
  PRODUCT_VARIANT: 'productvariants',
  PRODUCT_SPECIFICATION: 'productspecifications',
  ORDER: 'orders',
  SHOPPING_CART: 'shoppingcarts',
  PROMOTION: 'promotions',
  FEEDBACK: 'feedbacks',
  MAIN_BANNER: 'mainbanners',
  SUB_BANNER: 'subbanners',
  BLOG: 'blogs',
  TAG: 'tags',
  CONTENT_CATEGORY: 'contentcategories',
  CATEGORY_NEW: 'categorynews',
  REPAIR: 'repairs',
} as const;



