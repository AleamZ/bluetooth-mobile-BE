import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";

import { PromotionDTO } from "../dtos/promotion/promotion.dto";
import { PromotionController } from "../controllers/promotion.controller";

const promotionRoutes = Router();

promotionRoutes.post(
  "/create",
  transformAndValidate(PromotionDTO),
  catchAsync(PromotionController.createPromotion)
);
promotionRoutes.put(
  "/update/:promotionId",
  catchAsync(PromotionController.updatePromotion)
);
promotionRoutes.delete(
  "/delete/:promotionId",
  catchAsync(PromotionController.deletePromotion)
);
promotionRoutes.get(
  "/get-active",
  catchAsync(PromotionController.getPromotionActive)
);
promotionRoutes.get(
  "/:promotionId",
  catchAsync(PromotionController.getPromotionById)
);

export default promotionRoutes;
