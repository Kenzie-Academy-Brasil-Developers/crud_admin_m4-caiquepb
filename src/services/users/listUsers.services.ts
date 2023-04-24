import { QueryResult } from "pg";
import { TUser, TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import "dotenv/config";
import { responseUserListSchema } from "../../schemas/users.schemas";
import { AppError } from "../../error";

const listUsersService = async (userData: any): Promise<Array<TUserResponse>> => {
    const admin = userData.admin;
    if (!admin) {
        throw new AppError("Insufficient Permission", 403);
    }
    const queryString: string = `
        SELECT
            *
        FROM
            users;
    `;
    const queryResult: QueryResult<TUserResponse> = await client.query(queryString);
    const users: Array<TUserResponse> = responseUserListSchema.parse(queryResult.rows);
    return users;
};

export default listUsersService;
