import { TUserResponse } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import format from "pg-format";
import { responseUserSchema } from "../../schemas/users.schemas";

const recoverUsersService = async (userId: number, admin: boolean): Promise<TUserResponse> => {
    const isAdmin = admin;
    if (!isAdmin) {
        throw new AppError("Insufficient Permission", 403);
    }
    const queryString: string = format(
        `
        UPDATE users
            SET active = true
        WHERE
            id = $1 AND active = false
        RETURNING
            *;
        `
    );
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    };
    const queryResult: QueryResult = await client.query(queryConfig);
    const user = responseUserSchema.parse(queryResult.rows[0]);
    if (!user.active) {
        throw new AppError("User already desactived", 409);
    }
    return user;
};

export { recoverUsersService };
