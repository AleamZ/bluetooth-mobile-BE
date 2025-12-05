import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../domain/exceptions/unauthorized.exception";
import { IUser } from "../infrastructure/model/user.model";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IUser;
    res.locals.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedException("Invalid token or expired token"));
  }
};
