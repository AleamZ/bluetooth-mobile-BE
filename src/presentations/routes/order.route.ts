import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { OrderDTO } from "../dtos/order/order.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  approveOrderController,
  cancelOrderController,
  createOrderController,
  deliveredFailOrderController,
  deliveredOrderController,
  doneOrderController,
  refundedOrderController,
} from "../controllers/order.controller";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";

const orderRoutes = Router();

orderRoutes.post(
  "/create",
  verifyToken,
  transformAndValidate(OrderDTO),
  catchAsync(createOrderController)
);

orderRoutes.put(
  "/approve",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(approveOrderController)
);
orderRoutes.put("/cancel", verifyToken, catchAsync(cancelOrderController));
orderRoutes.put(
  "/delivery",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(deliveredOrderController)
);
orderRoutes.put(
  "/delivery-fail",
  verifyToken,
  catchAsync(deliveredFailOrderController)
);
orderRoutes.put("/refund", verifyToken, catchAsync(refundedOrderController));
orderRoutes.put(
  "/done",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(doneOrderController)
);

export default orderRoutes;
