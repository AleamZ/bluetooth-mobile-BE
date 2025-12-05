import { Request, Response } from "express";
import {
  approveOrderService,
  cancelOrderService,
  createOrderService,
  deliveredFailOrderService,
  deliveredOrderService,
  doneOrderService,
  refundedOrderService,
} from "../../services/order.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createOrderController = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const newOrder = await createOrderService(user.userId, req.body.orders);
  res.json(
    successResponse(HttpStatus.CREATED, "Order created successfully", newOrder)
  );
};

export const approveOrderController = async (req: Request, res: Response) => {
  const orderId = req.query.orderId as string;
  await approveOrderService(orderId);
  res.json(successResponse(HttpStatus.OK, "Order approved successfully"));
};

export const cancelOrderController = async (req: Request, res: Response) => {
  const orderId = req.query.orderId as string;

  await cancelOrderService(orderId);
  res.json(successResponse(HttpStatus.OK, "Order cancelled successfully"));
};

export const deliveredOrderController = async (req: Request, res: Response) => {
  const orderId = req.query.orderId as string;

  await deliveredOrderService(orderId);
  res.json(successResponse(HttpStatus.OK, "Order delivered successfully"));
};

export const deliveredFailOrderController = async (
  req: Request,
  res: Response
) => {
  const orderId = req.query.orderId as string;

  await deliveredFailOrderService(orderId);
  res.json(
    successResponse(HttpStatus.OK, "Order delivery failed successfully")
  );
};

export const refundedOrderController = async (req: Request, res: Response) => {
  const orderId = req.query.orderId as string;

  await refundedOrderService(orderId);
  res.json(successResponse(HttpStatus.OK, "Order refunded successfully"));
};

export const doneOrderController = async (req: Request, res: Response) => {
  const orderId = req.query.orderId as string;

  await doneOrderService(orderId);
  res.json(successResponse(HttpStatus.OK, "Order done successfully"));
};
