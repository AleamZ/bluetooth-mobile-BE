import mongoose, { Document, Schema } from "mongoose";

export interface ICategoryNew extends Document {
  name: string;
  url: string;
  imageLogo: string;
  isDeleted: boolean;
  order: number;
}

const CategoryNewSchema: Schema = new Schema<ICategoryNew>(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    imageLogo: { type: String },
    isDeleted: { type: Boolean, default: false },
    order: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoryNew = mongoose.model<ICategoryNew>(
  "CategoryNew",
  CategoryNewSchema
);

export default CategoryNew;
