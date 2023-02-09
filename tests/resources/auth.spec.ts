import { expect, it, describe } from "vitest";

import api from "../conftest";

import request from "supertest";

describe("Test route auth", () => {
  it("get main route", async () => {
    const res = await request(api).get("/auth");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("test");
  });
});
