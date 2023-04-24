import { QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";

const listUsersService = async (token: string): Promise<Array<TUserResponse>> => {
    if(!token){
        throw new AppError("Token is missing!", 409)
    }
    token = token.split(" ")[1];

    const queryString: string = `
        SELECT
            "id",
            "name",
            "email"
        FROM
            users;
    `;
    const queryResult: QueryResult<TUserResponse> = await client.query(queryString);
    return queryResult.rows;
};

export default listUsersService;
