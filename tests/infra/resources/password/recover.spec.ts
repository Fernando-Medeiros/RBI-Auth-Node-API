import { expect, it, describe } from "vitest";

import { app } from "@tes/config/config";

import { CustomerMock } from "@tes/config/clients";

const mock = new CustomerMock();

describe("Recover - Password - Ok", () => {
  mock.beforeAll();

  it("Should send the registered email and return status ok", async () => {
    const { email } = mock.getDataToLogin();

    const resp = await app.post("/password").send({ email: email });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toBeTypeOf("object");
  });
});

describe("Recover - Password - Exceptions", () => {
  mock.afterAll();

  it("Should return status 404, email not registered", async () => {
    const resp = await app
      .post("/password")
      .send({ email: "notFoudEmail@example.com" });

    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("should return 400 when sending an invalid email", async () => {
    const resp = await app
      .post("/password")
      .send({ email: "invalidEmail.com" });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
