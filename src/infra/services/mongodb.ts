import { set, connect } from "mongoose";

set("strictQuery", false);

export const getCredentials = (): string => {
  const credentials = {
    username: process.env["MONGO_USERNAME"],
    password: process.env["MONGO_PASSWORD"],
    database: "DEVELOPMENT",
  };

  const env = process.env["ENV"] || "dev";

  switch (env.toLowerCase()) {
    case "pro":
      credentials.database = process.env["MONGO_COLLECTION"] as string;
      break;
    case "test":
      credentials.database = "TEST";
      break;
  }
  return `mongodb+srv://${credentials.username}:${credentials.password}.cy0lncg.mongodb.net/${credentials.database}?retryWrites=true&w=majority`;
};

export const connectToDatabase = async (): Promise<boolean> => {
  const uri: string = getCredentials();

  connect(uri, (err) => {
    if (err) {
      throw new Error(`Error connecting to the database! ${err}`);
    }
    console.log(`Connected to the database -> ${process.env["ENV"]}`);
  });

  return true;
};
