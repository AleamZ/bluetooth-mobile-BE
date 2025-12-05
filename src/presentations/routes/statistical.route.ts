import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  getOrdersShopController,
  getTopSellController,
} from "../controllers/statistical.controller";

const statisticalRoutes = Router();

statisticalRoutes.get(
  "/orders",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(getOrdersShopController)
);

statisticalRoutes.get("/top-sell", catchAsync(getTopSellController));
export default statisticalRoutes;
