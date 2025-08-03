import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";

const topUpWallet = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    
    const user = await WalletService.topUpWallet(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Top Up Wallet Successfully",
      data: user,
    });
  }
);
const withDrawMoney = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    
    const user = await WalletService.withDrawMoney(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Withdraw Wallet Successfully",
      data: user,
    });
  }
);

export const WalletControllers = {
  topUpWallet,
  withDrawMoney
};
