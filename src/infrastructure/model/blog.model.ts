import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  categoryNewId: string;
  tags: string[];
  image: string;
}

const BlogSchema: Schema = new Schema<IBlog>(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true, unique: true },
    categoryNewId: {
      type: String,
      required: true,
    },
    tags: { type: [String], default: null },
    image: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
