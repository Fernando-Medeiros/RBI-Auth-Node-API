import { expect, it, describe, beforeAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headerAuth = { Authorization: "" };

describe("Patch - Ok", () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  it("Get Header and pubId", async () => {
    await authHeader(await getTokenByScope("access", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Object.assign(headerAuth, authorizationHeader);
      }
    );
  });

  it("Should update first and last name", async () => {
    const resp = await app
      .patch(`/customers`)
      .set({ ...secretHeader, ...headerAuth })
      .send({
        firstName: "test test",
        lastName: "example",
      });

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });

  it("Should update email", async () => {
    const resp = await app
      .patch(`/customers`)
      .set({ ...secretHeader, ...headerAuth })
      .send({ email: `example-${Math.random()}@tester.com` });

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });
});

describe("Patch - Exceptions", async () => {
  it("Should return 400 when sending request without content", async () => {
    const resp = await app
      .patch(`/customers`)
      .set({ ...secretHeader, ...headerAuth })
      .send({});

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when passing non-existent data to update", async () => {
    const resp = await app
      .patch(`/customers`)
      .set({ ...secretHeader, ...headerAuth })
      .send({ password: "password@123" });

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const resp = await app.patch(`/customers`).set(secretHeader).send({});

    expect(resp.statusCode).toBe(401);
    expect(resp.body).toBeTypeOf("object");
  });
});
