import format from "pg-format";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import { AppError } from "../../error";

const updateUsersService = async (userId: number, userData: Partial<TUserRequest>, admin: boolean): Promise<TUserResponse> => {
    const isAdmin = admin;
    const queryString: string = format(
        `
        UPDATE users
            SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING
            *;
        `,
        Object.keys(userData),
        Object.values(userData)
    );
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    };
    const queryResult: QueryResult = await client.query(queryConfig);
    const user: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);
    if (user.admin && !isAdmin) {
        throw new AppError("Insufficient Permission", 403);
    }
    return user;
};

export default updateUsersService;
