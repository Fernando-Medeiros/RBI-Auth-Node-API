import "express-async-errors";
import express from "express";

import { exceptionMiddleware } from "./controllers/middlewares/exceptions";
import { sessionMiddleware } from "./controllers/middlewares/session";

import { authRoutes } from "./controllers/resources/auth.routes";
import { customerRoutes } from "./controllers/resources/customer.routes";
import { passwordRoutes } from "./controllers/resources/password.routes";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./docs/swagger.json";

export const server = express();

server.use(express.json());

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(authRoutes.public());
server.use(customerRoutes.public());
server.use(passwordRoutes.public());

server.use(sessionMiddleware);
server.use(customerRoutes.private());
server.use(passwordRoutes.private());

server.use(exceptionMiddleware);

const PORT = process.env["PORT"] ?? 8080;
export const startServer = () => server.listen(PORT);
