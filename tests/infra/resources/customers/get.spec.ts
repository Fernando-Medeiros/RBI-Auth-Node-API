import { expect, it, describe } from "vitest";

import { v4 } from "uuid";

import { app } from "@tes/config/config";

import { CustomerMock } from "@tes/config/clients";

const mock = new CustomerMock();

describe("Get - Ok", async () => {
  mock.beforeAll();

  let headerAuth: { Authorization: string };
  let id: string;

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();
    id = await mock.getOneCustomerId(headerAuth);

    expect(headerAuth).toHaveProperty("Authorization");
    expect(id).toBeTypeOf("string");
  });

  it("Should return all customers", async () => {
    const resp = await app.get("/customers").set(headerAuth);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
    expect(resp.body.length).toBeGreaterThan(0);
  });

  it("Should return a customer by id", async () => {
    const resp = await app.get(`/customers/${id}`).set(headerAuth);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });
});

describe("Get - Exceptions", async () => {
  mock.afterAll();

  let headerAuth: { Authorization: string };

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();

    expect(headerAuth).toHaveProperty("Authorization");
  });

  it("Should return 400 when searching for a customer with an invalid id", async () => {
    const resp = await app
      .get(`/customers/sad1243SA12sad1243SA1222`)
      .set(headerAuth);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 404 when looking up a customer with a valid but non-existent uuid", async () => {
    const resp = await app.get(`/customers/${v4()}`).set(headerAuth);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const respById = await app.get(`/customers/sad1243SA12sad1243SA1222`);

    expect(respById.statusCode).toBe(401);
  });
});
