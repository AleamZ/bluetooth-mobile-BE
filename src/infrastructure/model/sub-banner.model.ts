import mongoose, { Document, Schema } from "mongoose";

export interface ISubBanner extends Document {
  order: number;
  url: string;
  image: string;
  isShow: boolean;
}

const SubBannerSchema: Schema = new Schema<ISubBanner>(
  {
    order: { type: Number, required: true, default: 1 },
    url: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    isShow: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SubBanner = mongoose.model<ISubBanner>("SubBanner", SubBannerSchema);

export default SubBanner;
