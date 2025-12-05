import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { BrandDTO } from "../dtos/brand/brand.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  createBrandController,
  deleteSoftBrandController,
  getBrandsActiveController,
  restoreBrandController,
  updateBrandController,
} from "../controllers/brand.controller";
import { BrandUpdateDTO } from "../dtos/brand/update-brand.dto";
import { getAllBrandService } from "../../services/brand.service";

const brandRoutes = Router();

brandRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(BrandDTO),
  catchAsync(createBrandController)
);

brandRoutes.put(
  "/delete-soft",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(deleteSoftBrandController)
);

brandRoutes.put(
  "/restore",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(restoreBrandController)
);

brandRoutes.put(
  "/update",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(BrandUpdateDTO),
  catchAsync(updateBrandController)
);

brandRoutes.get("/get-all", catchAsync(getAllBrandService));
brandRoutes.get("/get-active", catchAsync(getBrandsActiveController));
export default brandRoutes;
