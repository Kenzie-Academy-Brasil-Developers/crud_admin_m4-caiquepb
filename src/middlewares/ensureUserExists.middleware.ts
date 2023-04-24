import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../interfaces/users.interfaces";
import { client } from "../database";
import format from "pg-format";
import { AppError } from "../error";

const ensureUserExists = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const userId = request.params.id;
    const queryString: string = format(
        `
        SELECT 
            *
        FROM
            users
        WHERE
            id = $1;
    `
    );
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    };
    const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig);
    if (queryResult.rowCount === 0) {
        throw new AppError("User not found", 404);
        console.log("Error")
    }
    return next();
};

export default ensureUserExists;
