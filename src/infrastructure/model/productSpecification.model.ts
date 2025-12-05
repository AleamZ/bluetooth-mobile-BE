import mongoose, { Schema, Document } from "mongoose";

export interface ISpecification {
  _id: string;
  name: string;
  checkedFilter: boolean;
}

export interface IProductSpecification extends Document {
  categoryId: string;
  groupName: string;
  specifications: ISpecification[];
}

const ProductSpecificationSchema: Schema = new Schema(
  {
    categoryId: { type: String, required: true },
    groupName: { type: String, required: true },
    specifications: [
      {
        name: { type: String, required: true },
        checkedFilter: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const ProductSpecification = mongoose.model<IProductSpecification>(
  "ProductSpecification",
  ProductSpecificationSchema
);
