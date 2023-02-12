import { config } from "dotenv";
import { connectToDatabase } from "./services/connect";
import { startServer } from "./resources/server";

config();

connectToDatabase();

startServer();
