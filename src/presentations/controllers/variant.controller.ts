import { Request, Response } from "express";
import { createVariantService } from "../../services/variant.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createVariantController = async (req: Request, res: Response) => {
  const newVariantOfProduct = await createVariantService(req.body);
  res.json(
    successResponse(
      HttpStatus.CREATED,
      "Add Variant Success",
      newVariantOfProduct
    )
  );
};
