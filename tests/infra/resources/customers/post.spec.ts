import { expect, it, describe } from "vitest";

import { app } from "@tes/config/config";

import { CustomerMock } from "@tes/config/clients";

const mock = new CustomerMock();

describe("Post - Ok", () => {
  it("Should register a new customer", async () => {
    const resp = await app.post("/customers").send(mock.getDataToCreate());

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toBeNull;
  });
});

describe("Post - Exceptions", () => {
  mock.afterAll();

  it("Should return 400 when not passing the necessary data to register", async () => {
    const data = mock.getDataToCreate();
    data.email = "";

    const resp = await app.post("/customers").send(data);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when trying to register with an email already in use", async () => {
    const data = mock.getDataToCreate();

    const resp = await app.post("/customers").send(data);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
