import { expect, test, describe } from "vitest";

import { testServer as server } from "../conftest";

import request from "supertest";

describe("Test route auth", () => {
  test("get main route", async () => {
    const res = await request(server).get("/auth");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("test");
  });
});
