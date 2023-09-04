import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../exceptions/forbidden-error";
import { UserType } from "../types";

export const checkRole = (
  role: UserType
): ((request: Request, response: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user!;
      if (user.type !== role) {
        throw new ForbiddenError("You are not allowed to perform this action");
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
