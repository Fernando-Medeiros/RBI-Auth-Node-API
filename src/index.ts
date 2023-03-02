import { config } from "dotenv";
config();

import { connectToDatabase } from "./services/mongodb";
import { startServer } from "./server";
import { emailConfig } from "./services/email";

emailConfig()
connectToDatabase();
startServer();
