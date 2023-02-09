import { config } from "dotenv";
import { connectDatabase } from "./database/connect.js";
import { startServer } from "./resources/server.js";

// CONFIG
config();
connectDatabase();

// RESOURCES
import "./resources/auth.js";
import "./resources/customer.js";

// START SERVER AFTER IMPORT RESOURCES
export const server = startServer();
