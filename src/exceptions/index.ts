import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { ResponseDTO, statusCode } from "../types";
import UnAuthenticatedError from "./unathenticated-error";
import ValidatorError from "./validator-error";

export default class Handler {
  /**
   *
   * @param error
   * @param request
   * @param response
   * @param next
   * @returns error handler
   */
  static handleError(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ): Response<ResponseDTO<null>> {
    const customResponse = new ResponseDTO(
      statusCode.BAD_REQUEST,
      false,
      null,
      error.message
    );

    if (error instanceof ValidatorError) {
      customResponse.statusCode = statusCode.BAD_REQUEST;
      return response.status(statusCode.BAD_REQUEST).json(customResponse);
    } else if (error instanceof UnAuthenticatedError) {
      customResponse.statusCode = statusCode.UNAUTHENTICATED;
      return response.status(statusCode.UNAUTHENTICATED).json(customResponse);
    } else if (error instanceof TokenExpiredError) {
      if (error.name === statusCode.REFRESH_TOKEN_EXPIRED.toString()) {
        customResponse.statusCode = statusCode.REFRESH_TOKEN_EXPIRED;
        return response
          .status(statusCode.REFRESH_TOKEN_EXPIRED)
          .json(customResponse);
      }
      customResponse.statusCode = statusCode.UNAUTHENTICATED;
      return response.status(statusCode.UNAUTHENTICATED).json(customResponse);
    } else {
      customResponse.statusCode = statusCode.INTERNAL_SERVER_ERROR;
      return response
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(customResponse);
    }
  }
}
