import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { CustomerMock } from "tests/config/customer";
import { Helpers } from "tests/config/helpers/insert-customer";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };

describe("Post - Exceptions", async () => {
  beforeAll(async () => {
    await Helpers.insertCustomer(mock.dataToCreate, headers);
  });
  afterAll(async () => await Helpers.removeCustomer(headers));

  it("Should return 400 when not passing the necessary data to register", async () => {
    const resp = await app
      .post("/customers")
      .set(headers)
      .send(Object.assign(mock.dataToCreate, { email: "" }));

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when trying to register with an email already in use", async () => {
    const resp = await app
      .post("/customers")
      .set(headers)
      .send(mock.dataToCreate);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
