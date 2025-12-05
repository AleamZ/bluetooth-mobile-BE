import { Request, Response } from "express";
import {
  createFeedbackService,
  hideFeedbackService,
} from "../../services/feedback.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";

export const createFeedbackController = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const feedback = await createFeedbackService(user.userId, req.body);
  res.json(
    successResponse(
      HttpStatus.CREATED,
      "Feedback created successfully",
      feedback
    )
  );
};

export const hideFeedbackController = async (req: Request, res: Response) => {
  const feedbackId = req.query.feedbackId as string;
  if (!feedbackId) {
    throw new BadRequestException("Feedback ID is required");
  }
  await hideFeedbackService(feedbackId);
  res.json(successResponse(HttpStatus.OK, "Feedback hidden successfully"));
};
