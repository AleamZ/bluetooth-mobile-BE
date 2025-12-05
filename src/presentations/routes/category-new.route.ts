import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { CategoryNewController } from "../controllers/category-new.controller";

const categoyNewRoutes = Router();

categoyNewRoutes.post(
  "/create",
  catchAsync(CategoryNewController.createCategoryNew)
);

categoyNewRoutes.get(
  "/get-all",
  catchAsync(CategoryNewController.getAllCategoriesNew)
);
categoyNewRoutes.get(
  "/get-active",
  catchAsync(CategoryNewController.getCategoriesNewActive)
);
categoyNewRoutes.get(
  "/:categoryNewId",
  catchAsync(CategoryNewController.getCategoryNewById)
);
export default categoyNewRoutes;
