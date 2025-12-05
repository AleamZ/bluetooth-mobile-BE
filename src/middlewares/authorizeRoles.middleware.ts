import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../domain/enums/http-status.enum";

export const authorizeRoles =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const user = res.locals.user;
      const userRole = user?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        res.status(HttpStatus.FORBIDDEN).json({
          message: `Access denied. You need one of the following roles: ${allowedRoles.join(
            ", "
          )}`,
          attemptedRole: userRole || "undefined",
        });
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
