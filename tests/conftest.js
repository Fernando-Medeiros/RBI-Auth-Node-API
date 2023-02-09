import { config } from "dotenv";
import { connectDatabase } from "../src/database/connect.js";
import { api } from "../src/resources/server";

// CONFIG
config();
connectDatabase();

// RESOURCES
import "../src/resources/auth";
import "../src/resources/customer.js";

// START SERVER AFTER IMPORT RESOURCES
module.exports = api;
