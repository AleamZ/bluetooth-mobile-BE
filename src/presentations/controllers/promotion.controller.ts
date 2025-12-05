import { Request, Response } from "express";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { PromotionService } from "../../services/promotion.service";
import { successResponse } from "../../utils/response-success.util";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";

export const PromotionController = {
  createPromotion: async (req: Request, res: Response) => {
    const data = req.body;

    const promotion = await PromotionService.createPromotion(data);
    return res
      .status(HttpStatus.CREATED)
      .json(
        successResponse(
          HttpStatus.CREATED,
          "Promotion created successfully",
          promotion
        )
      );
  },
  updatePromotion: async (req: Request, res: Response) => {
    const { promotionId } = req.params;
    if (!promotionId) {
      throw new BadRequestException("Promotion ID is required");
    }
    const updatedPromotion = await PromotionService.updatePromotion(
      promotionId,
      req.body
    );
    return res.json(
      successResponse(
        HttpStatus.OK,
        "Promotion updated successfully",
        updatedPromotion
      )
    );
  },
  deletePromotion: async (req: Request, res: Response) => {
    const { promotionId } = req.params;
    if (!promotionId) {
      throw new BadRequestException("Promotion ID is required");
    }
    await PromotionService.deletePromotion(promotionId);
    res.json(successResponse(HttpStatus.OK, "Promotion deleted successfully"));
  },
  getPromotionById: async (req: Request, res: Response) => {
    const { promotionId } = req.params;
    const promotions = await PromotionService.getPromotion(promotionId);
    res.json(
      successResponse(
        HttpStatus.OK,
        "Promotions retrieved successfully",
        promotions
      )
    );
  },
  getPromotionActive: async (req: Request, res: Response) => {
    const promotion = await PromotionService.getPromotionActive();
    res.json(
      successResponse(HttpStatus.OK, "Get data successfully", promotion)
    );
  },
};
