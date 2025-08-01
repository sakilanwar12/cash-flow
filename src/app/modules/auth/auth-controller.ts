import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth-service";
import AppError from "../../errorHelpers/AppError";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.body;
    const result = await AuthServices.loginUser(query);

    const { accessToken, refreshToken, user } = result;

    if (!accessToken || !refreshToken) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to login");
    }
    if (!user) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials"));
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User logged in successfully",
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  }
);
export const AuthControllers = {
  credentialsLogin,
};
