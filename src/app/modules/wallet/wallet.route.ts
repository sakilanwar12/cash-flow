import { Router } from "express";
import { WalletControllers } from "./wallet.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { topUpWalletZodSchema } from "./wallet.validation";

const router = Router();

router.post(
  "/top-up",
  validateRequest(topUpWalletZodSchema),
  checkAuth(Role.USER),
  WalletControllers.topUpWallet
);

router.post(
  "/withdraw",
  validateRequest(topUpWalletZodSchema),
  checkAuth(Role.USER),
  WalletControllers.withDrawMoney
);

export const WalletRoutes = router;
