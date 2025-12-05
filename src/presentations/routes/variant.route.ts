import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { createVariantController } from "../controllers/variant.controller";
import { VariantDTO } from "../dtos/variant/variant.dto";

const variantRoutes = Router();

variantRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(VariantDTO),
  catchAsync(createVariantController)
);

export default variantRoutes;
