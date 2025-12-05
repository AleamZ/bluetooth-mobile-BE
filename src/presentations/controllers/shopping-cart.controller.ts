import { Request, Response } from "express";
import {
  addToCartService,
  removeFromCartService,
} from "../../services/shopping-cart.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const addToCartController = async (req: Request, res: Response) => {
  const user = res.locals.user;
  await addToCartService(user.userId, req.body.products);
  res.json(successResponse(HttpStatus.OK, "Item added to cart"));
};

export const removeFromCartController = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const ids = req.query.ids as string;
  await removeFromCartService(user.userId, ids);
  res.json(successResponse(HttpStatus.OK, "Item removed from cart"));
};
