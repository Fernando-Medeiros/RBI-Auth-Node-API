import { rateLimit } from 'express-rate-limit';

export const requestLimiterMiddleware = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 400,
    message: {
        message: 'Maximum requests exceeded, wait to access again!',
    },
});
