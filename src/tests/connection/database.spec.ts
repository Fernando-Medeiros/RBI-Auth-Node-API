import { expect, describe, test } from "vitest";
import { config } from "dotenv";
import { checkEnv, getUri } from "../../database/connect";

config();

describe("Production", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "pro";

    const credentials = checkEnv();
    const uri = getUri(credentials);

    expect(credentials.database).toEqual("PRODUCTION");
    expect(uri).toContain("PRODUCTION");
  });
});

describe("Development", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "dev";

    const credentials = checkEnv();
    const uri = getUri(credentials);

    expect(credentials.database).toEqual("DEVELOPMENT");
    expect(uri).toContain("DEVELOPMENT");
  });
});

describe("Test", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "test";

    const credentials = checkEnv();
    const uri = getUri(credentials);

    expect(credentials.database).toEqual("TEST");
    expect(uri).toContain("TEST");
  });
});
