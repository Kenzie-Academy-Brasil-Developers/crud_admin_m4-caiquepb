import { Router } from "express";
import {
    createUsersController,
    deleteUsersController,
    listUsersController,
    listUsersLoggedController,
    recoverUsersController,
    updateUsersController,
} from "../controllers/users.controllers";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.middleware";
import ensureUserExists from "../middlewares/ensureUserExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post("", ensureBodyIsValidMiddleware(requestUserSchema), ensureEmailNotExistsMiddleware, createUsersController);
userRoutes.get("", ensureTokenIsValidMiddleware, listUsersController);
userRoutes.get("/profile", ensureTokenIsValidMiddleware, listUsersLoggedController);
userRoutes.patch(
    "/:id",
    ensureBodyIsValidMiddleware(updateUserSchema),
    ensureTokenIsValidMiddleware,
    ensureUserExists,
    ensureEmailNotExistsMiddleware,
    updateUsersController
);
userRoutes.delete("/:id", ensureTokenIsValidMiddleware, ensureUserExists, deleteUsersController);
userRoutes.put("/:id/recover", ensureTokenIsValidMiddleware, ensureUserExists, recoverUsersController);

export default userRoutes;
