import format from "pg-format";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createLoginService = async (payload: TLoginRequest): Promise<TLoginResponse> => {
    const queryString: string = format(
        `
        SELECT 
            *
        FROM
            users
        WHERE
            email = %L;
    `,
        payload.email
    );
    const queryResult: QueryResult<TUser> = await client.query(queryString);
    const user = queryResult.rows[0];
    if (queryResult.rowCount === 0) {
        throw new AppError("Wrong email or password");
    }
    const comparePassword = await bcrypt.compare(payload.password, queryResult.rows[0].password);
    if (!comparePassword) {
        throw new AppError("Wrong email or password");
    }
    const token: string = jwt.sign(
        {
            name: user.name,
        },
        "chave secreta",
        {
            expiresIn: "1d",
            subject: user.id.toString(),
        }
    );
    return { token };
};

export default createLoginService;
