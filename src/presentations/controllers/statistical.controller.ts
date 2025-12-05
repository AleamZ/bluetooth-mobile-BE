import { Request, Response } from "express";
import {
  getOrdersShop,
  getTopSellingProducts,
} from "../../services/statistical.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const getOrdersShopController = async (req: Request, res: Response) => {
  const analysisOrder = await getOrdersShop();
  res.json(
    successResponse(HttpStatus.OK, "Get data successfully", analysisOrder)
  );
};

export const getTopSellController = async (req: Request, res: Response) => {
  const topSellProducts = await getTopSellingProducts();
  res.json(
    successResponse(HttpStatus.OK, "Get data successfully", topSellProducts)
  );
};
