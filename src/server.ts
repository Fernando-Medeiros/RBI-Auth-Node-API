import "express-async-errors";
import express from "express";
import { route as customer } from "./resources/customer";
import { route as auth } from "./resources/auth";
import { MiddleException } from "./middlewares/exceptions";

export const server = express();

const PORT = process.env["PORT"] || 8080;

server.use(express.json());
server.use(auth);
server.use(customer);

server.use(MiddleException);

export const startServer = () => server.listen(PORT);
