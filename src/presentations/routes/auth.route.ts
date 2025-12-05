import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { RegisterUserDto } from "../dtos/user/register-user.dto";
import {
  loginController,
  registerAdminController,
  registerController,
  registerStaffController,
} from "../controllers/user.controller";
import { LoginUserDto } from "../dtos/user/login-user.dto";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { RoleEnum } from "../../domain/enums/role-enum.enum";

const userRoutes = Router();

userRoutes.post(
  "/register",
  transformAndValidate(RegisterUserDto),
  catchAsync(registerController)
);

userRoutes.post(
  "/register/admin",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN),
  transformAndValidate(RegisterUserDto),
  catchAsync(registerAdminController)
);

userRoutes.post(
  "/register/staff",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN),
  transformAndValidate(RegisterUserDto),
  catchAsync(registerStaffController)
);

userRoutes.post(
  "/login",
  transformAndValidate(LoginUserDto),
  catchAsync(loginController)
);

export default userRoutes;
