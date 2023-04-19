import { expect, it, describe, beforeAll } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { CustomerMock } from "tests/config/customer";
import { Helpers } from "tests/config/helpers/insert-customer";
import { getAuthorizationHeader } from "tests/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };

describe("Delete - Exceptions", () => {
  beforeAll(async () => {
    await Helpers.insertCustomer(mock.dataToCreate, headers);

    Object.assign(
      headers,
      await getAuthorizationHeader("access", mock.dataToLogin, headers)
    );
  });

  it("Should return 401 when trying to delete the same customer twice", async () => {
    const [, resp] = await Promise.all([
      await app.delete("/customers").set(headers),
      await app.delete("/customers").set(headers),
    ]);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const resp = await app.delete("/customers").set(secretHeader);

    expect(resp.statusCode).toBe(401);
  });
});
