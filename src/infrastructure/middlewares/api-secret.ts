import type { NextFunction, Request, Response } from 'express';
import { decode } from 'infra/security/token/decode.impl';
import { Unauthorized } from 'utils/http.exceptions';

export const apiSecretMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const { API_SECRET } = process.env;
    const { secret } = req.headers;

    try {
        (await decode<string, string>(String(secret))) != API_SECRET;
    } catch (err) {
        throw new Unauthorized(
            'Unauthorized access. The api password is invalid!',
        );
    }
    next();
};
