import z from "zod";
import { isValidObjectId } from "mongoose";

export const topUpWalletZodSchema = z.object({
  user: z
    .string({ message: "User ID is required" })
    .refine((val) => isValidObjectId(val), {
      message: "Invalid MongoDB ObjectId",
    }),
  balance: z
    .number({ message: "Balance is required" })
    .positive({ message: "Balance must be greater than zero" }),
});

export const sendMoneySchema = z.object({
  senderId: z
    .string({ message: "Sender ID is required" })
    .refine((val) => isValidObjectId(val), {
      message: "Invalid MongoDB ObjectId",
    }),
  recipientId: z
    .string({ message: "Recipient ID is required" })
    .refine((val) => isValidObjectId(val), {
      message: "Invalid MongoDB ObjectId",
    }),
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
});
