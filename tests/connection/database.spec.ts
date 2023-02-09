import { expect, test } from "vitest";
import { config } from "dotenv";
import {
  checkEnv,
  getUri,
  connectToDatabase,
} from "../../src/database/connect.js";

config();

test("Connection to the database in production", () => {
  process.env.ENV = "pro";
  const credentials = checkEnv();
  const uri = getUri(credentials);

  expect(credentials.database).toEqual("PRODUCTION");
  expect(uri).toContain("PRODUCTION");
  expect(connectToDatabase);
});

test("Connection to the database in development", () => {
  process.env.ENV = "dev";
  const credentials = checkEnv();
  const uri = getUri(credentials);

  expect(credentials.database).toEqual("DEVELOPMENT");
  expect(uri).toContain("DEVELOPMENT");
  expect(connectToDatabase);
});

test("Connection to the database in test", () => {
  process.env.ENV = "test";
  const credentials = checkEnv();
  const uri = getUri(credentials);

  expect(credentials.database).toEqual("TEST");
  expect(uri).toContain("TEST");
  expect(connectToDatabase);
});
