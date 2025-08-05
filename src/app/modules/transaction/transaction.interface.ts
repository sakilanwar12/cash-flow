import { Types } from "mongoose";

export enum ETransactionType {
    TopUp="TopUp",
    Withdraw="withdraw",
    SendMoney="sendMoney",
    ReceiveMoney="receiveMoney",
    Transfer="transfer",
    AgentCashIn="agentCashIn"
}
export type TTransactionType = `${ETransactionType}`;
export enum TTransactionStatus{
    Success="success",
    Failed="failed"
}
export type TTransactionStatusType = `${TTransactionStatus}`
export interface ITransaction {
    senderId: Types.ObjectId;
    recipientId: Types.ObjectId;
    amount: number;
    type: TTransactionType;
    status: TTransactionStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}