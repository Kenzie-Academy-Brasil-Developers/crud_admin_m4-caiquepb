type TUser = {
    id: number;
    name: string;
    email: string;
    password: string;
};

type TUserRequest = Omit<TUser, "id">;

type TUserResponse = Omit<TUser, "password">;

export { TUser, TUserRequest, TUserResponse };
