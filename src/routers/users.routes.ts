import { Router } from "express";
import { createUsersController, listUsersController, updateUsersController } from "../controllers/users.controllers";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.middleware";
import ensureUserExists from "../middlewares/ensureUserExists.middleware";

const userRoutes: Router = Router();

userRoutes.post("", ensureEmailNotExistsMiddleware, createUsersController);
userRoutes.get("", listUsersController);
userRoutes.patch("/:id", ensureUserExists, ensureEmailNotExistsMiddleware, updateUsersController);

export default userRoutes;
