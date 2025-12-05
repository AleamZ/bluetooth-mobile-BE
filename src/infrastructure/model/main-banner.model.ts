import mongoose, { Document, Schema } from "mongoose";

export interface IMainBanner extends Document {
  order: number;
  url: string;
  image: string;
  title: string;
  label: string;
  isShow: boolean;
}

const MainBannerSchema: Schema = new Schema<IMainBanner>(
  {
    order: { type: Number, required: true, default: 1 },
    url: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    label: { type: String, required: true },
    isShow: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MainBanner = mongoose.model<IMainBanner>("MainBanner", MainBannerSchema);

export default MainBanner;
