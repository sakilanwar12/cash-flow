import { Schema, model } from "mongoose";
import { EWalletStatus, IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(EWalletStatus),
      default: EWalletStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Wallet = model<IWallet>("Wallet", walletSchema);
