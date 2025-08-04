import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ISendMoney, IWallet } from "./wallet.interface";
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
const sendMoney = async (payload: ISendMoney) => {
  const { senderId, recipientId, amount } = payload;

  if (!senderId || !recipientId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Sender and recipient are required"
    );
  }

  if (!amount || amount <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Amount must be a positive number"
    );
  }

  if (senderId === recipientId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot send money to yourself");
  }

  const senderWallet = await Wallet.findOne({ user: senderId });
  const recipientWallet = await Wallet.findOne({ user: recipientId });

  if (!senderWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Sender wallet not found");
  }

  if (!recipientWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipient wallet not found");
  }

  if (senderWallet.balance < amount) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient wallet balance");
  }

  // Transaction
  senderWallet.balance -= amount;
  recipientWallet.balance += amount;

  await senderWallet.save();
  await recipientWallet.save();

  return senderWallet.toObject();
};

const getWallet = async (userId: string) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }
  return wallet;
};

export const WalletService = {
  topUpWallet,
  withDrawMoney,
  sendMoney,
  getWallet
};
