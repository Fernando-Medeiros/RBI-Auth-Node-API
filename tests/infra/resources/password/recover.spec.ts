import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headerAuth = { Authorization: "" };

describe("Recover - Password - Ok", async () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  const { email } = mock.dataToLogin;

  it("Get Header", async () => {
    await authHeader(await getTokenByScope("access", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Object.assign(headerAuth, authorizationHeader);
      }
    );
  });

  it("Should send the registered email and return status ok", async () => {
    const resp = await app
      .post("/password")
      .set(secretHeader)
      .send({ email: email });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toBeTypeOf("object");
  });
});

describe("Recover - Password - Exceptions", async () => {
  afterAll(async () => await Helpers.removeCustomer(headerAuth));

  it("Should return status 404, email not registered", async () => {
    const resp = await app
      .post("/password")
      .set(secretHeader)
      .send({ email: "notFoudEmail@example.com" });

    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("should return 400 when sending an invalid email", async () => {
    const resp = await app
      .post("/password")
      .set(secretHeader)
      .send({ email: "invalidEmail.com" });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
