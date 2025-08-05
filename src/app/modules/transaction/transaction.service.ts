import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Transaction } from "./transaction.model";

export const getUserTransactions = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Id is required");
  }

  const data = await Transaction.find({
    $or: [{ senderId: userId }, { recipientId: userId }],
  })
    .sort({ createdAt: -1 })
    .select("-__v");
  return data;
};

export const TransactionServices = {
  getUserTransactions,
};
