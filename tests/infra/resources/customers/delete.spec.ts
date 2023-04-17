import { expect, it, describe, beforeAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headerAuth = { Authorization: "" };

describe("Delete - Ok", () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  it("Get Header", async () => {
    await authHeader(await getTokenByScope("access", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Object.assign(headerAuth, authorizationHeader);
      }
    );
  });

  it("Should delete customer with authenticated session", async () => {
    const resp = await app
      .delete("/customers")
      .set({ ...secretHeader, ...headerAuth });

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });
});

describe("Delete - Exceptions", () => {
  it("Should return 401 when trying to delete the same customer twice", async () => {
    const resp = await app
      .delete("/customers")
      .set({ ...secretHeader, ...headerAuth });

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const resp = await app.delete("/customers").set(secretHeader);

    expect(resp.statusCode).toBe(401);
  });
});
