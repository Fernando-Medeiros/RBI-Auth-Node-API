import { config } from "dotenv";
import { connectToDatabase } from "./database/connect";
import { startServer } from "./resources/server";

config();

connectToDatabase();

startServer();
