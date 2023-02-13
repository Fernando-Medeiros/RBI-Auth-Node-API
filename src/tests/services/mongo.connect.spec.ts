import { expect, describe, test } from "vitest";
import { config } from "dotenv";
import { getCredentials } from "../../services/mongodb";

config();

describe("Production", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "pro";

    const credentials = getCredentials();

    expect(credentials).toContain("PRODUCTION");
  });
});

describe("Development", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "dev";

    const credentials = getCredentials();

    expect(credentials).toContain("DEVELOPMENT");
  });
});

describe("Test", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "test";

    const credentials = getCredentials();

    expect(credentials).toContain("TEST");
  });
});
