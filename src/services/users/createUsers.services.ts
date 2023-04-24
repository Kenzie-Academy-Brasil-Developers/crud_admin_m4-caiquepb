import format from "pg-format";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import * as bcrypt from "bcryptjs";

const createUsersServices = async (userData: TUserRequest): Promise<TUserResponse> => {
    userData.password = await bcrypt.hash(userData.password, 10);
    const queryString: string = format(
        `
        INSERT INTO
            users(%I)
        VALUES
            (%L)
        RETURNING
            "id", "name", "email";
        `,
        Object.keys(userData),
        Object.values(userData)
    );
    const queryResult: QueryResult<TUserResponse> = await client.query(queryString);
    return queryResult.rows[0];
};

export default createUsersServices;
