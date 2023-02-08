const dotenv = require("dotenv");
const connectDatabase = require("./database/connect");

dotenv.config();

connectDatabase();
