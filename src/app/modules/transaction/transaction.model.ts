import { Schema, model } from "mongoose";
import { ITransaction, ETransactionType, TTransactionStatus } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function (this: ITransaction) {
        return this.type === ETransactionType.SendMoney;
      },
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: Object.values(ETransactionType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TTransactionStatus),
      default: TTransactionStatus.Success,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>("Transaction", transactionSchema);
