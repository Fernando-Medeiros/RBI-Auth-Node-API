import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { CustomerMock } from "tests/config/customer";
import { Helpers } from "tests/config/helpers/insert-customer";
import { getOneCustomer } from "tests/config/helpers/get-one-customer";
import { getAuthorizationHeader } from "tests/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };
const pubId = { id: "" };

describe("Get - Success", async () => {
  afterAll(async () => await Helpers.removeCustomer(headers));

  beforeAll(async () => {
    await Helpers.insertCustomer(mock.dataToCreate, headers);

    Object.assign(
      headers,
      await getAuthorizationHeader("access", mock.dataToLogin, headers)
    );
    Object.assign(pubId, { id: await getOneCustomer(headers) });
  });

  it("Should return all customers", async () => {
    const resp = await app.get("/customers").set(headers);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
    expect(resp.body.length).toBeGreaterThan(0);
  });

  it("Should return a customer by id", async () => {
    const resp = await app.get(`/customers/${pubId.id}`).set(headers);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });
});
