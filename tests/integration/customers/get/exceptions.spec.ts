import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { Helpers } from "tests/config/helpers/insert-customer";
import { getAuthorizationHeader } from "tests/config/helpers/get-token-by-scope";
import { CustomerMock } from "tests/config/customer";
import { v4 } from "uuid";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };

describe("Get - Exceptions", async () => {
  afterAll(async () => await Helpers.removeCustomer(headers));

  beforeAll(async () => {
    await Helpers.insertCustomer(mock.dataToCreate, headers);

    Object.assign(
      headers,
      await getAuthorizationHeader("access", mock.dataToLogin, headers)
    );
  });

  it("Should return 400 when searching for a customer with an invalid id", async () => {
    const resp = await app
      .get(`/customers/sad1243SA12sad1243SA1222`)
      .set(headers);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 404 when looking up a customer with a valid but non-existent uuid", async () => {
    const resp = await app.get(`/customers/${v4()}`).set(headers);

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
