import { Router } from "express";
import { AuthControllers } from "./auth-controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post(
  "/refresh-token",
  checkAuth(Role.USER, Role.ADMIN, Role.AGENT),
  AuthControllers.getNewAccessToken
);
router.post(
  "/logout",
  checkAuth(Role.USER, Role.ADMIN, Role.AGENT),
  AuthControllers.logOut
);
export const AuthRoutes = router;
