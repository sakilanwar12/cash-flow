import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";
import AppError from "../../errorHelpers/AppError";

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

const sendMoney = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await WalletService.sendMoney(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Send Money Successfully",
      data,
    });
  }
);

const getWallet = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    if (!userId) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Id is required");
    }
    const data = await WalletService.getWallet(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Get Wallet Successfully",
      data,
    });
  }
);

const agentCashIn = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await WalletService.agentCashIn(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Agent Cash In Successfully",
      data,
    });
  }
);
const agentCashOut = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await WalletService.agentCashOut(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Agent Cash Out Successfully",
      data,
    });
  }
);

const getAllWallets = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const data = await WalletService.getAllWallets(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Get All Wallet Successfully",
      data,
    });
  }
);

export const WalletControllers = {
  topUpWallet,
  withDrawMoney,
  sendMoney,
  getWallet,
  agentCashIn,
  agentCashOut,
  getAllWallets,
};
