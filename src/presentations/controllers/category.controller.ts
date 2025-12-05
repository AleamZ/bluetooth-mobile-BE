import { Request, Response } from "express";
import {
  addCategoryTree,
  createCategoryService,
  deleteCategoryService,
  getAllCategoryService,
  getCategoriesActive,
  getCategoriesInActive,
  getCategoryById,
  getCategoryByUrlService,
  getCategoryFormatMenu,
  restoreCategoryService,
  updateCategoryService,
  updateOrderCategoryService,
  getCategoryNameByIdService,
  getCategoryUrlByIdService,
} from "../../services/category.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newCategory = await createCategoryService(req.body);
  res.json(
    successResponse(HttpStatus.CREATED, "Create Category Success", newCategory)
  );
};

export const addCategoryTreeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.categoryId;
  const { subCategories } = req.body;
  const response = await addCategoryTree(categoryId, subCategories);
  res.json(
    successResponse(HttpStatus.OK, "Thêm danh mục thành công", response)
  );
};

export const updateCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updateCategory = await updateCategoryService(
    req.body.categoryId,
    req.body
  );
  res.json(
    successResponse(HttpStatus.OK, "Update Category Success", updateCategory)
  );
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  const deleteCategory = await deleteCategoryService(req.body.categoryId);
  res.json(
    successResponse(HttpStatus.OK, "Delete Category Success", deleteCategory)
  );
};

export const restoreCategoryController = async (
  req: Request,
  res: Response
) => {
  const restoreCategory = await restoreCategoryService(req.body.categoryId);
  res.json(
    successResponse(HttpStatus.OK, "Restore Category Success", restoreCategory)
  );
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const categories = await getAllCategoryService();
  res.json(
    successResponse(HttpStatus.OK, "Get All Categories Success", categories)
  );
};

export const getCategoriesActiveController = async (
  req: Request,
  res: Response
) => {
  const categories = await getCategoriesActive();
  res.json(successResponse(HttpStatus.OK, "Get Categories Active", categories));
};
export const getCategoriesInActiveController = async (
  req: Request,
  res: Response
) => {
  const categories = await getCategoriesInActive();
  res.json(
    successResponse(HttpStatus.OK, "Get Categories In Active", categories)
  );
};
export const getCategoriesFormatMenuController = async (
  req: Request,
  res: Response
) => {
  const response = await getCategoryFormatMenu();
  res.json(
    successResponse(HttpStatus.OK, "Get Categories Format Menu", response)
  );
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  const categoryId = req.params.categoryId;
  const response = await getCategoryById(categoryId);
  res.json(successResponse(HttpStatus.OK, "Get Categories", response));
};

export const updateOrderCategory = async (req: Request, res: Response) => {
  const { categoryUrl } = req.params
  const { order } = req.body
  await updateOrderCategoryService(categoryUrl, order)
  res.json(successResponse(HttpStatus.OK, "Update success"))
}
export const getCategoryByUrl = async (req: Request, res: Response) => {
  const { categoryUrl } = req.params
  const data = await getCategoryByUrlService(categoryUrl)
  res.json(successResponse(HttpStatus.OK, "Get data success", data))
}

export const getCategoryNameByIdController = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const categoryName = await getCategoryNameByIdService(categoryId);
  res.json(successResponse(HttpStatus.OK, "Get Category Name Success", { name: categoryName }));
};

export const getCategoryUrlByIdController = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const categoryUrl = await getCategoryUrlByIdService(categoryId);
  res.json(successResponse(HttpStatus.OK, "Get Category URL Success", { url: categoryUrl }));
};
