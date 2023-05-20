import type { NextFunction, Request, Response } from 'express';
import type { BaseException } from 'utils/http.exceptions';

export const exceptionMiddleware = (
    error: Error & Partial<BaseException>,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = error?.statusCode || 500;

    const message = error?.message || 'Internal Server Error';

    res.status(statusCode).json({ message: message });

    next();
};
