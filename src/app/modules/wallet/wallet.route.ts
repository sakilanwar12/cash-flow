import { Router } from "express";
import { WalletControllers } from "./wallet.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { sendMoneySchema, topUpWalletZodSchema } from "./wallet.validation";

const router = Router();

router.get(
  "/:userId",
   checkAuth(Role.USER),
  WalletControllers.getWallet
);

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
router.post(
  "/send-money",
  validateRequest(sendMoneySchema),
  checkAuth(Role.USER),
  WalletControllers.sendMoney
);

export const WalletRoutes = router;
