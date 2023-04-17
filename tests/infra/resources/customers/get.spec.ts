import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";
import { v4 } from "uuid";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getOneCustomer } from "@tes/config/helpers/get-one-customer";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headerAuth = { Authorization: "" };
const pubId = { id: "" };

describe("Get - Ok", async () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  it("Get Header and pubId", async () => {
    await authHeader(await getTokenByScope("access", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Object.assign(headerAuth, authorizationHeader);
      }
    );
    await getOneCustomer(headerAuth).then((id) => {
      Object.assign(pubId, { id: id });
    });
  });

  it("Should return all customers", async () => {
    const resp = await app
      .get("/customers")
      .set({ ...secretHeader, ...headerAuth });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
    expect(resp.body.length).toBeGreaterThan(0);
  });

  it("Should return a customer by id", async () => {
    const resp = await app
      .get(`/customers/${pubId.id}`)
      .set({ ...secretHeader, ...headerAuth });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });
});

describe("Get - Exceptions", async () => {
  afterAll(async () => await Helpers.removeCustomer(headerAuth));

  it("Should return 400 when searching for a customer with an invalid id", async () => {
    const resp = await app
      .get(`/customers/sad1243SA12sad1243SA1222`)
      .set({ ...secretHeader, ...headerAuth });

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 404 when looking up a customer with a valid but non-existent uuid", async () => {
    const resp = await app
      .get(`/customers/${v4()}`)
      .set({ ...secretHeader, ...headerAuth });

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const respById = await app
      .get(`/customers/sad1243SA12sad1243SA1222`)
      .set(secretHeader);

    expect(respById.statusCode).toBe(401);
  });
});
