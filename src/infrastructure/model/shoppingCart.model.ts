import mongoose, { Schema, Document } from "mongoose";

export interface IShoppingCart extends Document {
  userId: string;
  products: {
    productId: string;
    variantId: string;
    quantity: number;
    totalPrice: number;
  }[];
}

const ShoppingCartSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: String, required: true },
        variantId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        totalPrice: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const ShoppingCart = mongoose.model<IShoppingCart>(
  "ShoppingCart",
  ShoppingCartSchema
);
