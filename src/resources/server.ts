import express from "express";
import { route as customer } from "./customer";
import { route as auth } from "./auth";

export const server = express();

const PORT = process.env["PORT"] || 8080;

server.use(express.json());
server.use(customer);
server.use(auth);

export const startServer = () =>
  server.listen(PORT, () => console.log("Run Server"));
