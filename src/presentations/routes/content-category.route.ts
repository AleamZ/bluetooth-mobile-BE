import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { ContentCategoryController } from "../controllers/content-category.controller";
import { ContentCategoryDTO } from "../dtos/content-category/content-category.dto";

const contentCategoryRoutes = Router();

contentCategoryRoutes.post(
  "/create",
  transformAndValidate(ContentCategoryDTO),
  catchAsync(ContentCategoryController.createContent)
);

export default contentCategoryRoutes;
