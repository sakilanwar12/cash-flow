import { Router } from "express";

const router = Router();

// router.post("/register",
//     // validateRequest(createUserZodSchema),
//     UserControllers.createUser)
// router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers)
// router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe)
// router.get("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getSingleUser)
// router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)
// /api/v1/user/:id
export const UserRoutes = router;
