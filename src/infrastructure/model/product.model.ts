import mongoose, { Document, Schema } from "mongoose";
import { ProductStatus } from "../../domain/enums/product-status.enum";

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
export interface IProduct extends Document {
  name: string;
  categoryId: Schema.Types.ObjectId;
  brandId: Schema.Types.ObjectId;
  description: string;
  price?: number;
  salePrice?: number;
  variants?: Variant[];
  stock: number;
  status: ProductStatus;
  isDeleted: boolean;
  imageThumbnailUrl: string;
  imageUrls: string[];
  infoProduct: string;
  specifications: Specification[];
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    description: { type: String, default: "" },
    infoProduct: { type: String, default: "" },
    price: {
      type: Number,
      required: function () {
        return !this.variants || this.variants.length === 0;
      },
    },
    salePrice: { type: Number, default: 0 },
    variants: [
      {
        attributes: { type: Map, of: String, required: true },
        price: { type: Number, required: true },
        salePrice: { type: Number, default: 0 },
        status: {
          type: String,
          enum: Object.values(ProductStatus),
          default: ProductStatus.AVAILABLE,
        },
        stock: { type: Number, required: true },
      },
    ],
    stock: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.AVAILABLE,
    },
    imageThumbnailUrl: { type: String, required: true },
    imageUrls: { type: [String] },
    isDeleted: { type: Boolean, default: false },
    specifications: [
      {
        nameGroup: { type: String, required: true },
        specificationsSub: [
          {
            key: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
