import { Request, Response } from "express";
import {
  createBrandService,
  deleteSoftBrandService,
  getAllBrandService,
  getBrandsActive,
  restoreBrandService,
  updateBrandService,
} from "../../services/brand.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createBrandController = async (req: Request, res: Response) => {
  const newBrand = await createBrandService(req.body);
  res.json(
    successResponse(HttpStatus.CREATED, "Brand created successfully", newBrand)
  );
};

export const deleteSoftBrandController = async (
  req: Request,
  res: Response
) => {
  const brandIds = req.query.ids as string;
  await deleteSoftBrandService(brandIds);
  res.json(successResponse(HttpStatus.OK, "Delete brand soft successfully"));
};

export const restoreBrandController = async (req: Request, res: Response) => {
  const brandIds = req.query.ids as string;
  await restoreBrandService(brandIds);
  res.json(successResponse(HttpStatus.OK, "Restore brand successfully"));
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const brands = await getAllBrandService();
  res.json(successResponse(HttpStatus.OK, "Get All Brands Success", brands));
};

export const getBrandsActiveController = async (
  req: Request,
  res: Response
) => {
  const brands = await getBrandsActive();
  res.json(successResponse(HttpStatus.OK, "Get Brands Active Success", brands));
};

export const updateBrandController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updateBrand = await updateBrandService(req.body.brandId, req.body);
  res.json(successResponse(HttpStatus.OK, "Update Brand Success", updateBrand));
};
