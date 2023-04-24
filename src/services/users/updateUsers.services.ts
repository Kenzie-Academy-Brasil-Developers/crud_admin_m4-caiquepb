import format from "pg-format";
import { TUser, TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUsersService = async (userId: number, userData: Partial<TUserRequest>): Promise<TUserResponse> => {
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
    const queryResult: QueryResult<TUser> = await client.query(queryConfig);
    const user: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);
    return user;
};

export default updateUsersService;
