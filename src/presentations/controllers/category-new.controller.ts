import { Request, Response } from "express";
import { CategoryNewService } from "../../services/category-new.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const CategoryNewController = {
  createCategoryNew: async (req: Request, res: Response) => {
    const response = await CategoryNewService.createCategoryNew(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Created Success", response));
  },
  getAllCategoriesNew: async (req: Request, res: Response) => {
    const data = await CategoryNewService.getAllCategoriesNew();
    return res.json(successResponse(HttpStatus.OK, "Get data Success", data));
  },
  getCategoriesNewActive: async (req: Request, res: Response) => {
    const data = await CategoryNewService.getCategoriesNewActive();
    return res.json(successResponse(HttpStatus.OK, "Get data Success", data));
  },
  getCategoryNewById: async (req: Request, res: Response) => {
    const { categoryNewId } = req.params;
    const data = await CategoryNewService.getCategoryNewById(categoryNewId);
    return res.json(successResponse(HttpStatus.OK, "Get data Success", data));
  },
};
