import { z } from "zod";
import { userSchema } from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = Omit<TUser, "id">;

type TUserResponse = Omit<TUser, "password">;

type TUserResponseData = {
    name: string;
    email: string;
    admin: boolean;
    active: boolean
};

export { TUser, TUserRequest, TUserResponse, TUserResponseData };
