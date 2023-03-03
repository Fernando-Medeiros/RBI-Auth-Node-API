import "tsconfig-paths/register";

import { config } from "dotenv";

process.env["ENV"] = "test";
process.env["PORT"] = "5000";

config();

import { connectToDatabase } from "@inf/services/mongodb";
import { emailConfig } from "@inf/services/email";
import { server } from "@inf/server";

emailConfig();
connectToDatabase();

export const testServer = server;
