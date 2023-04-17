import { expect, it, describe, afterAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();

describe("Post - Ok", async () => {
  it("Should register a new customer", async () => {
    const resp = await app
      .post("/customers")
      .set(secretHeader)
      .send(mock.dataToCreate);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toBeNull;
  });
});

describe("Post - Exceptions", async () => {
  afterAll(async () => {
    await authHeader(await getTokenByScope("access", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Helpers.removeCustomer(authorizationHeader);
      }
    );
  });

  it("Should return 400 when not passing the necessary data to register", async () => {
    const resp = await app
      .post("/customers")
      .set(secretHeader)
      .send(Object.assign(mock.dataToCreate, { email: "" }));

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when trying to register with an email already in use", async () => {
    const resp = await app
      .post("/customers")
      .set(secretHeader)
      .send(mock.dataToCreate);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
