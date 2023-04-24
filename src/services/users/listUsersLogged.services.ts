import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import "dotenv/config";
import { responseUserSchema } from "../../schemas/users.schemas";
import { AppError } from "../../error";
import { TUser } from "../../__tests__/mocks/interfaces";

const listLoggedUsersService = async (userData: TUser): Promise<TUserResponse> => {
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            active = true;
    `;
    const queryResult: QueryResult<TUserResponse> = await client.query(queryString);
    const user = responseUserSchema.parse(queryResult.rows[0]);
    console.log(user);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    return user;
};

export default listLoggedUsersService;
