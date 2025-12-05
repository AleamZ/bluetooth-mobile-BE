import { Request, Response } from "express";
import { ContentCategoryService } from "../../services/content-category.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const ContentCategoryController = {
  createContent: async (req: Request, res: Response) => {
    const newContent = await ContentCategoryService.createContent(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Create success", newContent));
  },
};
