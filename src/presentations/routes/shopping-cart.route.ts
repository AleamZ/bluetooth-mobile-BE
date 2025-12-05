import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { AddToCartDTO } from "../dtos/shoppping-cart/addToCart.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  addToCartController,
  removeFromCartController,
} from "../controllers/shopping-cart.controller";

const shoppingCartRoutes = Router();
shoppingCartRoutes.post(
  "/add-to-cart",
  verifyToken,
  transformAndValidate(AddToCartDTO),
  catchAsync(addToCartController)
);

shoppingCartRoutes.post(
  "/remove-from-cart",
  verifyToken,
  catchAsync(removeFromCartController)
);

export default shoppingCartRoutes;
