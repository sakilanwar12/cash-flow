import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import {
  IAgentCashIn,
  IAgentCashOut,
  ISendMoney,
  IWallet,
  TBlockWallet,
} from "./wallet.interface";
import { Wallet } from "./wallet.model";
import { Transaction } from "../transaction/transaction.model";
import { QueryBuilder } from "../../utils/QueryBuilder";

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

  await Transaction.create({
    senderId: user,
    recipientId: user,
    amount: balance,
    type: "TopUp",
    status: "success",
  });

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

  if (!existingWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }

  if (existingWallet.balance < balance) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient wallet balance");
  }
  // Deduct balance
  existingWallet.balance -= balance;
  await existingWallet.save();

  await Transaction.create({
    senderId: user,
    recipientId: user,
    amount: balance,
    type: "withdraw",
    status: "success",
  });

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

  await Transaction.create({
    senderId,
    recipientId,
    amount,
    type: "transfer",
    status: "success",
  });

  return senderWallet.toObject();
};

const getWallet = async (userId: string) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }
  return wallet;
};

const agentCashIn = async ({ userId, agentId, amount }: IAgentCashIn) => {
  // agent will give money to user in his wallet
  const agentWallet = await Wallet.findOne({ user: agentId });

  if (!agentWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Agent wallet not found");
  }

  if (agentWallet.balance < amount) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Insufficient agent wallet balance"
    );
  }

  const userWallet = await Wallet.findOne({ user: userId });
  if (!userWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "User Wallet not found");
  }

  agentWallet.balance -= amount;
  userWallet.balance += amount;

  await agentWallet.save();
  await userWallet.save();

  await Transaction.create({
    senderId: agentId,
    recipientId: userId,
    amount,
    type: "agentCashIn",
    status: "success",
  });

  return agentWallet.toObject();
};
const agentCashOut = async ({ userId, agentId, amount }: IAgentCashOut) => {
  // Agent will give physical cash to the user, so deduct from user's wallet
  const agentWallet = await Wallet.findOne({ user: agentId });

  if (!agentWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Agent wallet not found");
  }

  const userWallet = await Wallet.findOne({ user: userId });

  if (!userWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "User Wallet not found");
  }

  if (userWallet.balance < amount) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Insufficient user wallet balance"
    );
  }

  // Transfer balance
  userWallet.balance -= amount;
  agentWallet.balance += amount;

  await userWallet.save();
  await agentWallet.save();

  await Transaction.create({
    senderId: userId,
    recipientId: agentId,
    amount,
    type: "agentCashOut",
    status: "success",
  });

  return agentWallet.toObject();
};

// get wallets admin
const getAllWallets = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Wallet.find(), query);
  const usersData = queryBuilder.filter().sort().fields().paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

// block wallet( only admin can block the user wallet)
const toggleWalletStatus  =  async ({status,user}:TBlockWallet) => {
  if(!user){
    throw new AppError(httpStatus.BAD_REQUEST,"User is required");
  }
  if(!status){
    throw new AppError(httpStatus.BAD_REQUEST,"Status is required");
  }
  const wallet = await Wallet.findOne({user});
  if(!wallet){
    throw new AppError(httpStatus.NOT_FOUND,"Wallet not found");
  }
  wallet.status = status;
  await wallet.save();
  return wallet;
}
export const WalletService = {
  topUpWallet,
  withDrawMoney,
  sendMoney,
  getWallet,
  agentCashIn,
  agentCashOut,
  getAllWallets,
  toggleWalletStatus
};
