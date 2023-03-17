import Redis from "ioredis";

export const REDIS = () => {
  const redis = new Redis(getCredentials());
  return redis;
};

const getCredentials = () => {
  const {
    REDIS_HOST: host,
    REDIS_PORT: port,
    REDIS_PASSWORD: password,
  } = process.env;

  return {
    host: host || "",
    port: parseInt(port || "7000"),
    password: password || "",
  };
};

export class DatabaseCache {
  static disconnect(): void {
    REDIS().disconnect();
  }
}
