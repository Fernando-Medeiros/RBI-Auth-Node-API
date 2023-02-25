import "express-async-errors";
import express from "express";
import { env } from "process";

import { exceptionMiddleware } from "./middlewares/exceptions";

import { route as authRoute } from "./resources/auth";
import { route as customerRoute } from "./resources/customer";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./docs/swagger.json";

const PORT = env["PORT"] ?? 8080;

export const server = express();

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(express.json());

server.use(authRoute);
server.use(customerRoute);

server.use(exceptionMiddleware);

export const startServer = () => server.listen(PORT);
