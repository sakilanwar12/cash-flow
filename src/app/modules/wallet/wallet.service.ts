import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";

const topUpWallet = async (payload: Partial<IWallet>) => {
  const { user, balance } = payload;
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is required");
  }

  if (!balance) {
    throw new AppError(httpStatus.BAD_REQUEST, "Balance is required");
  }

  const existingWallet = await Wallet.findOne({ user });
  console.log("existingWallet");

  if (!existingWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }

  // Update wallet balance
  existingWallet.balance += balance;
  await existingWallet.save();

  return existingWallet;
};
const withDrawMoney = async (payload: Partial<IWallet>) => {
  const { user, balance } = payload;
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is required");
  }

  if (!balance) {
    throw new AppError(httpStatus.BAD_REQUEST, "Balance is required");
  }

  const existingWallet = await Wallet.findOne({ user });
  console.log("existingWallet");

  if (!existingWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }

  if (existingWallet.balance < balance) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient wallet balance");
  }
  // Deduct balance
  existingWallet.balance -= balance;
  await existingWallet.save();

  await existingWallet.save();

  return existingWallet;
};

export const WalletService = {
  topUpWallet,
  withDrawMoney,
};
