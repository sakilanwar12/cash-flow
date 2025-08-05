import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import { TransactionServices } from "./transaction.service";

const getUserTransactions = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    if (!userId) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Id is required");
    }
    const data = await TransactionServices.getUserTransactions(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Get Transaction Successfully",
      data,
    });
  }
);
export const TransactionControllers = {
  getUserTransactions,
};
