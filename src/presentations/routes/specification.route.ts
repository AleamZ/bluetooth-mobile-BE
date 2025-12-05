import { Router } from "express";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { SpecificationDTO } from "../dtos/specification/specification.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import { SpecificationController } from "../controllers/specification.controller";
import { verifyToken } from "../../middlewares/verifyToken.middleware";

const specificaionRoutes = Router();

specificaionRoutes.post(
  "/create",
  catchAsync(SpecificationController.createSpecification)
);
specificaionRoutes.put(
  "/update/:id",
  catchAsync(SpecificationController.updateSpecification)
);
// Add the delete route before the generic routes to prevent routing conflicts
specificaionRoutes.delete(
  "/delete/:id",
  catchAsync(SpecificationController.deleteSpecificationById)
);

specificaionRoutes.delete(
  "/hard-delete/:id",
  catchAsync(SpecificationController.hardDeleteSpecificationById)
);

specificaionRoutes.get(
  "/get-filter-category/:categoryUrl",
  catchAsync(SpecificationController.getSpecificationByCategoryUrl)
);
specificaionRoutes.get(
  "/:categoryId",
  catchAsync(SpecificationController.getSpecificationByCategoryId)
);

export default specificaionRoutes;
