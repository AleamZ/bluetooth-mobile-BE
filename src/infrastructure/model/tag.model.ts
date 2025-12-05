import mongoose, { Document, Schema } from "mongoose";

export interface ITag extends Document {
  name: string;
  numberUsed?: number;
}

const TagSchema: Schema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    numberUsed: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Tag = mongoose.model<ITag>("Tag", TagSchema);

export default Tag;
