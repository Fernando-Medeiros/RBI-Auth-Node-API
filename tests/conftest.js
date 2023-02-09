import { config } from "dotenv";

process.env.ENV = "test";
process.env.PORT = 5000;

import { connectToDatabase } from "../src/database/connect.js";
import { server } from "../src/resources/server";

// CONFIG
config();
connectToDatabase();

export const testServer = server;
