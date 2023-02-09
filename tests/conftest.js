import { config } from "dotenv";

process.env.ENV = "test";
process.env.PORT = 5000;

import { connectDatabase } from "../src/database/connect.js";
import { server } from "../src/resources/server";

// CONFIG
config();
connectDatabase();

export const testServer = server;
