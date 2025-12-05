import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { FeedbackDTO } from "../dtos/feedback/feedback.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  createFeedbackController,
  hideFeedbackController,
} from "../controllers/feedback.controller";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";

const feedbackRoutes = Router();

feedbackRoutes.post(
  "/create",
  verifyToken,
  transformAndValidate(FeedbackDTO),
  catchAsync(createFeedbackController)
);

feedbackRoutes.put(
  "/hide",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(hideFeedbackController)
);
export default feedbackRoutes;
