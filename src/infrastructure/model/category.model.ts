import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  url: string;
  imageLogo: string;
  isDeleted: boolean;
  subCategories: string[];
  parentId: string | null;
  order: number;
}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    imageLogo: { type: String },
    isDeleted: { type: Boolean, default: false },
    subCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    order: {type: Number, default: 1}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
