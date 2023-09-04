import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import UnAuthenticatedError from "../exceptions/unathenticated-error";
import User from "../models/user";
import { ITokenPayload, tokens,statusCode } from "../types";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies["access_token"];
    const refresToken = req.cookies["access_token"];
    if (!accessToken&&!refresToken) {
      let error = new TokenExpiredError("Token not found",new Date()); 
      error.name = statusCode.REFRESH_TOKEN_EXPIRED.toString();
      throw error;
    }
    if (!accessToken) {
      throw new UnAuthenticatedError("Token not found");
    }
    const decodedValue: ITokenPayload = jwt.verify(
      accessToken,
      process.env.SECRET!
    ) as ITokenPayload;
    if (decodedValue.type === tokens.refresh) {
      throw new UnAuthenticatedError("Refresh token found.");
    }
    // check user
    const user = await User.findOne({ email: decodedValue.email,lastLoggedToken:accessToken });
    if (!user) {
      throw new TokenExpiredError("Token not valid",new Date());
    }
    req.userEmail = decodedValue.email;
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
