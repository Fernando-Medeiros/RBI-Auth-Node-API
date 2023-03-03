import { expect, it, describe } from "vitest";

import { CustomerMock, req } from "@tes/config/clients";

const mock = new CustomerMock();

let headerAuth: { Authorization: string };
let id: string;

describe("Get Header -> Authorization", () => {
  mock.beforeAll();

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();

    id = await mock.getOneCustomerId(headerAuth);

    expect(headerAuth).toHaveProperty("Authorization");
    expect(id).toBeTypeOf("string");
  });
});

describe("Patch - Ok", async () => {
  it("Should update first and last name", async () => {
    const data = {
      firstName: "test test",
      lastName: "example",
    };

    const resp = await req.patch(`/customers`).send(data).set(headerAuth);

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });

  it("Should update email", async () => {
    const data = {
      email: `newtester-${Math.random()}@tester.com`,
    };

    const resp = await req.patch(`/customers`).send(data).set(headerAuth);

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });
});

describe("Patch - Exceptions", async () => {
  it("Should return 400 when sending request without content", async () => {
    const resp = await req.patch(`/customers`).send({}).set(headerAuth);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when passing non-existent data to update", async () => {
    const data = {
      password: "password@123",
    };

    const resp = await req.patch(`/customers`).send(data).set(headerAuth);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const resp = await req.patch(`/customers`).send({});

    expect(resp.statusCode).toBe(401);
    expect(resp.body).toBeTypeOf("object");
  });
});
