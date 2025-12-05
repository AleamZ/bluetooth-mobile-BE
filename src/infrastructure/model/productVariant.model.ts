import mongoose, { Schema, Document } from "mongoose";

export interface IProductVariant extends Document {
  productId: string;
  variantName: string;
  attributes: Record<string, string>;
  quantity: number;
  price: number;
}

const ProductVariantSchema: Schema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantName: { type: String, required: true },
    attributes: { type: Object, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ProductVariant = mongoose.model<IProductVariant>(
  "ProductVariant",
  ProductVariantSchema
);
