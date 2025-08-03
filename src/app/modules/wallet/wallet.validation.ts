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