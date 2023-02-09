import { expect, describe, it } from "vitest";
import { config } from "dotenv";
import { checkEnv, getUri } from "../../src/database/connect.js";

config();

describe("Production", () => {
  it("check env and credentials", () => {
    process.env.ENV = "pro";

    const credentials = checkEnv();
    const uri = getUri(credentials);

    expect(credentials.database).toEqual("PRODUCTION");
    expect(uri).toContain("PRODUCTION");
  });
});

describe("Development", () => {
  it("check env and credentials", () => {
    process.env.ENV = "dev";

    const credentials = checkEnv();
    const uri = getUri(credentials);

    expect(credentials.database).toEqual("DEVELOPMENT");
    expect(uri).toContain("DEVELOPMENT");
  });
});

describe("Test", () => {
  it("check env and credentials", () => {
    process.env.ENV = "test";

    const credentials = checkEnv();
    const uri = getUri(credentials);

    expect(credentials.database).toEqual("TEST");
    expect(uri).toContain("TEST");
  });
});
