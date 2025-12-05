import mongoose, { Document, Schema } from "mongoose";
import { StatusOrder } from "../../domain/enums/status-order.enum";

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  variantId?: Schema.Types.ObjectId;
  quantity: number;
  numberCode: string;
  customerName: string;
  address: string;
  phone: string;
  totalPrice: number;
  isPaid: boolean;
  status: StatusOrder;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
    quantity: {
      type: Number,
      required: true,
    },
    numberCode: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(StatusOrder),
      default: StatusOrder.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
