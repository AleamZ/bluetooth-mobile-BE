import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { MainBannerController } from "../controllers/main-banner.controller";
import { MainBannerDTO } from "../dtos/main-banner/main-banner.dto";

const mainBannerRoutes = Router();

mainBannerRoutes.post(
  "/create",
  transformAndValidate(MainBannerDTO),
  catchAsync(MainBannerController.createMainBanner)
);
mainBannerRoutes.put(
  "/update-order/:mainBannerId",
  catchAsync(MainBannerController.updateOrder)
);
mainBannerRoutes.get(
  "/is-show",
  catchAsync(MainBannerController.getMainBannerIsShow)
);
mainBannerRoutes.get(
  "/get-all",
  catchAsync(MainBannerController.getAllMainBanner)
);
mainBannerRoutes.delete(
  "/delete/:mainBannerId",
  catchAsync(MainBannerController.deleteMainBanner)
);
mainBannerRoutes.put(
  "/update/:mainBannerId",
  catchAsync(MainBannerController.updateMainBanner)
);

export default mainBannerRoutes;
