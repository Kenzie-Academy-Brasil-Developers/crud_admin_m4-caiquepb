import format from "pg-format";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import * as bcrypt from "bcryptjs";
import { responseUserSchema } from "../../schemas/users.schemas";

const createUsersServices = async (userData: TUserRequest): Promise<TUserResponse> => {
    userData.password = await bcrypt.hash(userData.password, 10);
    const queryString: string = format(
        `
        INSERT INTO
            users(%I)
        VALUES
            (%L)
        RETURNING
            *;
        `,
        Object.keys(userData),
        Object.values(userData)
    );
    const queryResult: QueryResult<TUserResponse> = await client.query(queryString);
    const newUser: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);
    return newUser;
};

export default createUsersServices;
