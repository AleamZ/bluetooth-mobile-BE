import mongoose, { Document, Schema } from "mongoose";

export interface IFeedback extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
  image: string[];
  isHide: boolean;
}

const FeedbackSchema: Schema = new Schema<IFeedback>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, default: 0 },
    image: { type: [String], default: [] },
    isHide: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Feedback = mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export default Feedback;
