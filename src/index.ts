import { config } from "dotenv";
import { connectToDatabase } from "./services/connect";
import { startServer } from "./server";

config();

connectToDatabase();

startServer();
