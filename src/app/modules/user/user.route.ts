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

router.post(
  "/update-agent-status",
  validateRequest(toggleAgentStatusSchema),
  checkAuth(Role.ADMIN),
  UserControllers.updateAgentStatus
);
router.get("/:id", checkAuth(Role.USER, Role.ADMIN, Role.AGENT), UserControllers.getSingleUser);

export const UserRoutes = router;
