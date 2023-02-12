import { config } from "dotenv";

process.env["ENV"] = "test";
process.env["PORT"] = "5000";

import { connectToDatabase } from "../services/connect";
import { server } from "../server";

config();

connectToDatabase();

export const testServer = server;
