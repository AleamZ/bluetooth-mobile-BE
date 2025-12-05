import { IFeedback } from "../infrastructure/model/feedback.model";
import { FeedbackRepositoryImpl } from "../infrastructure/repositoriesImpl/feedback.repository.impl";
import { FeedbackDTO } from "../presentations/dtos/feedback/feedback.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const feedbackRepository = new FeedbackRepositoryImpl();
export const createFeedbackService = async (
  userId: string,
  feedback: IFeedback
) => {
  const createFeedbackDTO = await createAndValidateDto(FeedbackDTO, feedback);
  const newFeedback = {
    ...createFeedbackDTO,
    userId: userId,
  };
  return await feedbackRepository.createFeedback(newFeedback);
};

export const hideFeedbackService = async (feedbackId: string) => {
  return await feedbackRepository.updateFeedback(feedbackId, { isHide: true });
};
