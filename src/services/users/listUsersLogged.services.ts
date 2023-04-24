import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import "dotenv/config";
import { responseUserListSchema } from "../../schemas/users.schemas";
import { AppError } from "../../error";
import { TUser } from "../../__tests__/mocks/interfaces";

const listLoggedUsersService = async (userData: TUser): Promise<Array<TUserResponse>> => {
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            active = true
    `;
    const queryResult: QueryResult<TUserResponse> = await client.query(queryString);
    const user = responseUserListSchema.parse(queryResult.rows[0]);
    if(!user){
        throw new AppError("User not found", 404)
    }
    return user;
};

export default listLoggedUsersService;
