import { expect, test } from "vitest";
import { checkEnv, getUri, connectDatabase } from "./connect.js";
import { config } from "dotenv";

config();

test("Conexão com o banco de dados em produção", () => {
  process.env.ENV = "pro";
  const credentials = checkEnv();
  const uri = getUri(credentials);

  expect(credentials.database).toEqual("PRODUCTION");
  expect(uri).length > 100;
  expect(connectDatabase());
});

test("Conexão com o banco de dados em desenvolvimento", () => {
  process.env.ENV = "dev";
  const credentials = checkEnv();
  const uri = getUri(credentials);

  expect(credentials.database).toEqual("DEVELOPMENT");
  expect(uri).length > 100;
  expect(connectDatabase());
});

test("Conexão com o banco de dados em teste", () => {
  process.env.ENV = "test";
  const credentials = checkEnv();
  const uri = getUri(credentials);

  expect(credentials.database).toEqual("TEST");
  expect(uri).length > 100;
  expect(connectDatabase());
});
