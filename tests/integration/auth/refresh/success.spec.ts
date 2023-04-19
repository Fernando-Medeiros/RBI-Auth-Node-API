import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { CustomerMock } from "tests/config/customer";
import { Helpers } from "tests/config/helpers/insert-customer";
import { getAuthorizationHeader } from "tests/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };

describe("RefreshToken - Success", async () => {
  afterAll(async () => await Helpers.removeCustomer(headers));

  beforeAll(async () => {
    await Helpers.insertCustomer(mock.dataToCreate, headers);

    Object.assign(
      headers,
      await getAuthorizationHeader("refresh", mock.dataToLogin, headers)
    );
  });

  it("Should return an object with the tokens", async () => {
    const resp = await app
      .post("/refresh")
      .set(secretHeader)
      .send({
        token: headers.Authorization.replace("bearer ", ""),
      });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("refresh");
    expect(resp.body).toHaveProperty("type", "bearer");
  });
});
