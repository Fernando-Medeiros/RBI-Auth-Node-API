import "express-async-errors";
import express from "express";
import { route as authRoute } from "./resources/auth";
import { route as customerRoute } from "./resources/customer";
import { exceptionMiddleware } from "./middlewares/exceptions";

export const server = express();

const PORT = process.env["PORT"] || 8080;

server.use(express.json());
server.use(authRoute);
server.use(customerRoute);

server.use(exceptionMiddleware);

export const startServer = () => server.listen(PORT);
