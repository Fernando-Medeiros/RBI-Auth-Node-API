import { config } from "dotenv";
import { connectDatabase } from "./database/connect.js";
import { startServer } from "./resources/server.js";

config();

connectDatabase();

startServer();
