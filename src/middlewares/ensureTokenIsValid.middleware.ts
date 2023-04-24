import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";

const ensureTokenIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new AppError("Missing Bearer Token", 401);
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY!, (err, decoded: any) => {
        if (err) {
            throw new AppError(err.message, 401);
        }
        console.log(decoded)
        response.locals.user = {
            id: decoded.id,
            admin: decoded.admin,
        };
    });

    return next();
};

export default ensureTokenIsValidMiddleware;
