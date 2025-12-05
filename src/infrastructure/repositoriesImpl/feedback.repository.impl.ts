import { IFeedbackRepository } from "../../domain/repositories/feedback.repository";
import Feedback, { IFeedback } from "../model/feedback.model";

export class FeedbackRepositoryImpl implements IFeedbackRepository {
  async updateFeedback(
    feedbackId: string,
    feedback: any
  ): Promise<IFeedback | null> {
    return await Feedback.findByIdAndUpdate(feedbackId, feedback, {
      new: true,
    });
  }
  async createFeedback(feedback: IFeedback): Promise<IFeedback> {
    return await Feedback.create(feedback);
  }
  getFeedbackByProductId(productId: string): Promise<IFeedback[]> {
    throw new Error("Method not implemented.");
  }
}
