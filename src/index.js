import { config } from "dotenv";
import { connectToDatabase } from "./database/connect.js";
import { startServer } from "./resources/server.js";

config();

connectToDatabase();

startServer();
