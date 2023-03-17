import { set, connect, disconnect } from "mongoose";

set("strictQuery", false);

export const getURI = (): string => {
  const {
    MONGODB_USERNAME: username,
    MONGODB_PASSWORD: password,
    MONGODB_HOST: host,
    MONGODB_DATABASE: database,
    MONGODB_PORT: port,
    ENV: env,
  } = process.env;

  if (env?.toLowerCase() === "dev" || env?.toLowerCase() === "test") {
    return `mongodb://${host}:${port}/${database}`;
  }

  return `mongodb+srv://${username}:${password}.${host}/${database}?retryWrites=true&w=majority`;
};

export class DatabasePrimary {
  static async connect(): Promise<void> {
    await connect(getURI())
    .catch((err) => console.log(err));
  }
  static async disconnect(): Promise<void> {
    await disconnect();
  }
}
