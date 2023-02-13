import { set, connect } from "mongoose";

set("strictQuery", false);

export const getCredentials = (): string => {
  const payload = {
    username: process.env["MONGO_USERNAME"],
    password: process.env["MONGO_PASSWORD"],
    database: process.env["MONGO_DEV_DATABASE"],
  };

  const env = process.env["ENV"] || "dev";

  switch (env.toLowerCase()) {
    case "pro":
      payload.database = process.env["MONGO_DATABASE"];
      break;
    case "test":
      payload.database = process.env["MONGO_TEST_DATABASE"];
      break;
  }
  return `mongodb+srv://${payload.username}:${payload.password}.cy0lncg.mongodb.net/${payload.database}?retryWrites=true&w=majority`;
};

export const connectToDatabase = async () => {
  const uri: string = getCredentials();

  await connect(uri, (error) => {
    if (error) {
      throw new Error(`Error connecting to the database! ${error}`);
    }
    console.log(`Connected to the database -> ${process.env["ENV"]}`);
  });
};
