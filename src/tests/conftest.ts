import { config } from "dotenv";

process.env["ENV"] = "test";
process.env["PORT"] = "5000";

import { connectToDatabase } from "../database/connect";
import { server } from "../resources/server";

config();

connectToDatabase();

export const testServer = server;
