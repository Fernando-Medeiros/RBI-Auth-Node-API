import { expect, test, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Authentication with refreshToken", () => {
  mock.beforeAll();
  mock.afterAll();

  test("Should return an object with the tokens", async () => {
    const resp = await req
      .post("/refresh")
      .send({ token: await mock.getRefreshToken() });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("refresh");
    expect(resp.body).toHaveProperty("type", "bearer");
  });
});

describe("Testing for errors and exceptions", () => {
  mock.beforeAll();
  mock.afterAll();

  let iToken = `${Math.random() * 2}`;

  test("Should return 400 when passing invalid or null token", async () => {
    const respNull = await req.post("/refresh").send();

    const respInvalid = await req.post("/refresh").send({ token: iToken });

    expect(respNull.statusCode).toBe(400);
    expect(respNull.body).toBeTypeOf("object");

    expect(respInvalid.statusCode).toBe(400);
    expect(respInvalid.body).toBeTypeOf("object");
  });

  test("should return 400 when sending a different scope token", async () => {
    const resp = await req
      .post("/refresh")
      .send({ token: await mock.getAccessToken() });

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
