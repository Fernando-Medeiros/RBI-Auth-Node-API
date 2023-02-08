import { config } from "dotenv";
import { connectDatabase } from "./database/connect.js";

// CONFIG
config();
connectDatabase();

// RESOURCES
import "./resources/auth.js";
import "./resources/customer.js";
