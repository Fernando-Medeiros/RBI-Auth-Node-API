import { expect, it, describe } from "vitest";

import api from "../conftest";

import request from "supertest";

const req = request(api);

describe("Get - costumers", () => {
  it("test route", async () => {
    const res = await req.get("/customers");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("test");
  });
});
