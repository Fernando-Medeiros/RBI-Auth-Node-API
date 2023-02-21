import { config } from "dotenv";
import { connectToDatabase } from "./services/mongodb";
import { startServer } from "./server";

config();
connectToDatabase();
startServer();
