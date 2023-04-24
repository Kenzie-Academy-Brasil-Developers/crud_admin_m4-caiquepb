import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureBodyIsValidMiddleware =
    (schema: ZodTypeAny) =>
    (request: Request, response: Response, next: NextFunction): void => {
        const data = schema.parse(request.body);
        request.body = data;
        return next();
    };

export default ensureBodyIsValidMiddleware;
