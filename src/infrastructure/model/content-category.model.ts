import mongoose, { Document, Schema } from "mongoose";

export interface IContentCategory extends Document {
  categoryId: string;
  content: string;
}

const ContentCategorySchema: Schema = new Schema<IContentCategory>(
  {
    categoryId: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ContentCategory = mongoose.model<IContentCategory>(
  "ContentCategory",
  ContentCategorySchema
);

export default ContentCategory;
