import "tsconfig-paths/register";

import { config } from "dotenv";

config();

import { connectToDatabase } from "@inf/services/mongodb";
import { startServer } from "@inf/server";
import { emailConfig } from "@inf/services/email";

emailConfig();
connectToDatabase();
startServer();
