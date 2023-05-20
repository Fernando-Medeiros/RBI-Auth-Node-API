import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import { exceptionMiddleware } from './middlewares/exceptions';
import { sessionMiddleware } from './middlewares/session';
import { requestLimiterMiddleware } from './middlewares/request-rate-limit';
import { apiSecretMiddleware } from './middlewares/api-secret';

import { authRoutes } from './resources/auth.routes';
import { customerRoutes } from './resources/customer.routes';
import { passwordRoutes } from './resources/password.routes';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from 'swagger.json';

export const server = express();

server.use(express.json());

server.use(cors({ origin: process.env['CORS_ORIGIN'] }));

server.use(requestLimiterMiddleware);

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(apiSecretMiddleware);

server.use(authRoutes.public());
server.use(customerRoutes.public());
server.use(passwordRoutes.public());

server.use(sessionMiddleware);

server.use(customerRoutes.private());
server.use(passwordRoutes.private());

server.use(exceptionMiddleware);

export class Server {
    static connect(): void {
        const PORT = process.env['PORT'] || 8080;

        server.listen(PORT);
    }
}
