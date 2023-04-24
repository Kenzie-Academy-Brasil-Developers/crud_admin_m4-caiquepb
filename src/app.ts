import "express-async-errors";
import express, { Application } from "express";
import userRoutes from "./routers/users.routes";
import { handdleErrors } from "./error";
import loginRouter from "./routers/login.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRouter);

app.use(handdleErrors);

export default app;
