import { Router } from "express";
import loginController from "../controllers/login.controllers";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestLoginSchema } from "../schemas/login.schemas";

const loginRouter = Router();

loginRouter.post("", ensureBodyIsValidMiddleware(requestLoginSchema), loginController);

export default loginRouter;
