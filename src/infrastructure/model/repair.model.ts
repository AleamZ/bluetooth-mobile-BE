import mongoose, { Schema, Document } from "mongoose";
import { StatusRepair } from "../../domain/enums/status-repair.enum";
export interface IRepair extends Document {
  customerId: string;
  phoneCustomer: string;
  nameOrder: string;
  descriptionOrder: string;
  status: StatusRepair;
  expectedDate: string;
  price: number;
  equipmentRepair: string;
}
const RepairSchema: Schema = new Schema<IRepair>(
  {
    customerId: {
      type: String,
      required: true,
    },
    phoneCustomer: {
      type: String,
      required: true,
    },
    nameOrder: {
      type: String,
      required: true,
    },
    descriptionOrder: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(StatusRepair),
      default: StatusRepair.NEW_ORDER,
    },
    expectedDate: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    equipmentRepair: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Repair = mongoose.model<IRepair>("Repair", RepairSchema);

export default Repair;
