import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TransactionControllers } from "./transaction.controller";

const router = Router();

router.get(
  "/:userId",
   checkAuth(Role.USER),
  TransactionControllers.getUserTransactions
);

export const TransactionRoutes = router;
