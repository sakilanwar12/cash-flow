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
  checkAuth(Role.USER, Role.AGENT),
  WalletControllers.topUpWallet
);

// router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
// router.get("/:id", checkAuth(Role.ADMIN), UserControllers.getSingleUser);

export const WalletRoutes = router;
