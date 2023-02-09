import express from "express";
import { route as customer } from "./customer.js";
import { route as auth } from "./auth.js";

export const server = express();

const PORT = parseInt(process.env.PORT) || 8080;

server.use(express.json());
server.use(customer);
server.use(auth);

export const startServer = () =>
  server.listen(PORT, () => console.log("Run Server"));
