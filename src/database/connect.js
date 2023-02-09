import { set, connect } from "mongoose";

set("strictQuery", false);

export const checkEnv = () => {
  const _env = process.env.ENV || "dev";
  let dbName = process.env.MONGO_DEV_DATABASE;

  if (_env.toLowerCase() === "pro") {
    dbName = process.env.MONGO_DATABASE;
  } else if (_env.toLowerCase() === "test") {
    dbName = process.env.MONGO_TEST_DATABASE;
  }

  return {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: dbName,
  };
};

export const getUri = ({ username, password, database }) => {
  try {
    return `mongodb+srv://${username}:${password}.cy0lncg.mongodb.net/${database}?retryWrites=true&w=majority`;
  } catch (error) {
    return console.log(`Invalid or missing credentials! ${error}`);
  }
};

export const connectToDatabase = async () => {
  await connect(getUri(checkEnv()), (error) => {
    if (error) {
      return console.log(`Error connecting to the database! ${error}`);
    }
    return console.log(`Connected to the database -> ${process.env.ENV}`);
  });
};
