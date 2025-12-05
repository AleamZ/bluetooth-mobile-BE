import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { SubBannerDTO } from "../dtos/sub-banner/sub-banner.dto";
import { SubBannerController } from "../controllers/sub-banner.controller";

const subBannerRoutes = Router();

subBannerRoutes.post(
  "/create",
  transformAndValidate(SubBannerDTO),
  catchAsync(SubBannerController.createSubBanner)
);
subBannerRoutes.put(
  "/update-order/:subBannerId",
  catchAsync(SubBannerController.updateOrder)
);
subBannerRoutes.get(
  "/is-show",
  catchAsync(SubBannerController.getSubBannerIsShow)
);
subBannerRoutes.get(
  "/get-all",
  catchAsync(SubBannerController.getAllSubBanner)
);
subBannerRoutes.delete(
  "/delete/:subBannerId",
  catchAsync(SubBannerController.deleteSubBanner)
);
subBannerRoutes.put(
  "/update/:subBannerId",
  catchAsync(SubBannerController.updateSubBanner)
);

export default subBannerRoutes;
