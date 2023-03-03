import { expect, describe, test } from "vitest";
import { config } from "dotenv";

import { getCredentials, connectToDatabase } from "@inf/services/mongodb";

config();

describe("Connection", () => {
  test("should connect to database", async () => {
    process.env["ENV"] = "test";

    const result: boolean = await connectToDatabase();

    expect(result).toBe(true);
  });
});

describe("Credentials - Production", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "pro";

    const credentials = getCredentials();

    expect(credentials).toContain("PRODUCTION");
  });
});

describe("Credentials - Development", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "dev";

    const credentials = getCredentials();

    expect(credentials).toContain("DEVELOPMENT");
  });
});

describe("Credentials - Test", () => {
  test("check env and credentials", () => {
    process.env["ENV"] = "test";

    const credentials = getCredentials();

    expect(credentials).toContain("TEST");
  });
});
