import { Request, Response } from "express";
import { loginService, register } from "../../services/user.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newUser = await register(req.body);
  res.json(
    successResponse(HttpStatus.CREATED, "User registered successfully", newUser)
  );
};

export const registerAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newAdmin = await register({ ...req.body, role: RoleEnum.ADMIN });
  res.json(
    successResponse(
      HttpStatus.CREATED,
      "Admin registered successfully",
      newAdmin
    )
  );
};

export const registerStaffController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newStaff = await register({ ...req.body, role: RoleEnum.STAFF });
  res.json(
    successResponse(
      HttpStatus.CREATED,
      "Staff registered successfully",
      newStaff
    )
  );
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  const userAgent = req.headers["user-agent"] || "unknown";
  const user = await loginService(username, password, userAgent);
  res.json(successResponse(HttpStatus.OK, "User logged in successfully", user));
};
