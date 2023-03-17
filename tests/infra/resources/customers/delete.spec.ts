import { expect, it, describe } from "vitest";

import { app } from "@tes/config/config";

import { CustomerMock } from "@tes/config/clients";

const mock = new CustomerMock();

let headerAuth: { Authorization: string };

describe("Get Header -> Authorization", () => {
  mock.beforeAll();

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();

    expect(headerAuth).toHaveProperty("Authorization");
  });
});

describe("Delete - Ok", async () => {
  it("Should delete customer with authenticated session", async () => {
    const resp = await app.delete("/customers").set(headerAuth);

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });
});

describe("Delete - Exceptions", async () => {
  it("Should return 401 when trying to delete the same customer twice", async () => {
    const resp = await app.delete("/customers").set(headerAuth);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const resp = await app.delete("/customers");

    expect(resp.statusCode).toBe(401);
  });
});
