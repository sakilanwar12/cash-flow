import { Types } from "mongoose";

export enum EWalletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export type TWalletStatus = `${EWalletStatus}`;
export interface IWallet {
  user: Types.ObjectId;
  balance: number;
  status: TWalletStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISendMoney {
  senderId: string;
  recipientId: string;
  amount: number;
}

export interface IAgentCashIn {
  userId: Types.ObjectId;
  agentId: Types.ObjectId;
  amount: number;
}
export interface IAgentCashOut {
  userId: Types.ObjectId;
  agentId: Types.ObjectId;
  amount: number;
}

export type TBlockWallet = Pick<IWallet, "status" | "user">;
