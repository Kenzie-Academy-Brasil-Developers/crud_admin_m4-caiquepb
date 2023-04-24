import { TUserResponse } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import format from "pg-format";

const deleteUsersService = async (userId: number, admin: boolean): Promise<TUserResponse> => {
    const isAdmin = admin;
    const queryString: string = format(
        `
        UPDATE users
            SET active = false
        WHERE
            id = $1 AND active = true
        RETURNING
            *;
        `
    );
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    };
    const queryResult: QueryResult = await client.query(queryConfig);
    const user = queryResult.rows[0];
    if (!isAdmin && user.admin) {
        throw new AppError("Insufficient Permission", 403);
    }
    if (!user) {
        throw new AppError("User already desactived", 409);
    }

    return user;
};

export default deleteUsersService;
