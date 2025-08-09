import { Router } from "express";
import { UserControllers } from "./user.controller";
import {
  createUserZodSchema,
  toggleAgentStatusSchema,
} from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
router.get("/:id", checkAuth(Role.USER), UserControllers.getSingleUser);

router.post(
  "/update-agent-status",
  validateRequest(toggleAgentStatusSchema),
  checkAuth(Role.ADMIN),
  UserControllers.updateAgentStatus
);

export const UserRoutes = router;
