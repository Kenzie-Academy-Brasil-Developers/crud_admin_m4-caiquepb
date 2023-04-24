import { z } from "zod";
import { userSchema } from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = Omit<TUser, "id">;

type TUserResponse = Omit<TUser, "password">;

type TUserUpdate = {
    name: string;
    email: string;
};

export { TUser, TUserRequest, TUserResponse, TUserUpdate };
