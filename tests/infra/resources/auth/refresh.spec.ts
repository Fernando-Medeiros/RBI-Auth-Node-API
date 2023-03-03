import { expect, it, describe } from "vitest";

import { CustomerMock, req } from "@tes/config/clients";

const mock = new CustomerMock();

describe("RefreshToken - Ok", () => {
  mock.beforeAll();

  it("Should return an object with the tokens", async () => {
    const resp = await req
      .post("/refresh")
      .send({ token: await mock.getAccessToken("refresh") });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("refresh");
    expect(resp.body).toHaveProperty("type", "bearer");
  });
});

describe("RefreshToken - Exceptions", () => {
  mock.afterAll();

  const iToken = `${Math.random() * 2}`;

  it("Should return 401 when passing invalid or null token", async () => {
    const respNull = await req.post("/refresh").send();

    const respInvalid = await req.post("/refresh").send({ token: iToken });

    expect(respNull.statusCode).toBe(401);
    expect(respNull.body).toBeTypeOf("object");

    expect(respInvalid.statusCode).toBe(401);
    expect(respInvalid.body).toBeTypeOf("object");
  });

  it("should return 400 when sending a different scope token", async () => {
    const resp = await req
      .post("/refresh")
      .send({ token: await mock.getAccessToken("access") });

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
