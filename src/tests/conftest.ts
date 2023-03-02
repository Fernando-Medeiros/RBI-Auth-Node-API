import { config } from "dotenv";

process.env["ENV"] = "test";
process.env["PORT"] = "5000";

config();

import { connectToDatabase } from "../services/mongodb";
import { server } from "../server";
import { emailConfig } from "../services/email";

emailConfig();
connectToDatabase();

export const testServer = server;
