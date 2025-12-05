import { IFeedback } from "../../infrastructure/model/feedback.model";

export interface IFeedbackRepository {
  createFeedback(feedback: IFeedback): Promise<IFeedback>;
  updateFeedback(
    feedbackId: string,
    feedback: IFeedback
  ): Promise<IFeedback | null>;
  getFeedbackByProductId(productId: string): Promise<IFeedback[]>;
}
