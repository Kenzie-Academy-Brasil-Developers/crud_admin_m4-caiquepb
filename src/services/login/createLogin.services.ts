import format from "pg-format";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async (userData: TLoginRequest): Promise<TLoginResponse> => {
    const queryString: string = format(
        `
        SELECT 
            *
        FROM
            users
        WHERE
            email = %L;
    `,
        userData.email
    );
    const queryResult: QueryResult<TUser> = await client.query(queryString);
    const user: TUser = queryResult.rows[0];
    if (queryResult.rowCount === 0) {
        throw new AppError("Wrong email or password", 401);
    }
    const comparePassword: boolean = await bcrypt.compare(userData.password, user.password);
    if (!comparePassword) {
        throw new AppError("Wrong email or password", 401);
    }
    const token: string = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            active: user.active
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN!,
            subject: user.id.toString(),
        }
    );
    return { token };
};

export default createLoginService;
